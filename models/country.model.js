const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const CountrySchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    }
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;