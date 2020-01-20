const express = require('express');
const router = express.Router();
const admiController = require('../../controllers/adminController');
const { isUserAuthenticated } = require('../../config/customFunctions');


router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.route('/')
    .get(admiController.index);

router.route('/posts')
    .get(admiController.getPosts);


router.route('/posts/create')
    .get(admiController.createPost)
    .post(admiController.submitPosts);

router.route('/posts/edit/:id')
    .get(admiController.editPost)
    .put(admiController.editPostSubmit)

router.route('/posts/delete/:id')
    .delete(admiController.deletePost);

/* ADMIN CATEGORY ROUTES*/

router.route('/category')
    .get(admiController.getCategories);


router.route('/category/create')
    .post(admiController.createCategories);


router.route('/category/edit/:id')
    .get(admiController.getEditCategoriesPage)
    .post(admiController.submitEditCategoriesPage);

/* Gallery */ 

router.route('/gallery')
    .get(admiController.getImages)
    .post(admiController.submitImages);

router.route('/gallery/:id')
    .delete(admiController.deleteImage);


/* Pichichos */

router.route('/pichichos')
    .get(admiController.getAdoptions);

router.route('/pichichos/create')
    .get(admiController.createAdoption)
    .post(admiController.submitAdoption);

router.route('/pichichos/edit/:id')
    .get(admiController.editAdoption)
    .put(admiController.editAdoptionSubmit)

router.route('/pichichos/delete/:id')
    .delete(admiController.deleteAdoption);

router.route('/logout')
    .get(admiController.logout);

//Donations
router.route('/donation')
    .get(admiController.getDonation);

router.route('/donation/create')
    .get(admiController.createDonation)
    .post(admiController.submitDonation);

router.route('/donation/edit/:id')
    .get(admiController.editDonation)
    .put(admiController.editDonationSubmit)

router.route('/donation/delete/:id')
    .delete(admiController.deleteDonation);

//Social
router.route('/social')
    .get(admiController.getSocial);

router.route('/social/create')
    .get(admiController.createSocial)
    .post(admiController.submitSocial);

router.route('/social/edit/:id')
    .get(admiController.editSocial)
    .put(admiController.editSocialSubmit)

router.route('/social/delete/:id')
    .delete(admiController.deleteSocial);
module.exports = router;