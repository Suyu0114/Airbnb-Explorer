const express = require("express");
const router = express.Router();
const controller = require("../controllers/listingController");




// --- API Routes (Postman testing) ---
router.get("/api/listings", controller.apiGetAll);
router.get("/api/listings/:id", controller.apiGetOne);
router.post("/api/listings", controller.apiCreate);
router.put("/api/listings/:id", controller.apiUpdate); // Q2 req: Update Title & Price
router.delete("/api/listings/:id", controller.apiDelete); // Q2 req: Delete



// --- UI Routes (Browser/Handlebars) ---
router.get("/", (req, res) => res.redirect("/listings")); // Redirect to listings
router.get("/listings", controller.viewAllListings);      // Display all (with search)
router.get("/listings/new", controller.viewAddForm);      // Display add form
router.post("/listings/new", controller.addListingFromForm); // Handle add form submission

module.exports = router;