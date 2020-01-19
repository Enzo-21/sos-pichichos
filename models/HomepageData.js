const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomepageDataSchema = new Schema({

    title: {
        type:String,
        required: true
    },


    description: {
        type: String,
        required: true
    },


    file: {
        type: String,
        default: ''
    },

    fileTwo: {
        type: String,
        default: ''
    },

    titleTwo: {
        type:String,
        required: true
    },

    descriptionTwo: {
        type:String,
        required: true
    },

    subtitleOne: {
        type:String,
        required: false
    },

    subtitleTwo: {
        type:String,
        required: false
    },

    subtitleThree: {
        type:String,
        required: false
    },

    subtitleOne_info: {
        type:String,
        required: false
    },

    subtitleTwo_info: {
        type:String,
        required: false
    },

    subtitleThree_info: {
        type:String,
        required: false
    },

});

module.exports ={HomepageData:  mongoose.model('homepageData', HomepageDataSchema)};