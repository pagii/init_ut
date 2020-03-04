const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const models = require('../models');
const upload_s3 = require('../middleware/multer-s3');



router.get('/', paginate.middleware(3,50), async (req,res) => {

    try{

        const [ questions, totalCount ]  = await Promise.all([
            models.Question.findAll({
                limit : req.query.limit,
                offset : req.offset,
                // order:[
                //     ['createdAt','DESC']
                // ]
            }),
            models.Question.count()
        ]);

        console.log(totalCount)
        //res.render('questions/result.html',{questions});
        //총 페이지 개수
        const pageCount = Math.ceil(totalCount / req.query.limit);

        
        const pages = paginate.getArrayPages(req)(3,pageCount,req.query.page);

        res.render( 'questions/result.html',{questions, pages, pageCount});

    }catch(e){
        console.log(e)
    }
});

router.get('/write',async (req,res) => {
    console.log(req.isAuthenticated())
    res.render('questions/write.html');
})

router.post('/write',async (req,res) => {
    console.log(req.isAuthenticated())
    var param = {}
    try{


        //req의 user객체 안에는 local-passport에서 정한 session에 대한 정보가 들어있다.
        //user hasmany를 통한 create메소드를 이용하기 위해 user db_row를 db에서 불러온다
        const user = await models.User.findByPk(req.user.pk);
        const questionKey = await user.createQuestion(req.body);
        
        param.success = 1
        param.id = questionKey.pk
        res.json(param);

    }catch(e){
        console.log(e)
        param.success=0;
        res.json(param);
    }
   
})

router.post('/write/fileupload',upload_s3.single("image"),async(req,res)=>{
    var img_url = req.file.location;
    res.send(img_url)
})


//질문 상세화면
router.get('/detail/:id',async(req,res) =>{
    
    const questionId = req.params.id
    const question = await models.Question.findByPk(questionId);

    //질문 상세화면으로 뿌려줄 해당 질문과 그에 해당하는 답들 가져오기
    const answers = await models.Answer.findAll({
        where : {question : questionId}
    })

    const stringified_answers = JSON.stringify(answers)
    res.render("questions/comment.html",{question,stringified_answers});
})

module.exports = router;