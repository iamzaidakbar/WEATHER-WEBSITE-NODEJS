const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./geocode");

const app = express();

// Static Path
app.use("/public", express.static("public"));

// Dynamic Path
const partial_path = path.join(__dirname, "../partials");

// views path
const views_path = path.join(__dirname, "../views");

// Set handlebars
app.set("views", views_path);
app.set("view engine", "hbs");
hbs.registerPartials(partial_path);

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Abouot Route
app.get("/about", (req, res) => {
    res.render("about");
});

// Weather Api Route
app.get("/weather", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide query",
        });
    }
    geocode(req.query.search, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.send(data);
    });
});

// Create Server
app.listen(3000, () => {
    console.log("Server created on http://localhost:3000");
});
