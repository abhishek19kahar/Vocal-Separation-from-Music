// const express = require('express');
// const { submitContactForm } = require('../Controllers/ContactController');

// const router = express.Router();

// // POST /api/contact
// router.post('/contact', submitContactForm);

// module.exports = router;


import express from 'express';
import { submitContactForm } from '../Controllers/ContactController.js';

const router = express.Router();

// POST /api/contact
router.post('/contact', submitContactForm);

export default router;
