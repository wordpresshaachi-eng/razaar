const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const Adv_typesSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    }
});

const Adv_type = mongoose.model("Adv_Type", Adv_typesSchema);

module.exports = Adv_type;