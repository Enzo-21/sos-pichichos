const express = require('express');
const router = express.Router();
const defaultController = require('../../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models/UserModel').User;

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    
    next();
});

router.all('/*')
.get(defaultController.indexInfo,
    defaultController.headerInfo,
    defaultController.footerInfo);


router.route('/')
    .get(defaultController.index);

router.route('/pichichos')
    .get(defaultController.pichichos);

router.route('/pichicho/:id')
    .get(defaultController.infoPichicho);


// Defining Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', 'User not found'))
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'))
            }

            return done(null, user, req.flash('success-message', 'Loged In'))
        })
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// noinspection JSCheckFunctionSignatures
router.route('/login')
    .get(defaultController.login)
    .post(passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }), defaultController.loginPost);

router.route('/register')
    .get(defaultController.register)
    .post(defaultController.registerPost);

router.route('/colaborar')
    .get(defaultController.colaborar);

    router.route('/noticias')
    .get(defaultController.noticias);


module.exports = router;

