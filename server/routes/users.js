const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');



router.get('/auth', auth, (req, res) => {
    //console.log(req.user);
    res.status(200).json({ 
        isAuth: true,
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    });
});

router.post('/register', (req, res) => {

    const user = new User(req.body);
    user.save().then(() => {
        res.status(200).json({ success: true })
    })
    .catch((err) => {
        res.json({ success: false, err })
    })
});

router.post('/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에 있는지 확인
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: '이메일이 일치하는 유저가 없습니다.'
            })
        }

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.'})
            }

            //비밀번호가 일치하면 jwt 이용하여 토큰 생성
            user.generateToken((err, _user) => {
                //console.log(_user);
                if(err) return res.status(400).send(err);
                
                // 토큰을 쿠키에 저장
                res.cookie('x_authExp', _user.tokenExp);
                res.cookie('x_auth',_user.token).status(200).json({ loginSuccess: true, userId: _user._id });

            })

        })

    })
    .catch(err => {
        return res.status(404).send(err);
    })
});


router.get('/logout', auth, (req, res) => {
    //쿠키 삭제
    let token = req.cookies['x_auth'];
    token && res.cookie('x_auth','',{ maxAge:0 });
    let tokenExp = req.cookies['x_authExp'];
    tokenExp && res.cookie('x_authExp','',{ maxAge:0 });


    User.findOneAndUpdate({ _id: req.user._id },{ token: "", tokenExp: ""})
    .then(() => {
        //console.log(user);
        return res.status(200).json({ success: true });
    })
    .catch(err => {
        res.json({ success: false , err });
    })

});



module.exports = router;