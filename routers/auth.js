const express = require('express');

const router = express.Router();

//import controllers
const {signup,signIn,googlelogin,facebooklogin} = require('../controllers/auth')

router.post('/signup', signup);
router.post('/signin', signIn);

router.post('/googlelogin', googlelogin);
router.post('/facebooklogin', facebooklogin)

module.exports = router;