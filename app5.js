const express = require("express");
const app = express();

// 格闘技の一覧
let martialArts = [
  {
    id: 1,
    name: "ボクシング",
    category: "打撃系",
    feature: "パンチだけで戦う。距離やフットワークの駆け引きが見どころ"
  },
  {
    id: 2,
    name: "キックボクシング",
    category: "打撃系",
    feature: "パンチとキックを使う。スピード感のある攻防が特徴"
  },
  {
    id: 3,
    name: "空手",
    category: "打撃系",
    feature: "突きや蹴りを使う。流派によってルールや戦い方が異なる"
  },
  {
    id: 4,
    name: "柔道",
    category: "組み技系",
    feature: "投げ技や寝技を使い、相手を制する"
  },
  {
    id: 5,
    name: "レスリング",
    category: "組み技系",
    feature: "タックルや投げで相手を倒し、抑え込む"
  },
  {
    id: 6,
    name: "ブラジリアン柔術",
    category: "組み技系",
    feature: "寝技や関節技を使い、相手をコントロールする"
  },
  {
    id: 7,
    name: "総合格闘技（MMA）",
    category: "総合系",
    feature: "打撃・投げ・寝技を組み合わせて戦う"
  }
];

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

// 挨拶
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";

  res.render("show", {
    greet1: message1,
    greet2: message2
  });
});

app.get("/hello2", (req, res) => {
  res.render("show", {
    greet1: "Hello world",
    greet2: "Bon jour"
  });
});

// アイコン
app.get("/icon", (req, res) => {
  res.render("icon", {
    filename: "./public/Apple_logo_black.svg",
    alt: "Apple Logo"
  });
});

// おみくじ1
app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6) + 1;
  let luck = "";

  if (num === 1) {
    luck = "大吉";
  } else if (num === 2) {
    luck = "中吉";
  }

  res.send("今日の運勢は" + luck + "です");
});

// おみくじ2
app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6) + 1;
  let luck = "";

  if (num === 1) {
    luck = "大吉";
  } else if (num === 2) {
    luck = "中吉";
  }

  res.render("omikuji2", { result: luck });
});

// じゃんけん
app.get("/janken", (req, res) => {
  const hand = req.query.hand;
  let win = Number(req.query.win || 0);
  let total = Number(req.query.total || 0);

  const num = Math.floor(Math.random() * 3) + 1;
  let cpu = "";

  if (num === 1) {
    cpu = "グー";
  } else if (num === 2) {
    cpu = "チョキ";
  } else {
    cpu = "パー";
  }

  let judgement = "";

  if (hand === cpu) {
    judgement = "あいこ";
  } else if (
    (hand === "グー" && cpu === "チョキ") ||
    (hand === "チョキ" && cpu === "パー") ||
    (hand === "パー" && cpu === "グー")
  ) {
    judgement = "勝ち";
    win += 1;
  } else {
    judgement = "負け";
  }

  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render("janken", display);
});

// 格闘技一覧
app.get("/fight", (req, res) => {
  res.render("db2", { data: martialArts });
});

// 格闘技を追加
app.get("/fight_add", (req, res) => {
  const newData = {
    id: req.query.id,
    name: req.query.name,
    category: req.query.category,
    feature: req.query.feature
  };

  martialArts.push(newData);
  res.render("db2", { data: martialArts });
});

// サーバーを起動
app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});