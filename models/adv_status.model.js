const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const Adv_statusSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    }
});

const Adv_status = mongoose.model("Adv_Status", Adv_statusSchema);

module.exports = Adv_status;