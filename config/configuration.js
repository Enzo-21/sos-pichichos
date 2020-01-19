module.exports = {
    mongoDbUrl: 'mongodb+srv://enzo_21:3oGazCH7V1eKMilJ@sos-pichichos-cluster-0npwj.gcp.mongodb.net/test?retryWrites=true&w=majority',
    port: process.env.PORT,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },
}