const { mongoose } = require('mongoose');
const AdvSubCategory = require('../models/adv_subcategory.model');
const CategoryMain = require('../models/adv_category.model');

class AdvSubCategory_Controller {
    constructor() {
    }
    async getAdvSubCategory(req, res) {
        // Logic to get all users
        const advsubcategory = await AdvSubCategory.find();
        res.json(advsubcategory);
    }

    async createAdvSubCategory(req, res) {
        // Logic to create a new user
        const { Name, Image, Category } = req.body;

        const newadvsubcategory = await new AdvSubCategory({ Name, Image, Category });
        await newadvsubcategory.save();
        res.status(201).json(newadvsubcategory);
    }

    async getAdvSubCategoryById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const advsubcategory = await AdvSubCategory.findById(id);
        if (!advsubcategory) {
            return res.status(404).json({ message: 'Advertisement SubCategory not found' });
        }
        console.log(`Fetching Advertisement SubCategory with ID: ${id}`);

        const { Category } = advsubcategory;
        console.log(`Category ID associated with AdvSubCategory: ${Category}`);

        const CategoryFind = await CategoryMain.findById(Category);
        if (!CategoryFind) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            AdvSubCategoryName: advsubcategory.Name,
            AdvSubCategoryImage: advsubcategory.Image,
            AdvCategory: CategoryFind.Name,

            AdvSubCategoryID: advsubcategory._id,
            AdvCategoryID: CategoryFind._id
        });
        console.log(`Adv SubCategory details: ${JSON.stringify({
            AdvSubCategoryName: advsubcategory.Name,
            AdvSubCategoryImage: advsubcategory.Image,
            AdvCategory: CategoryFind.Name
        })}`);

        console.log(`\n ${JSON.stringify({
            AdvSubCategoryID: advsubcategory._id,
            AdvCategoryID: CategoryFind._id
        })}`);

        console.log(`Advertisement SubCategory with ID: ${id} fetched successfully`);
    }

    async updateSubAdvCategory(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, Image, Category } = req.body;
        console.log(`Updating Advertisement SubCategory with ID: ${id} with Name: ${Name}, Image: ${Image} and Category: ${Category}`);

        const advsubcategory = await AdvSubCategory.findByIdAndUpdate(id, { Name, Image, Category }, { new: true });
        if (!advsubcategory) {
            return res.status(404).json({ message: 'Advertisement SubCategory not found' });
        }
        res.status(200).json(advsubcategory);
    }

    async deleteSubAdvCategory(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const advsubcategory = await AdvSubCategory.findByIdAndDelete(id);
        if (!advsubcategory) {
            return res.status(404).json({ message: 'Advertisement SubCategory not found' });
        }
        res.status(200).json({ message: 'Advertisement SubCategory deleted successfully' });
    }
}
const advsubcategory_controller = new AdvSubCategory_Controller();

module.exports = advsubcategory_controller;