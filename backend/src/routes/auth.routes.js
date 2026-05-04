const express = require('express');
const { body } = require('express-validator');
const auth = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
];

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerRules, auth.register);
router.post('/login', loginRules, auth.login);
router.post('/admin/login', loginRules, auth.adminLogin);
router.get('/me', protect, auth.me);

module.exports = router;
