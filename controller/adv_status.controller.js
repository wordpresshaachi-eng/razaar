const { mongoose } = require('mongoose');
const AdvStatus = require('../models/adv_status.model');

class Adv_Images_Controller {
    constructor() {
    }
    async getAdvStatus(req, res) {
        // Logic to get all users
        const advstatus = await AdvStatus.find();
        res.json(advstatus);
    }

    async createAdvStatus(req, res) {
        // Logic to create a new user
        const { Name } = req.body;

        const newadvstatus = await new AdvStatus({ Name });
        await newadvstatus.save();
        res.status(201).json(newadvstatus);
    }

    async getAdvStatusById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const advstatus = await AdvStatus.findById(id);
        if (!advstatus) {
            return res.status(404).json({ message: 'AdvertisementStatus not found' });
        }
        console.log(`Fetching AdvertisementStatus with ID: ${id}`);

        res.status(200).json(advstatus);
        console.log(`AdvertisementStatus with ID: ${id} fetched successfully`);
    }

    async updateAdvStatus(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name } = req.body;
        console.log(`Updating AdvertisementStatus with ID: ${id} with Name: ${Name}`);

        const advstatus = await AdvStatus.findByIdAndUpdate(id, { Name }, { new: true });
        if (!advstatus) {
            return res.status(404).json({ message: 'AdvertisementStatus not found' });
        }
        res.status(200).json(advstatus);
    }

    async deleteAdvStatus(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const advstatus = await AdvStatus.findByIdAndDelete(id);
        if (!advstatus) {
            return res.status(404).json({ message: 'AdvertisementStatus not found' });
        }
        res.status(200).json({ message: 'AdvertisementStatus deleted successfully' });
    }
}
const adv_status_controller = new Adv_Images_Controller();

module.exports = adv_status_controller;