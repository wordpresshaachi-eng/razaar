const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const provincesSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Country : {
        type: SchemaTypes.ObjectId,
        ref: "Country",
        required: true
    }
});

const provinces = mongoose.model("Province", provincesSchema);

module.exports = provinces;