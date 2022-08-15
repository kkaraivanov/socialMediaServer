const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const {hbs, static} = require('./config');

const bars = handlebars.create(hbs.config);

function init(app) {
    // setup the view engine
    app.engine(hbs.name, bars.engine)
    app.set('view engine', hbs.name);
    app.set('views', hbs.handlebarsPath);
    // setup the body parser
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
    // setup the static files
    app.use(express.static(static.path));
    //TODO setup the routes
}

module.exports = {
    init
}