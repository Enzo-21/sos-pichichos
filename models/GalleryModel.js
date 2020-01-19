const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({

    file: {
        type:String,
        required: true
    }

});

module.exports ={Gallery:  mongoose.model('gallery', GallerySchema)};