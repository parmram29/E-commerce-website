const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // adjust path to match your setup of user

// mongoDB connection username with password
mongoose.connect(
  "mongodb+srv://markramcharran2002:Qazwsxedcrfv12@cluster0.85pim.mongodb.net/sample_mflix?retryWrites=true&w=majority"
);

const addUser = async () => {
  try {
    const username = "newuser"; // username
    const email = "newuser@example.com"; // created email
    const plainPassword = "mypassword"; // created password

    // hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // create the new user
    const user = new User({
      username,
      email, // include the email field
      password: hashedPassword,
    });

    // save the user
    await user.save();
    console.log("User added:", user);

    //  exit the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding user:", error);
    mongoose.connection.close();
  }
};

// run the addUser function
addUser();
