const HomepageData = require('../models/HomepageData').HomepageData;
const Gallery = require('../models/GalleryModel').Gallery;
const Category = require('../models/CategoryModel').Category;
const Adoption = require('../models/AdoptionModel').Adoption;
const Donation = require('../models/DonationModel').Donation;
const Social = require('../models/SocialModel').Social;
const { isEmpty } = require('../config/customFunctions')
const session = require('express-session');

module.exports = {

    index: (req, res) => {
        res.render('admin/index');
    },

    getPosts: (req, res) => {

        HomepageData.find()
            .then(homepageData => {
                res.render('admin/posts/index', { homepageData: homepageData });
            })


    },

    submitPosts: (req, res) => {


        const commentsAllowed = req.body.allowComments ? true : false;

        const newHomepageData = new HomepageData({
            title: req.body.title,
            description: req.body.description,
            file: req.body.uploadedFile,
            titleTwo: req.body.titleTwo,
            fileTwo: req.body.uploadedFile2,
            descriptionTwo: req.body.descriptionTwo,
            subtitleOne: req.body.subtitleOne,
            subtitleTwo: req.body.subtitleTwo,
            subtitleThree: req.body.subtitleThree,
            subtitleOne_info: req.body.subtitleOne_info,
            subtitleTwo_info: req.body.subtitleTwo_info,
            subtitleThree_info: req.body.subtitleThree_info
        });

        newHomepageData.save().then(data => {
            console.log(data);
            req.flash('success-message', 'Ahora todo se empieza a ver mejor no? 😎');
            res.redirect('/admin/posts');
        });
    },

    createPost: (req, res) => {

        HomepageData.find().then(homepageData => {
            res.render('admin/posts/create', { homepageData: homepageData })
        })


    },

    editPost: async (req, res) => {
        const id = req.params.id;

        await HomepageData.findById(id)
            .then(homepageData => {
                res.render('admin/posts/edit', { homepageData: homepageData })
            })

    },

    editPostSubmit: (req, res) => {


        const id = req.params.id;


        const commentsAllowed = req.body.allowComments ? true : false;

        const newHomepageData = new HomepageData({
            title: req.body.title,
            description: req.body.description,
            file: req.body.updatedFile,
            titleTwo: req.body.titleTwo,
            fileTwo: req.body.updatedFileTwo,
            descriptionTwo: req.body.descriptionTwo,
            subtitleOne: req.body.subtitleOne,
            subtitleTwo: req.body.subtitleTwo,
            subtitleThree: req.body.subtitleThree,
            subtitleOne_info: req.body.subtitleOne_info,
            subtitleTwo_info: req.body.subtitleTwo_info,
            subtitleThree_info: req.body.subtitleThree_info
        });

        HomepageData.findByIdAndDelete(id).then(
            newHomepageData.save().then(data => {
                console.log(data);
                req.flash('success-message', 'Se actualizó la información correctamente 🤘🏻');
                res.redirect('/admin/posts');
            })
        );

    },

    deletePost: (req, res) => {
        HomepageData.findByIdAndDelete(req.params.id).then(deletedPost => {
            req.flash('error-message', `La información de "${deletedPost.title}" se borró con éxito`);
            res.redirect('/admin/posts')
        })
    },

      /* ALL CATEGORY METHODS*/
      getCategories: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    },

    getEditCategoriesPage: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    submitEditCategoriesPage: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(() => {
                    res.status(200).json({url: '/admin/category'});
                });

            });
        }
    },

    /* Gallery methods */
    getImages: (req, res) => {

        Gallery.find()
            .then(gallery => {
                res.render('admin/gallery/index', { gallery: gallery });
            })


    },

    submitImages: (req, res) => {


        //File Upload

        let fileName = '';

        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            fileName = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir + fileName, error => {
                if (error) {
                    throw (error)
                }
            })
        }



        const newImage = new Gallery({
            file: `/uploads/${fileName}`
        });

        newImage.save().then(data => {
            console.log(data);
            req.flash('success-message', 'Imagen subida con éxito');
            res.redirect('/admin/gallery');
        });
    },

    deleteImage: (req, res) => {
        Gallery.findByIdAndDelete(req.params.id).then(deletedGallery => {
            req.flash('success-message', `Imagen ${deletedGallery.file} eliminada con éxito`);
            res.redirect('/admin/gallery')
        })
    },

    /* Adoptions */

    getAdoptions: (req, res) => {

        Adoption.find()
        .populate('category')
            .then(adoption => {
                res.render('admin/pichichos/index', { adoption: adoption });
            })


    },

    submitAdoption: (req, res) => {


        const commentsAllowed = req.body.allowComments ? true : false;

        const newAdoption = new Adoption({
            title: req.body.title,
            description: req.body.description,
            file: req.body.uploadedFile,
            category: req.body.category,
            age: req.body.age,
            size: req.body.size
        });

        newAdoption.save().then(data => {
            console.log(data);
            req.flash('success-message', 'Genial! Ahora hay un nuevo pichicho que encontrará familia 🧡');
            res.redirect('/admin/pichichos');
        });
    },

    createAdoption: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/pichichos/create', { categories: cats })
        })


    },

    editAdoption: async (req, res) => {
        const id = req.params.id;

        Category.find().then(async cats => {
            await Adoption.findById(id)
                .then(adoption => {
                    res.render('admin/pichichos/edit', { adoption: adoption, cats: cats })
                })
        })



    },

    editAdoptionSubmit: (req, res) => {


        const id = req.params.id;


        const commentsAllowed = req.body.allowComments ? true : false;

        const adoption = new Adoption({
            title: req.body.title,
            description: req.body.description,
            file: req.body.updatedFile,
            category: req.body.category,
            age: req.body.age,
            size: req.body.size
        });

        Adoption.findByIdAndDelete(id).then(
            adoption.save().then(data => {
                console.log(data);
                req.flash('success-message', 'La info de este picho se actualizó correctamente 👍🏻');
                res.redirect('/admin/pichichos');
            })
        );

    },

    deleteAdoption: (req, res) => {
        Adoption.findByIdAndDelete(req.params.id).then(deletedPost => {
            req.flash('error-message', `La publicación de "${deletedPost.title}" se eliminó correctamente`);
            res.redirect('/admin/pichichos')
        })
    },

    logout: (req, res) => {
        res.clearCookie('user');
        req.session.destroy();
        /* console.log(res.clearCookie()); */
        res.redirect('default/index')
    },

    /* Donation */

    getDonation: (req, res) => {

        Donation.find()
            
            .then(donation => {
                res.render('admin/donation/index', { donation: donation });
            })


    },

    submitDonation: (req, res) => {

        const newDonation = new Donation({
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount,
            link: req.body.link
        });

        newDonation.save().then(data => {
            console.log(data);
            req.flash('success-message', 'Genial! Ahora hay un nuevo método de colaboración 🧡');
            res.redirect('/admin/donation');
        });
    },

    createDonation: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/donation/create', { categories: cats })
        })


    },

    editDonation: async (req, res) => {
        const id = req.params.id;
            await Donation.findById(id)
                .then(donation => {
                    res.render('admin/donation/edit', { donation: donation })
                })



    },

    editDonationSubmit: (req, res) => {


        const id = req.params.id;


        const commentsAllowed = req.body.allowComments ? true : false;

        const donation = new Donation({
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount,
            link: req.body.link
        });

        Donation.findByIdAndDelete(id).then(
            donation.save().then(data => {
                console.log(data);
                req.flash('success-message', 'La info de esta donación se actualizó correctamente 👍🏻');
                res.redirect('/admin/donation');
            })
        );

    },

    deleteDonation: (req, res) => {
        Donation.findByIdAndDelete(req.params.id).then(deletedPost => {
            req.flash('error-message', `La donación: "${deletedPost.title}" se eliminó correctamente`);
            res.redirect('/admin/donation')
        })
    },


    /* Social */

    getSocial: (req, res) => {

        Social.find()
            
            .then(social => {
                res.render('admin/social/index', { social: social });
            })


    },

    submitSocial: (req, res) => {

        const newSocial = new Social({
            logo: req.body.logo,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            phone: req.body.phone,
            email: req.body.email
        });

        newSocial.save().then(data => {
            console.log(data);
            req.flash('success-message', 'Genial! La info se ha completado correctamente');
            res.redirect('/admin/social');
        });
    },

    createSocial: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/social/create', { categories: cats })
        })


    },

    editSocial: async (req, res) => {
        const id = req.params.id;
            await Social.findById(id)
                .then(social => {
                    res.render('admin/social/edit', { social: social })
                })



    },

    editSocialSubmit: (req, res) => {


        const id = req.params.id;

        const social = new Social({
            logo: req.body.logo,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            phone: req.body.phone,
            email: req.body.email
        });

        Social.findByIdAndDelete(id).then(
            social.save().then(data => {
                console.log(data);
                req.flash('success-message', 'La info  se actualizó correctamente 👍🏻');
                res.redirect('/admin/social');
            })
        );

    },

    deleteSocial: (req, res) => {
        Social.findByIdAndDelete(req.params.id).then(() => {
            req.flash('error-message', `La información se eliminó correctamente`);
            res.redirect('/admin/social')
        })
    },

};
