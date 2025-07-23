const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const roleSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    }
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;