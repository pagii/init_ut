const express = require('express');
const router = express.Router();

router.get('/',async(_,res) =>{
    res.render('index.html');
})

router.get('/faq',async(_,res) =>{
    res.render('faq.html');
})


module.exports = router;