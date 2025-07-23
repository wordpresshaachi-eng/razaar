const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const Adv_imagesSchema = new mongoose.Schema({
    Caption: {
        type: SchemaTypes.String,
        required: true
    },
    Contents: {
        type: SchemaTypes.String,
        required: true
    },
    Rank: {
        type: SchemaTypes.Number,
        required: true
    }
});

const Adv_images = mongoose.model("Adv_Image", Adv_imagesSchema);

module.exports = Adv_images;