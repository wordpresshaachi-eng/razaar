const User = require("../models/user.model");
const Role = require("../models/role.model");

const bcrypt = require("bcrypt");

class LoginController {
    constructor() {
    }

    async login(req, res) {
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            console.log("not found");
            return;
        }

        const checkpass = await bcrypt.compare(Password, user.Password);
        const checkrole = await Role.findById(user.Role);

        if (!checkpass) {
            res.status(401).json({ message: "Password is incorrect" });
            console.log("password incorrect");
            return;
        }

        if(checkrole.Name === "Super Admin"){
            res.status(200).json({ message: "Admin Logged In Successful" });
        }

        console.log(`${user.Email} found \n ${checkrole.Name}`);
        res.status(200).json({ message: "User Logged In Successful" });
    }
}

const loginController = new LoginController;

module.exports = loginController;