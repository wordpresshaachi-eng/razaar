const { mongoose } = require("mongoose");
const express = require("express");
const connectToDatabase = require("./db");

const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const host = process.env.HOST;
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/cityarea", require("./routes/cityarea.route"));
app.use("/city", require("./routes/city.route"));
app.use("/country", require("./routes/country.route"));
app.use("/province", require("./routes/provinces.route"));
app.use("/role", require("./routes/role.route"));
app.use("/user", require("./routes/user.route"));
app.use("/login", require("./routes/login.route"));
app.use("/signup", require("./routes/signup.route"));

app.use("/adv", require("./routes/advertisement.route"));
app.use("/adv_subcategory", require("./routes/adv_subcategory.route"));
app.use("/adv_category", require("./routes/adv_category.route"));
app.use("/adv_images", require("./routes/adv_images.route"));
app.use("/adv_status", require("./routes/adv_status.route"));
app.use("/adv_type", require("./routes/adv_types.route"));

app.listen(port, host, async() =>{
    try{
        await connectToDatabase();
        console.log(`Server is listening on http://${host}:${port}`);
    }
    catch(error) {
        console.error("Failed to connect to the database:", error);
    }
});