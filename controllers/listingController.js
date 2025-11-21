const Listing = require("../models/Listing");

/*********************************************************
 * API CONTROLLERS (JSON response for Postman)
 *********************************************************/

// GET All (API)
exports.apiGetAll = async (req, res) => {
    console.log("API GET All");
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const listings = await Listing.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();

        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET One by ID (API)
exports.apiGetOne = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST Create (API)
exports.apiCreate = async (req, res) => {
    try {

        const newListing = new Listing(req.body);
        if (!newListing._id) {

            // 簡單產生一個隨機 ID for testing
            newListing._id = Math.floor(Math.random() * 10000000).toString();
        }

        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT Update Title & Price
exports.apiUpdate = async (req, res) => {
    try {
        const { name, price } = req.body; // 只取 name (Title) 和 price

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            {
                NAME: name,    // DB is NAME
                price: price   // price is string
            },
            { new: true, runValidators: true } // new: true     
        );

        if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
        res.json(updatedListing);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE (API)
exports.apiDelete = async (req, res) => {
    try {
        const deleted = await Listing.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Listing not found" });
        res.status(204).send(); // No Content
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*********************************************************
 * VIEW CONTROLLERS (Handlebars UI)
 *********************************************************/

// Show All Listings
exports.viewAllListings = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let filter = {};

        if (searchQuery) {

            filter.NAME = { $regex: searchQuery, $options: 'i' };
        }


        const listings = await Listing.find(filter).limit(20).lean();

        res.render("index", {
            title: "Airbnb Listings",
            listings: listings,
            searchQuery: searchQuery
        });

    } catch (err) {
        console.error(err);
        res.render("error", { message: "Error retrieving data" });
    }
};

// Show Add Form
exports.viewAddForm = (req, res) => {
    res.render("add", { title: "Add New Listing" });
};

// Handle Add Form Submit 
exports.addListingFromForm = async (req, res) => {
    try {
        const { _id, name, price, summary, property_type } = req.body;

        await Listing.create({
            NAME: req.body.name,
            price: req.body.price.toString(),  // price is string
            summary: req.body.summary,
            property_type: req.body.property_type,
            thumbnail: "https://picsum.photos/200"
        });

        res.redirect("/listings");
    } catch (err) {
        res.render("add", {
            title: "Add New Listing",
            error: "Error adding listing: " + err.message
        });
    }
};