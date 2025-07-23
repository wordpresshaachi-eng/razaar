const { mongoose, SchemaTypes, Schema, model } = require("mongoose");
const User = require("./user.model");
           
const AdvertisementSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    City: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    Description: {
        type: SchemaTypes.String,
        required: true
    },
    EndsOn: {
        type: SchemaTypes.Date,
        required: true
    },
    Hits: {
        type: SchemaTypes.Number,
        required: true
    },
    Price: {
        type: SchemaTypes.Number,
        required: true
    },
    StartsOn: {
        type: SchemaTypes.Date,
        required: true
    },
    CityArea: {
        type: SchemaTypes.ObjectId,
        ref: "CityArea",
        required: true
    },
    Adv_Status: {
        type: SchemaTypes.ObjectId,
        ref: "Adv_Status",
        required: true
    },
    Adv_Type: {
        type: SchemaTypes.ObjectId,
        ref: "Adv_Type",
        required: true
    },
    Adv_SubCategory: {
        type: SchemaTypes.ObjectId,
        ref: "Adv_SubCategory",
        required: true
    },
    User: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    Image: {
        type: SchemaTypes.ObjectId,
        ref: "Adv_Image",
        required: true
    }
});

const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);

module.exports = Advertisement;