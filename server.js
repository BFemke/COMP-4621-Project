const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;  //Sets the server port to 3000

app.use(bodyParser.json());

// Use cors middleware to prevent different source error
app.use(cors());

// Connects to the database created in part 1 of the assignment
mongoose.connect('mongodb://localhost:27017/userDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    //prints out success or error if connection to database was successful or not
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the User schema and model for consistency
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//creates the user model based on the defined schema
const User = mongoose.model('User', userSchema);

// Handle user login attempts
app.post('/login', async (req, res) => {

    //grabs entered username and password from the login form
    const { username, password } = req.body;

    // Tries to find the user with the given username in the database
    const user = await User.findOne({ username });

    //if the user does not exist in the database
    if (!user) {

        //creates new user with given username and password
        const newUser = new User({
            username,
            password
        });

        // Save the new user to the database
        await newUser.save();

        //returns status of new account creation
        return res.status(201).json({ message: username });
    }

    //if username is valid and the password is not, login is unsuccessful
    if (password !== user.password) {

        //sends error code and message with unsuccessful attempt
        return res.status(400).json({ message: 'Incorrect password' });
    }

    //returns login successful response, only executes if username already exists and password is correct
    return res.status(200).json({});
});

//prints in terminal to show server is active
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
