const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdoptionSchema = new Schema({

    title: {
        type:String,
        required: true
    },


    description: {
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true
    },

    size: {
        type: String,
        required: true
    },

    file: {
        type: String,
        default: ''
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },

});

module.exports ={Adoption:  mongoose.model('adoption', AdoptionSchema)};