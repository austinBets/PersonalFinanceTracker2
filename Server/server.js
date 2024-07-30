// This file sets up and configures the Express server for the Student Management API.
// It initializes the Express application, sets up middleware for handling JSON requests,
//  defines basic routes, and listens for incoming requests on port 3000.

const express = require('express');
const appRoutes = require ('./src/routes');

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Messi is Home!");
});

app.use('/api/v1/finance', appRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));

const cors = require('cors');
app.use(cors());