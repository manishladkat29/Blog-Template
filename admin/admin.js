var express = require('express');
var router = express.Router();

// Home page route.
router.get('/admin', function (req, res) {
    console.log("Hello");
    res.render('login.ejs');
});

module.exports = router;