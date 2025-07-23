const { mongoose } = require('mongoose');
const AdvTypes = require('../models/adv_types.model');

class Adv_Types_Controller {
    constructor() {
    }
    async getAdvTypes(req, res) {
        // Logic to get all users
        const advtype = await AdvTypes.find();
        res.json(advtype);
    }

    async createAdvTypes(req, res) {
        // Logic to create a new user
        const { Name } = req.body;

        const newadvtype = await new AdvTypes({ Name });
        await newadvtype.save();
        res.status(201).json(newadvtype);
    }

    async getAdvTypesById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const advtype = await AdvTypes.findById(id);
        if (!advtype) {
            return res.status(404).json({ message: 'AdvertisementType not found' });
        }
        console.log(`Fetching AdvertisementType with ID: ${id}`);

        res.status(200).json(advtype);
        console.log(`AdvertisementType with ID: ${id} fetched successfully`);
    }

    async updateAdvTypes(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name } = req.body;
        console.log(`Updating AdvertisementType with ID: ${id} with Name: ${Name}`);

        const advtype = await AdvTypes.findByIdAndUpdate(id, { Name }, { new: true });
        if (!advtype) {
            return res.status(404).json({ message: 'AdvertisementType not found' });
        }
        res.status(200).json(advtype);
    }

    async deleteAdvTypes(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const advtype = await AdvTypes.findByIdAndDelete(id);
        if (!advtype) {
            return res.status(404).json({ message: 'AdvertisementType not found' });
        }
        res.status(200).json({ message: 'AdvertisementType deleted successfully' });
    }
}
const adv_types_Controller = new Adv_Types_Controller();

module.exports = adv_types_Controller;