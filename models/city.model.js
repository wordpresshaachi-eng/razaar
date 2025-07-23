const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const CitySchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Country: {
        type: SchemaTypes.ObjectId,
        ref: "Country",
        required: true
    },
    Province: {
        type: SchemaTypes.ObjectId,
        ref: "Province",
        required: true
    }
});

const City = mongoose.model("City", CitySchema);

module.exports = City;