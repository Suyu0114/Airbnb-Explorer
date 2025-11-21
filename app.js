/*******************************************************************************
*  ITE5315 – Assignment 4 
*  I declare that this assignment is my own work in accordance with Humber Academic Policy.   
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*  Name: Ching Cheng Student ID: n01680888 Date: 2025-11-18 
* 
********************************************************************************/
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { engine } = require('express-handlebars'); // == Assignment 2 engine

const config = require("./config/database");
const listingRoutes = require("./routes/index");

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json (API)
app.use(express.urlencoded({ extended: true })); // For parsing form data (UI)
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup (Handlebars)
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        // helpers
        currency: (n) => (n == null || n === '' ? '' : Number(n).toFixed(2)),
    }
}));

app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));

// Database Connection!!!!!!!!!!!!!!!!!!!!!
mongoose.connect(config.url)
    .then(() => console.log("MongoDB Atlas Connected Successfully"))
    .catch(err => console.log("DB Connection Error:", err));

// Routes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use("/", listingRoutes);


app.use((req, res) => {
    res.status(404).render('index', { title: "404 Not Found", listings: [] });
});

// Server!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// for vercel!!!!!!!!!
module.exports = app;