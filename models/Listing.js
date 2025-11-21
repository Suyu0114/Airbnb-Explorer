const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    // JSON id or _id
    _id: { type: String },
    // title
    NAME: { type: String, required: true },
    price: { type: String },
    thumbnail: { type: String },
    summary: String,
    property_type: String,
    images: [String]
}, {
    collection: 'listings' // set collection name
});

// Export the model
module.exports = mongoose.model("Listing", listingSchema, "listings"); 