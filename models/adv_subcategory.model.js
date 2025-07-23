const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const Adv_subcategorySchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    Image: {
        type: SchemaTypes.String,
        required: true
    },
    Category: {
        type: SchemaTypes.ObjectId,
        ref: "Adv_Category",
        required: true
    }
});

const Adv_subcategory = mongoose.model("Adv_SubCategory", Adv_subcategorySchema);

module.exports = Adv_subcategory;