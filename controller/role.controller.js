const { mongoose } = require('mongoose');
const Role = require('../models/role.model');


class Role_Controller {
    constructor() {
    }
    async getRole(req, res) {
        // Logic to get all users
        const role = await Role.find();
        res.json(role);
    }

    async createRole(req, res) {
        // Logic to create a new user
        const { Name } = req.body;

        const newRole = await new Role({Name});
        await newRole.save();
        res.status(201).json(newRole);
    }

    async getRoleById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
        console.log(`Role with ID: ${id} fetched successfully`);
        console.log(`Role details: ${JSON.stringify(role)}`);
    }

    async updateRole(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name } = req.body;
        const role = await Role.findByIdAndUpdate(id, { Name }, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
        console.log(`Role with ID: ${id} updated successfully`);
        console.log(`Updated role details: ${JSON.stringify(role)}`);
    }

    async deleteRole(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
        
    }
}

const role_controller = new Role_Controller();

module.exports = role_controller;