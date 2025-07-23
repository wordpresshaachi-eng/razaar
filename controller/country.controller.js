const { mongoose } = require('mongoose');
const Country = require('../models/country.model');


class Country_Controller {
    constructor() {
    }
    async getCountry(req, res) {
        // Logic to get all users
        const country = await Country.find();
        res.json(country);
    }

    async createCountry(req, res) {
        // Logic to create a new user
        const { Name } = req.body;

        const newCountry = await new Country({Name});
        await newCountry.save();
        res.status(201).json(newCountry);
    }

    async getCountryById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const country = await Country.findById(id);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json(country);
        console.log(`Country with ID: ${id} fetched successfully`);
        console.log(`Country details: ${JSON.stringify(country)}`);
    }

    async updateCountry(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name } = req.body;
        console.log(`Updating country with ID: ${id} with Name: ${Name}`);

        const country = await Country.findByIdAndUpdate(id, { Name }, { new: true });
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json(country);
    }

    async deleteCountry(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const country = await Country.findByIdAndDelete(id);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json({ message: 'Country deleted successfully' });
    }
}
const country_controller = new Country_Controller();

module.exports = country_controller;