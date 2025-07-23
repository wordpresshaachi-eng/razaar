const { mongoose } = require('mongoose');
const CityArea = require('../models/cityarea.model');
const CityMain = require('../models/city.model');


class CityArea_Controller {
    constructor() {
    }
    async getCityArea(req, res) {
        // Logic to get all users
        const cityarea = await CityArea.find();
        res.json(cityarea);
    }

    async createCityArea(req, res) {
        // Logic to create a new user
        const { Name, City } = req.body;

        const newCityArea = await new CityArea({ Name, City });
        await newCityArea.save();
        res.status(201).json(newCityArea);
    }

    async getCityAreaById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const cityarea = await CityArea.findById(id);
        if (!cityarea) {
            return res.status(404).json({ message: 'CityArea not found' });
        }
        console.log(`Fetching CityArea with ID: ${id}`);
        // Extract the Country ID from the province
        const { City } = cityarea;
        console.log(`City ID associated with CityArea: ${City}`);

        // Find the country name using the Country ID
        const CityFind = await CityMain.findById(City);
        if (!CityFind) {
            return res.status(404).json({ message: 'City not found' });
        }
        // Return the province details along with the country name

        res.status(200).json({
            CityAreaName: cityarea.Name,
            CityName: CityFind.Name,

            CityAreaID: cityarea._id,
            CityID: CityFind._id
        });
        console.log(`CityArea details: ${JSON.stringify({
            CityAreaName: cityarea.Name,
            CityName: CityFind.Name
        })}`);

        console.log(`\n ${JSON.stringify({
            CityAreaID: cityarea._id,
            CityID: CityFind._id
        })}`);
        console.log(`CityArea with ID: ${id} fetched successfully`);
    }

    async updateCityArea(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, City } = req.body;
        console.log(`Updating cityarea with ID: ${id} with Name: ${Name} and City: ${City}`);

        const cityarea = await CityArea.findByIdAndUpdate(id, { Name, City }, { new: true });
        if (!cityarea) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(cityarea);
    }

    async deleteCityArea(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const cityarea = await CityArea.findByIdAndDelete(id);
        if (!cityarea) {
            return res.status(404).json({ message: 'CityArea not found' });
        }
        res.status(200).json({ message: 'CityArea deleted successfully' });
    }
}
const cityarea_controller = new CityArea_Controller();

module.exports = cityarea_controller;