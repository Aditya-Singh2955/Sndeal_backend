const express = require('express');
const router = express.Router();
const Watch = require('../model/Watch');
const HomeAppliance = require('../model/HomeAppliances');
const Cookware = require('../model/Cookware');

// Function to normalize and preprocess search term
const preprocessKeyword = (keyword) => {
  return keyword
    .trim()
    .toLowerCase()
    .replace(/s\b/g, ''); // Simple normalization: remove trailing 's' for pluralization
};

exports.itemSearch = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  try {
    const normalizedKeyword = preprocessKeyword(keyword);
    const regex = new RegExp(normalizedKeyword.split(' ').join('|'), 'i'); // Split keywords by space and join with OR

    const [watches, homeAppliances, cookwares] = await Promise.all([
      Watch.find({ $or: [{ name: regex }, { description: regex }, { category: regex }, { brand: regex }] }).exec(),
      HomeAppliance.find({ $or: [{ name: regex }, { description: regex }, { category: regex }, { brand: regex }] }).exec(),
      Cookware.find({ $or: [{ name: regex }, { description: regex }, { category: regex }, { brand: regex }] }).exec()
    ]);

    const results = {
      watches,
      homeAppliances,
      cookwares
    };

    const totalResults = watches.length + homeAppliances.length + cookwares.length;

    if (totalResults > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: 'No products found matching your search.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Suggestion endpoint
exports.getSuggestions = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  try {
    const normalizedKeyword = preprocessKeyword(keyword);
    const regex = new RegExp(normalizedKeyword.split(' ').join('|'), 'i');

    const [watchSuggestions, homeApplianceSuggestions, cookwareSuggestions] = await Promise.all([
      Watch.find({ name: regex }).limit(10).exec(),
      HomeAppliance.find({ name: regex }).limit(10).exec(),
      Cookware.find({ name: regex }).limit(10).exec()
    ]);

    const suggestions = {
      watches: watchSuggestions.map(item => item.name),
      homeAppliances: homeApplianceSuggestions.map(item => item.name),
      cookwares: cookwareSuggestions.map(item => item.name)
    };

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
