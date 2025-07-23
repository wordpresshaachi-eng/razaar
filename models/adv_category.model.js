const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const Adv_categorySchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Image: {
        type: SchemaTypes.String,
        required: true
    }

});

const Adv_category = mongoose.model("Adv_Category", Adv_categorySchema);

module.exports = Adv_category;