const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({

    logo: {
        type:String,
        required: true
    },


    facebook: {
        type: String,
        required: false
    },

    instagram: {
        type: String,
        required: false
    },

    twitter: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: false
    },
    

});

module.exports ={Social:  mongoose.model('social', SocialSchema)};