const { mongoose } = require('mongoose');
const AdvImages = require('../models/adv_images.model');

class Adv_Images_Controller {
    constructor() {
    }
    async getAdvImages(req, res) {
        // Logic to get all users
        const advimages = await AdvImages.find();
        res.json(advimages);
    }

    async createAdvImages(req, res) {
        // Logic to create a new user
        const { Caption, Contents, Rank } = req.body;

        const newadvimages = await new AdvImages({ Caption, Contents, Rank });
        await newadvimages.save();
        res.status(201).json(newadvimages);
    }

    async getAdvImagesById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const advimages = await AdvImages.findById(id);
        if (!advimages) {
            return res.status(404).json({ message: 'AdvertisementImage not found' });
        }
        console.log(`Fetching AdvertisementImage with ID: ${id}`);

        res.status(200).json(advimages);
        console.log(`AdvertisementCategory with ID: ${id} fetched successfully`);
    }

    async updateAdvImages(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Caption, Contents, Rank } = req.body;
        console.log(`Updating AdvertisementImage with ID: ${id} with Caption: ${Caption}, Contents: ${Contents} and Rank: ${Rank}`);

        const advimages = await AdvImages.findByIdAndUpdate(id, { Caption, Contents, Rank }, { new: true });
        if (!advimages) {
            return res.status(404).json({ message: 'AdvertisementImage not found' });
        }
        res.status(200).json(advimages);
    }

    async deleteAdvImages(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const advimages = await AdvImages.findByIdAndDelete(id);
        if (!advimages) {
            return res.status(404).json({ message: 'AdvertisementImage not found' });
        }
        res.status(200).json({ message: 'AdvertisementImage deleted successfully' });
    }
}
const advimages_controller = new Adv_Images_Controller();

module.exports = advimages_controller;