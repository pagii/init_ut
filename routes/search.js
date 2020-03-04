const express = require("express");
const router = express.Router();
const models = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

//교재로 검색
router.post("/book", async (req, res) => {
  try {
    // question테이블에서 검색한 교재중에 해당 검색어를 질문제목과 내용에서 like 검색

    console.log(searched_questions);
    res.render("index.html");
  } catch (e) {
    console.log(e);
  }
});

//분야로 검색
router.post("/domain", async (_, res) => {
  res.render("index.html");
});

module.exports = router;
