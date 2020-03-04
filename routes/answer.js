const express = require("express");
const router = express.Router();
const paginate = require("express-paginate");
const models = require("../models");
const upload_s3 = require("../middleware/multer-s3");

router.post("/write", async (req, res) => {
  try {
    const content_html = req.body.content_html;
    const content_text = req.body.content_text;
    const question_pk = req.body.question_pk;

    //db로부터 user 가져오기
    const user = await models.User.findByPk(req.user.pk);

    //db 저장
    const answerKey = await user.createAnswer({
      content_text: content_text,
      question: question_pk
    });

    //질문 상세화면으로 뿌려줄 해당 질문과 그에 해당하는 답들 가져오기
    const answers = await models.Answer.findOne({
      where: { pk: answerKey.pk }
    });

    res.send({ answers });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
