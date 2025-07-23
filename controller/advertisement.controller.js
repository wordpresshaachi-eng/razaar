const { mongoose } = require('mongoose');
const Adv = require('../models/advertisement.model');
const CityMain = require('../models/city.model');
const CityAreaMain = require('../models/cityarea.model');
const StatusMain = require('../models/adv_status.model');
const TypeMain = require('../models/adv_types.model');
const Adv_SubCategoryMain = require('../models/adv_subcategory.model');
const ImageMain = require('../models/adv_images.model');
const UserMain = require('../models/user.model');

class Adv_Controller {
    constructor() {
    }
    async getAdv(req, res) {
        // Logic to get all users
        const adv = await Adv.find()
            .populate('Image', 'Contents')
            .populate('Adv_Status', 'Name');
        res.json(adv);
        console.log(adv);
    }

    async createAdv(req, res) {
        // Logic to create a new user
        const { Name, City, Description, EndsOn, Hits, Price, StartsOn, CityArea, Adv_Status, Adv_Type, Adv_SubCategory, User, Image } = req.body;

        if (Name == "" || City == "" || Description == "" || Price == "" || CityArea == "" || Adv_Type == "" || Adv_SubCategory == "") {
            console.log("not posted");
            return res.status(404).json({ message: 'not posted' });
        }

        const newAdv = await new Adv({ Name, City, Description, EndsOn, Hits, Price, StartsOn, CityArea, Adv_Status, Adv_Type, Adv_SubCategory, User, Image });
        await newAdv.save();

        console.log("posted");

        res.status(201).json(newAdv);
    }

    async getAdvById(req, res) {
        // Logic to get a user by ID
        const { id } = req.params;
        const adv = await Adv.findById(id);
        if (!adv) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        console.log(`Fetching Advertisement with ID: ${id}`);

        const { City, CityArea, Adv_Status, Adv_Type, Adv_SubCategory, User, Image } = adv;

        const CityFind = await CityMain.findById(City);
        if (!CityFind) {
            return res.status(404).json({ message: 'City not found' });
        }

        const CityAreaFind = await CityAreaMain.findById(CityArea);
        if (!CityAreaFind) {
            return res.status(404).json({ message: 'CityArea not found' });
        }

        const StatusFind = await StatusMain.findById(Adv_Status);
        if (!StatusFind) {
            return res.status(404).json({ message: 'Status not found' });
        }

        const TypeFind = await TypeMain.findById(Adv_Type);
        if (!TypeFind) {
            return res.status(404).json({ message: 'Type not found' });
        }

        const Adv_SubCategoryFind = await Adv_SubCategoryMain.findById(Adv_SubCategory);
        if (!Adv_SubCategoryFind) {
            return res.status(404).json({ message: 'SubCategory not found' });
        }

        const UserFind = await UserMain.findById(User);
        if (!UserFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ImageFind = await ImageMain.findById(Image);
        if (!ImageFind) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json(
            {
                Name: adv.Name,
                City: CityFind.Name,
                Description: adv.Description,
                EndsOn: adv.EndsOn,
                Hits: adv.Hits,
                Price: adv.Price,
                StartsOn: adv.StartsOn,
                CityArea: CityAreaFind.Name,
                Adv_Status: StatusFind.Name,
                Adv_Type: TypeFind.Name,
                Adv_SubCategory: Adv_SubCategoryFind.Name,
                User: UserFind.Name,
                Image: ImageFind.Contents
            }
        );

        console.log(`Advertisement with ID: ${id} fetched successfully`);
    }

    async updateAdv(req, res) {
        // Logic to update a user by ID
        const { id } = req.params;
        const { Name, City, Description, EndsOn, Hits, Price, StartsOn, CityArea, Adv_Status, Adv_Type, Adv_SubCategory, User, Image } = req.body;
        console.log(`Updating Advertisement with ID: ${id} with Name: ${Name}, Description: ${Description}, EndsON: ${EndsOn}`);

        const adv = await Adv.findByIdAndUpdate(id, { Name, City, Description, EndsOn, Hits, Price, StartsOn, CityArea, Adv_Status, Adv_Type, Adv_SubCategory, User, Image }, { new: true });
        if (!adv) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json(adv);
    }

    async deleteAdv(req, res) {
        // Logic to delete a user by ID
        const { id } = req.params;
        const adv = await Adv.findByIdAndDelete(id);
        if (!adv) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json({ message: 'Advertisement deleted successfully' });
    }
}
const adv_controller = new Adv_Controller();

module.exports = adv_controller;