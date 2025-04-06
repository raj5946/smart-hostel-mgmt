// controllers/messController.js
const MessMenu = require("../models/MessMenu");

// Get the current mess menu
const getMessMenu = async (req, res) => {
  try {
    let menu = await MessMenu.findOne({});
    if (!menu) {
      // Optionally create a default mess menu if not found:
      menu = await MessMenu.create({
        date: new Date().toISOString().split("T")[0],
        breakfast: "Default Breakfast",
        lunch: "Default Lunch",
        dinner: "Default Dinner",
      });
    }
    res.json(menu);
  } catch (error) {
    console.error("Error fetching mess menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update (or create) the mess menu (admin only)
const updateMessMenu = async (req, res) => {
  try {
    // Assume req.body contains the fields to update, e.g.:
    // { date: "2025-04-06", breakfast: "Pancakes", lunch: "Rice & Curry", dinner: "Pasta" }
    const updatedData = req.body;
    // Find one menu document and update it; create one if it doesn't exist.
    const menu = await MessMenu.findOneAndUpdate({}, updatedData, {
      new: true,
      upsert: true,
    });
    res.json(menu);
  } catch (error) {
    console.error("Error updating mess menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMessMenu,
  updateMessMenu,
};
