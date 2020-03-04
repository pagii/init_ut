const express = require('express');
const router = express.Router();
const models = require('../models');
const passwordHash = require('../helpers/passwordHash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;




passport.serializeUser( (user,done) => {
    done(null,user);//세션에 등록해줌
})

//serializeUser를 통해서 세션에 등록이 되고 나면 그 이후의 사용자 request가 올때마다 deserializeUser가 실행되도록 약속되어 있다. 
//나중에 라우터에서 req안에 user라는 멤버변수가 추가되고 그때 그 변수가 가지는 값이 바로 deserializeUser에서 리턴하는 done의 두번째 인자이다.
passport.deserializeUser( (user,done)=>{
    const result = user;
    result.password = "";
    done(null,result);
})
//정책작성
passport.use(new LocalStrategy({
        usernameField : 'displayname',
        passwordField : 'password',
        passReqToCallback : true
    },
    async(req,username,password,done)=>{
        const user = await models.User.findOne({
            where: {
                displayname : req.body.displayname,
                password : passwordHash(password),
            }
        })
        
        //return하는 done의 두번째 인자가 false가 아니면 serializeUser의 callback이 실행된다
        if(!user){
            return done(null, false)
        }
        //유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
        else{
            //이때 return한 유저정보는 serializeUser에서 받아서 세션에 등록한다
            return done(null,user.dataValues);
        }
    }
));
router.get('/join',async(req,res)=>{
    res.render('account/join.html');
})

router.post('/join', async(req,res)=>{
    try{
        const isExist = await models.User.findOne({
            where : {
                displayname : req.body.displayname
            }
        })
        if(isExist != null){
            res.send('<script>alert("이미 존재하는 아이디 입니다."); location.href="/account/join";</script>');
        }
        else{
            await models.User.create(req.body);
            res.send('<script>alert("회원가입 성공"); location.href="/account/login";</script>');
            
        }

    }catch(e){
        console.log(e)
    }
})



router.get('/login',(req,res)=>{
    res.render('account/login.html');
})


//여기서 passport를 통과하면 req안에 user, isAuthenticated, logout을 사용할 수 있게된다
router.post('/login',
    passport.authenticate('local',{
        failureRedirect: '/account/failure',
        // failureFlash: true
    }),
    (_,res)=>{
        res.send('<script>alert("로그인 성공");location.href="/";</script>');
    }
);


router.get('/failure',(_,res)=>{
    res.send('<script>alert("로그인 실패");location.href="/account/login";</script>');
})
module.exports = router;
