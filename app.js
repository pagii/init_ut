//모듈 선언
const express = require("express");
const nunjucks = require("nunjucks"); //template엔진
const logger = require("morgan");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

//flash  메시지 관련
const flash = require("connect-flash");
//passport 로그인 관련
const passport = require("passport");
const session = require("express-session");

// db 관련
const db = require("./models");

// DB authentication
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return db.sequelize.sync();
    //return db.sequelize.drop();
  })
  .then(() => {
    console.log("DB Sync complete.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const home = require("./routes/home");
const account = require("./routes/account");
const question = require("./routes/question");
const search = require("./routes/search");
const answer = require("./routes/answer");

const app = express();
const port = 3000;

// template 설정
nunjucks.configure("template", {
  autoescape: true, // javascript공격 막기
  express: app
});

//미들웨어
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/static", express.static("static"));

//session 관련 셋팅
app.use(
  session({
    secret: "ut",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
  })
);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

//라우팅
app.use("/", home);
app.use("/account", account);
app.use("/question", question);
app.use("/search", search);
app.use("/answer", answer);

app.listen(port, function() {
  console.log("Express listening on port", port);
});
