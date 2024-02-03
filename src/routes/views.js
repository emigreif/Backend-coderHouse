const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {})
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login')
});

router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register')
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.session.user })
});

router.get('/products', isLoggedIn, (req, res) => {
    res.render('products', { user: req.session.user })
});

module.exports = router
