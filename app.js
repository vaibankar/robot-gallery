const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let robots = [
  { id: 1, name: "Atlas Mk-I", img: "https://robohash.org/atlas1.png", buy: 1499.99, sell: 899.99, stock: 5 },
  { id: 2, name: "Aegis-X", img: "https://robohash.org/aegis2.png", buy: 999.99, sell: 599.99, stock: 8 },
  { id: 3, name: "BoltRunner", img: "https://robohash.org/bolt3.png", buy: 799.99, sell: 449.99, stock: 12 },
  { id: 4, name: "Caretaker", img: "https://robohash.org/caretaker4.png", buy: 1999.99, sell: 1299.99, stock: 2 },
  { id: 5, name: "Dynamo", img: "https://robohash.org/dynamo5.png", buy: 499.99, sell: 249.99, stock: 20 },
];

app.get("/", (req, res) => {
  const msg = req.query.msg || null;
  res.render("index", { robots, msg });
});

app.get("/buy/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const robot = robots.find(r => r.id === id);
  if (robot && robot.stock > 0) {
    robot.stock--;
    res.redirect("/?msg=You bought " + encodeURIComponent(robot.name) + " for $" + robot.buy);
  } else {
    res.redirect("/?msg=Out of stock");
  }
});

app.get("/sell/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const robot = robots.find(r => r.id === id);
  if (robot) {
    robot.stock++;
    res.redirect("/?msg=You sold " + encodeURIComponent(robot.name) + " for $" + robot.sell);
  } else {
    res.redirect("/?msg=Robot not found");
  }
});

app.listen(port, () => console.log(`🤖 Robot Gallery running at http://localhost:${port}`));
