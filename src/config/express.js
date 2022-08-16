const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const {hbs, static} = require('./config');
const route = require('../controllers/route');

const bars = handlebars.create(hbs.config);

function init(app) {
    // view engine
    app.engine(hbs.name, bars.engine)
    app.set('view engine', hbs.name);
    app.set('views', hbs.handlebarsPath);
    
    // the body parser
    app.use(bodyParser.json(
        {
            limit: "50mb"
        }
    ));
    app.use(bodyParser.urlencoded(
        {
            extended: true
        }
    ));

    // static files
    app.use(express.static(static.path));

    // the routes
    app.use(route)
}

module.exports = {
    init
}