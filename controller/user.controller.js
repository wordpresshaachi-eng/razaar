const { mongoose } = require('mongoose');
const User = require('../models/user.model');
const RoleMain = require('../models/role.model');
const bcrypt = require("bcrypt");

class User_Controller {
    constructor() {
    }
    async getUsers(req, res) {
        // Logic to get all users
        const users = await User.find().populate('Role', 'Name');
        res.json(users);
        // console.log(users);
    }

    async createUser(req, res) {
        // Logic to create a new user
        const { Name, ApiKey, BirthDate, ContactNumber, Email, Image, LoginID, SecurityAnswer, SecurityQuestion, Role } = req.body;
        let { Password } = req.body

        const encryptedpass = await bcrypt.hash(Password, 10);

        Password = encryptedpass;

        const newUser = await new User({ Name, ApiKey, BirthDate, ContactNumber, Email, Image, LoginID, Password, SecurityAnswer, SecurityQuestion, Role });
        await newUser.save();
        res.status(201).json(newUser);
    }

    async getUserById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const user = await User.findById(id);
        const checkrole = await RoleMain.findById(user.Role._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (checkrole.Name === "Super Admin") {

        }

        console.log(`Fetching User with ID: ${id}`);
        // Extract the Role ID from the User
        const { Role } = user;
        console.log(`Role ID associated with User: ${Role}`);

        // Find the Role name using the Role ID
        const RoleFind = await RoleMain.findById(Role);
        if (!RoleFind) {
            return res.status(404).json({ message: 'Role not found' });
        }
        // Return the Role details along with the Role name

        res.status(200).json({
            UserName: user.Name,
            ApiKey: user.ApiKey,
            BirthDate: user.BirthDate,
            ContactNumber: user.ContactNumber,
            Email: user.Email,
            Image: user.Image,
            LoginID: user.LoginID,
            Password: user.Password,
            SecurityQuestion: user.SecurityQuestion,
            SecurityAnswer: user.SecurityAnswer,

            Role: RoleFind.Name,
        });
        console.log(`User details: ${JSON.stringify({
            UserName: user.Name,
            ApiKey: user.ApiKey,
            BirthDate: user.BirthDate,
            ContactNumber: user.ContactNumber,
            Email: user.Email,
            Image: user.Image,
            LoginID: user.LoginID,
            Password: user.Password,
            SecurityQuestion: user.SecurityQuestion,
            SecurityAnswer: user.SecurityAnswer,

            Role: RoleFind.Name,
        })}`);

        console.log(`\n ${JSON.stringify({
            UserID: user._id,
            RoleID: RoleFind._id
        })}`);
        console.log(`User with ID: ${id} fetched successfully`);
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const {
            Name,
            ApiKey,
            BirthDate,
            ContactNumber,
            Email,
            Image,
            LoginID,
            SecurityAnswer,
            SecurityQuestion,
            Role,
            Password
        } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateFields = {
            Name,
            ApiKey,
            BirthDate,
            ContactNumber,
            Email,
            Image,
            LoginID,
            SecurityAnswer,
            SecurityQuestion,
            Role
        };

        if (Password && Password !== "") {
            updateFields.Password = await bcrypt.hash(Password, 10);
        }

        const result = await User.findByIdAndUpdate(id, updateFields, { new: true });
        console.log("update success");
        return res.status(200).json(result);
    }

    async deleteUser(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        let user = await User.findById(id);
        const checkrole = await RoleMain.findById(user.Role._id);
        if (!user) {
            console.log("tried to delete unavailable user and failed");
            return res.status(404).json({ message: 'User not found' });
        }
        else if (checkrole.Name === "Super Admin") {
            console.log("tried to delete admin and blocked");
            return res.status(404).json({ message: 'Not Allowed' });
        }
        else {
            user = await User.findByIdAndDelete(id);
            console.log("tried to delete user and successful");
            res.status(200).json({ message: 'User deleted successfully' });
        }
    }

    async getSuperAdminId(req, res) {
        // Find all users with populated Role
        const users = await User.find().populate('Role', 'Name');
        // Find the first user whose role name is "Super Admin"
        const superAdmin = users.find(u => u.Role && u.Role.Name === "Super Admin");
        // console.log(superAdmin);
        if (superAdmin) {
            return res.status(200).json({ SuperAdminID: superAdmin._id, Email: superAdmin.Email });
        } else {
            return res.status(404).json({ message: "Super Admin not found" });
        }
    }
}

const user_controller = new User_Controller();

module.exports = user_controller;