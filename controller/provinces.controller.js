const { mongoose } = require('mongoose');
const provinces = require('../models/provinces.model');
const CountryMain = require('../models/country.model');

class Provinces_Controller {
    constructor() {
    }
    async getProvinces(req, res) {
        // Logic to get all users
        const Provinces = await provinces.find();
        res.json(Provinces);
    }

    async createProvince(req, res) {
        // Logic to create a new user
        const { Name, Country } = req.body;

        const newProvince = await new provinces({ Name, Country });
        await newProvince.save();
        res.status(201).json(newProvince);
    }

    async getProvinceById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const Provinces = await provinces.findById(id);
        if (!Provinces) {
            return res.status(404).json({ message: 'Province not found' });
        }
        console.log(`Fetching province with ID: ${id}`);
        // Extract the Country ID from the province
        const { Country } = Provinces;
        console.log(`Country ID associated with province: ${Country}`);

        // Find the country name using the Country ID
        const CountryFind = await CountryMain.findById(Country);
        if (!CountryFind) {
            return res.status(404).json({ message: 'Country not found' });
        }
        // Return the province details along with the country name

        res.status(200).json({
            ProvinceName: Provinces.Name,
            CountryName: CountryFind.Name,

            ProvinceID: Provinces._id,
            CountryID: CountryFind._id
        });
        console.log(`Province details: ${JSON.stringify({
            ProvinceName: Provinces.Name,
            CountryName: CountryFind.Name
        })}`);

        console.log(`\n ${JSON.stringify({
            ProvinceID: Provinces._id,
            CountryID: CountryFind._id
        })}`);
        console.log(`Province with ID: ${id} fetched successfully`);
    }

    async updateProvince(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, Country } = req.body;
        const Provinces = await provinces.findByIdAndUpdate(id, { Name, Country }, { new: true });
        if (!Provinces) {
            return res.status(404).json({ message: 'Province not found' });
        }
        res.status(200).json(Provinces);
    }

    async deleteProvince(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const Provinces = await provinces.findByIdAndDelete(id);
        if (!Provinces) {
            return res.status(404).json({ message: 'Province not found' });
        }
        res.status(200).json({ message: 'Province deleted successfully' });
    }
}

const provinces_controller = new Provinces_Controller();

module.exports = provinces_controller;