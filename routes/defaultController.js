const Sequelize = require('sequelize');
const models = require('../models');


module.exports = {

    default: function(req, res, next) {
        models.Topic.findAll({}).then(topics => {
            res.render('index', {topics: topics});
        }) 
    }   
}