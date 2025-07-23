const { mongoose } = require('mongoose');
const AdvCategory = require('../models/adv_category.model');

class AdvCategory_Controller {
    constructor() {
    }
    async getAdvCategory(req, res) {
        // Logic to get all users
        const advcategory = await AdvCategory.find();
        res.json(advcategory);
    }

    async createAdvCategory(req, res) {
        // Logic to create a new user
        const { Name, Image } = req.body;

        const newadvcategory = await new AdvCategory({ Name, Image });
        await newadvcategory.save();
        res.status(201).json(newadvcategory);
    }

    async getAdvCategoryById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const advcategory = await AdvCategory.findById(id);
        if (!advcategory) {
            return res.status(404).json({ message: 'AdvertisementCategory not found' });
        }
        console.log(`Fetching AdvertisementCategory with ID: ${id}`);

        res.status(200).json(advcategory)

        console.log(`AdvertisementCategory with ID: ${id} fetched successfully`);
    }

    async updateAdvCategory(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, Image } = req.body;
        console.log(`Updating AdvertisementCategory with ID: ${id} with Name: ${Name} and Image: ${Image}`);

        const advcategory = await AdvCategory.findByIdAndUpdate(id, { Name, Image }, { new: true });
        if (!advcategory) {
            return res.status(404).json({ message: 'AdvertisementCategory not found' });
        }
        res.status(200).json(advcategory);
    }

    async deleteAdvCategory(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const advcategory = await AdvCategory.findByIdAndDelete(id);
        if (!advcategory) {
            return res.status(404).json({ message: 'AdvertisementCategory not found' });
        }
        res.status(200).json({ message: 'AdvertisementCategory deleted successfully' });
    }
}
const advcategory_controller = new AdvCategory_Controller();

module.exports = advcategory_controller;