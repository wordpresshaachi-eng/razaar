const { mongoose } = require('mongoose');
const City = require('../models/city.model');
const CountryMain = require('../models/country.model');
const ProvinceMain = require('../models/provinces.model');


class City_Controller {
    constructor() {
    }
    async getCity(req, res) {
        // Logic to get all users
        const city = await City.find();
        res.json(city);
    }

    async createCity(req, res) {
        // Logic to create a new user
        const { Name, Province, Country } = req.body;

        const newCity = await new City({ Name, Province, Country });
        await newCity.save();
        res.status(201).json(newCity);
    }

    async getCityById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        console.log(`Fetching City with ID: ${id}`);
        const { Country, Province } = city;
        console.log(`Country ID associated with City: ${Country}`);

        const CountryFind = await CountryMain.findById(Country);
        if (!CountryFind) {
            return res.status(404).json({ message: 'Country not found' });
        }

        const ProvinceFind = await ProvinceMain.findById(Province);
        if (!ProvinceFind) {
            return res.status(404).json({ message: 'Province not found' });
        }

        res.status(200).json({
            CityName: city.Name,
            ProvinceName: ProvinceFind.Name,
            CountryName: CountryFind.Name,

            CityID: city._id,
            ProvinceID: ProvinceFind._id,
            CountryID: CountryFind._id
        });
        console.log(`City details: ${JSON.stringify({
            CityName: city.Name,
            ProvinceName: ProvinceFind.Name,
            CountryName: CountryFind.Name
        })}`);

        console.log(`\n ${JSON.stringify({
            CityID: city._id,
            ProvinceID: ProvinceFind._id,
            CountryID: CountryFind._id
        })}`);
        console.log(`City with ID: ${id} fetched successfully`);
    }

    async updateCity(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, Province, Country } = req.body;
        console.log(`Updating city with ID: ${id} with Name: ${Name} and Province: ${Province} and Country: ${Country}`);

        const city = await City.findByIdAndUpdate(id, { Name, Province, Country }, { new: true });
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(city);
    }

    async deleteCity(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const city = await City.findByIdAndDelete(id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    }
}
const city_controller = new City_Controller();

module.exports = city_controller;