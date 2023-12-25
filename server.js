const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors')
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
// MongoDB Connection
const uri = "mongodb+srv://152003harsh:gkp269jdactSQGOd@cluster0.sje4wcv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToMongoDB();

const database = client.db('Thyroid_Web_App'); // Replace with your actual database name
const userCollection = database.collection('users'); // Replace with your actual collection name
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});
console.log("Its working????")
// Signup route// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      await userCollection.insertOne({ username, password });
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Login route
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await userCollection.findOne({ username, password });
      if (user) {
        res.status(200).json({ status: 'success', message: 'Login successful' });
      } else {
        res.status(401).json({ status: 'error', message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  
  // Forgot Password route
  app.post('/forgot-password', async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await userCollection.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: user.username,
        subject: 'Password Recovery',
        text: `Your password is: ${user.password}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ status: 'error', message: 'Failed to send email' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ status: 'success', message: 'Password sent to your email' });
        }
      });
    } catch (error) {
      console.error('MongoDB error:', error.message);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve user data' });
    }
  });
  
  // Main route (protected)
  app.get('/main', (req, res) => {
    res.send('Welcome to the main page');
  });
  
  // Close MongoDB connection when the server is closed
  const closeMongoDBConnection = async () => {
    await client.close();
    console.log('MongoDB connection closed');
  };
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // Handle cleanup on process exit
  process.on('exit', () => {
    closeMongoDBConnection();
  });
  
  // Handle cleanup on process termination (Ctrl+C)
  process.on('SIGINT', () => {
    closeMongoDBConnection();
    process.exit();
  });