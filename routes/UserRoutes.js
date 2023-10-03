const express = require('express');
const UserController = require('../controllers/UserController.js');
const authController = require('./../controllers/authController.js');
const passport = require('passport');
require('dotenv').config();
require('../passport');

const router = express.Router();
router.get('/google',passport.authenticate('google', { scope: ['profile','email'], session: false }));
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
       req.user = profile;
       console.log("profile",profile);
       next();
    })(req, res, next)
}, (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.URL_CLIENT}/loginGoogle/${req.user?.id}`);
});
router.post('/loginGoogle', UserController.loginGoogle);
router.post("/login", UserController.login);
router.post("/signUp", UserController.signUp);

router.use(authController.protect);

router.post("/submitNickname", UserController.submitNickname);
router.get("/getProfileUser", UserController.getProfileUser)
router.get("/getApiUser", UserController.getApiUser);

router.get("/job", (req, res, next) => {
    res.json("phamvanhai");
    console.log("job-run")
});
module.exports = router;
