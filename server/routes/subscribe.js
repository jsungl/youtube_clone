const express = require('express');
const router = express.Router();

const { Subscriber } = require('../models/Subscriber');

router.post('/subscribeNumber', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo })
    .exec().then((subscribe) => {
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
    })
    .catch(err => {
        res.status(400).send(err);
    })
});


router.post('/subscribed', (req, res) => {

    if(!req.body.userFrom) {
        return res.status(200).json({ success: true, subscribed: false });
    }else {
        Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec().then((subscribe) => {
            let result = false;
            if(subscribe.length !== 0) {
                result = true
            }
            return res.status(200).json({ success: true, subscribed: result });
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }
});

router.post('/subscribe', (req, res) => {

    const subscribe = new Subscriber(req.body);

    subscribe.save().then(() => {
        return res.status(200).json({ success: true });
    })
    .catch(err => res.json({ success: false, err }));

});


router.post('/unSubscribe', (req, res) => {

    let { userTo, userFrom } = req.body

    Subscriber.findOneAndDelete({ userTo, userFrom })
        .exec().then((doc)=>{
            return res.status(200).json({ success: true, doc })
        })
        .catch(err => { res.status(400).json({ success: false, err}) })
});



module.exports = router;