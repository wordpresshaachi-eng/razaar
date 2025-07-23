const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: SchemaTypes.String,
        required: true
    },
    ApiKey: {
        type: SchemaTypes.String,
        required: true
    },
    BirthDate: {
        type: SchemaTypes.Date,
        required: true
    },
    ContactNumber: {
        type: SchemaTypes.Number,
        required: true
    },
    Email: {
        type: SchemaTypes.String,
        required: true
    },
    Image: {
        type: SchemaTypes.String,
        required: true
    },
    LoginID: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    Password: {
        type: SchemaTypes.String,
        required: true
    },
    SecurityAnswer: {
        type: SchemaTypes.String,
        required: true
    },
    SecurityQuestion: {
        type: SchemaTypes.String,
        required: true
    },
    Role: {
        type: SchemaTypes.ObjectId,
        ref: "Role",
        required: true
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;