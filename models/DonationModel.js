const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({

    title: {
        type:String,
        required: true
    },


    description: {
        type: String,
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    

});

module.exports ={Donation:  mongoose.model('donation', DonationSchema)};