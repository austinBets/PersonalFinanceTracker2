const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Mock the Pool to avoid actual database interactions during testing
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const pool = new Pool();

describe('User Authentication and Registration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Hash password correctly', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  test('Generate JWT token', () => {
    const userId = 1;
    const token = jwt.sign({ userId }, 'your_jwt_secret');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    expect(decoded.userId).toBe(userId);
  });

  test('Register user and return user ID', async () => {
    const username = 'testuser';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );

    expect(result.rows[0].id).toBe(1);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
  });

  test('Login user and return JWT token', async () => {
    const username = 'testuser';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, username, password: hashedPassword }] });

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    expect(isMatch).toBe(true);

    if (isMatch) {
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
      expect(token).toBeDefined();
      const decoded = jwt.verify(token, 'your_jwt_secret');
      expect(decoded.userId).toBe(user.id);
    }
  });
});
