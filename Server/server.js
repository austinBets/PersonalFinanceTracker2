//Import Statements
const express = require('express'); //express will provide features for the web application
const { Pool } = require('pg'); //pg means Node-Postgres, which is a collection of node.js features for interfacing with PostgreSQL
const bcrypt = require('bcryptjs'); //Help encrypt passwords by hashing them.
const jwt = require('jsonwebtoken'); //A library to create and verify JSON Web Tokens (JWT)
const cors = require('cors'); //A middleware for enabling Cross-Origin Resource Sharing.

//Initialize the express application in here
const app = express(); //Creates an instance of an Express Application
const port = 3000; //The port where the server will run

// Setting up the Middleware
app.use(cors()); //Enables cors with different options. cors is a mechanism that allows web server to specify who can access its resources (like API's) and from where.
app.use(express.json()); //parse requests with JSON payloads.

// PostgreSQL connection pool allows for multiple client connections to the database.
const pool = new Pool({ 
  user: 'your-username',
  host: 'localhost',
  database: 'finance_tracker',
  password: 'your-password',
  port: 5432,
});

//  Define a Route for registering users. On a success, return the user ID on a failure return a 500 status with a server error message
app.post('/api/register', async (req, res) => { //Defines a POST endpoint at '/api/register'
  const { username, password } = req.body; //req.body will contain the username and password that will be sent by the clients
  const hashedPassword = await bcrypt.hash(password, 10); //Hash a password that will be sent by the client
  try {
    const result = await pool.query( 
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    ); //Execute an SQL query that will insert a new user into the database.
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


//Define a Route for logging a user in.
app.post('/api/login', async (req, res) => { //Define a POST endpoint at '/api/login'
  const { username, password } = req.body; //req.body will contain a username an password that will be sent to a cilent
  try {
    
    //Pool.query contains an SQL query that will look into the database for the provided username.
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    //checks if the user exists and if the password matches the user
    if (result.rows.length === 0) return res.status(400).send('Invalid credentials');
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    //If the credintals match create a JWT token and returns it to the client. If not, return an error message.
    if (!isMatch) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//Defines a route for Getting transactions from the database
app.get('/api/transactions', async (req, res) => { //Define a POST endpoint at '/api/transactions'
  const { userId } = req.query; //req.body will contain the transaction details (user ID, amount, description)
  
  //executes an SQL query that will insert a new transaction into the database
  try {
    const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//Defines a route to handle adding new transactions into the database using the data provided in the request body req.body
app.post('/api/transactions', async (req, res) => { 
  const { userId, amount, description } = req.body; // In a real app, validate JWT and get userId from token
  try {
    const result = await pool.query(
      'INSERT INTO transactions (user_id, amount, description) VALUES ($1, $2, $3) RETURNING id',
      [userId, amount, description]
    );
    res.status(201).json({ transactionId: result.rows[0].id });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => { //Starts the Express server on the specified port
  console.log(`Server is running on http://localhost:${port}`); //Logs a message indicating the server is running and provides the URL to access it.
});
