const express = require('express');
const app = express()

const PORT = process.env.PORT || 4000;


app.set("view engine","ejs");

app.get('/', (req, res)=>{
    res.render("index");
});

app.get('/users/register', (req, res)=>{
    res.render("register");
});

app.get('/users/login', (req, res)=>{
    res.render("login");
});

app.listen(PORT, ()=>{
    console.log('Server running on port ${PORT}');
});