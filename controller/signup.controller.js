const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class SignupController {
    constructor() {
    }

    async signup(req, res) {
        const { Email, Name, BirthDate, ApiKey, ContactNumber, Image, LoginID, SecurityAnswer, SecurityQuestion, Role } = req.body;
        let { Password } = req.body;

        const HashPass = await bcrypt.hash(Password, 10);

        const newUser = await new User({
            Email,
            Name,
            Password: HashPass,
            BirthDate,
            ApiKey,
            ContactNumber,
            Image,
            LoginID,
            SecurityAnswer,
            SecurityQuestion,
            Role
        });

        await newUser.save();

        res.status(200).json({
            message: `user is created login now`
        });
        console.log(`${newUser} is created login now`);


        if (Email == "" || Name == "" || Password == "" || BirthDate == "") {
            res.status(200).json({ message2: "Error" });
        }
    }
}

const signupController = new SignupController;

module.exports = signupController;