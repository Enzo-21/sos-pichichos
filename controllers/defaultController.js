const HomepageData = require('../models/HomepageData').HomepageData;
const Category = require('../models/CategoryModel').Category;
const Adoption = require('../models/AdoptionModel').Adoption;
const Donation = require('../models/DonationModel').Donation;
const Social = require('../models/SocialModel').Social;
const bcrypt = require('bcrypt');
const User = require('../models/UserModel').User;


module.exports = {

    index: async (req, res) => {

        const homepageData = await HomepageData.find();
        const social = await Social.find();

        res.render('default/index', { homepageData: homepageData, social: social });
    },

    indexInfo: async (req, res) => {

       
        const social = await Social.find();

        res.render('layouts/default', { social: social });
    },

    headerInfo: async (req, res) => {

       
        const social = await Social.find();

        res.render('partial/default/header', { social: social });
    },

    footerInfo: async (req, res) => {

       
        const social = await Social.find();

        res.render('partial/default/footer', { social: social });
    },


    pichichos: async (req, res) => {
        const social = await Social.find();

        const adoption = await Adoption.find()
            .populate('category');
        const categories = await Category.find();

        res.render('default/pichichos', { adoption: adoption, categories: categories, social: social });
    },

    infoPichicho: async (req, res) => {
        const social = await Social.find();
        const id = req.params.id
        const adoption = await Adoption.findById(id)
            .populate('category');
        const categories = await Category.find();

        res.render('default/infopichicho', { adoption: adoption, categories: categories, social: social });
        /* res.send(JSON.stringify(adoption)); */
    },


    //Login
    login: async (req, res) => {
        const social = await Social.find();
        res.render('default/login', {message: req.flash('error'), social: social});
    },

    loginPost: (req, res) => {
        
    },

    //Register
    register: async (req, res) => {
        const users = await User.find()

        if (users.length < 1) {
            const social = await Social.find();
            res.render('default/register', {social: social});
        } else {
            res.redirect('/login')
        }


       
    },

    registerPost:  (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({message: 'Password field is mandatory'});
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.findOne({email: req.body.email}).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    },

    colaborar: async (req, res) => {
        const social = await Social.find();
        const donation = await Donation.find();
        res.render('default/colaborar', {donation: donation, social: social})
    },

    noticias: async (req, res) => {
        const social = await Social.find();
       
        res.render('default/noticias', {social: social})
    },


};


