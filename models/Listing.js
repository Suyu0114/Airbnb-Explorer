const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

    // title
    NAME: { type: String, required: true },
    price: { type: String },
    thumbnail: { type: String },
    summary: String,
    property_type: String,
    images: [String]

}, {
    collection: 'listings', // set collection name
    strict: false // allow unknown fields
});

// Export the model
module.exports = mongoose.model("Listing", listingSchema, "listings"); 