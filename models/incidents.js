let mongoose = require('mongoose');

let incidentModel = mongoose.Schema(
    {
        title: String,
        description: String,
        priority: String,
        tags: []
    },
    {
        collection: "incidents",
        timestamps: true
    }
);

module.exports = mongoose.model('incidents', incidentModel);