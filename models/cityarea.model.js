const { mongoose, SchemaTypes, Schema, model } = require("mongoose");
const City = require("./city.model");

const CityAreaSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    City: {
        type: SchemaTypes.ObjectId,
        ref: "City",
        required: true
    }
});

const CityArea = mongoose.model("CityArea", CityAreaSchema);

module.exports = CityArea;