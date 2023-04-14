const router = require('express').Router();
let Locale = require('../models/locale.model');

router.route('/').get((req, res) => {
    Locale.find()
    .then(locales => res.json(locales))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:placeName').post((req, res) => {

    Locale.find({placeName: req.params.placeName})
    .then(locale => {
        if (locale[0]) {
            locale[0].clicks = req.body.clicks;
            locale[0].save()
            .then(() => res.json('locale added'))
            .catch(err => res.status(400).json('Error: ' + err));   
        }
        else {
            const placeName = req.body.placeName;

            const newLocale = new Locale({placeName, clicks: 1});
            newLocale.save()
            .then(() => res.json('locale added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => {
        res.status(400).json('Error: ' + err)
    });
})

module.exports = router;