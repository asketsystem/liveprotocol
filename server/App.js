const bodyParser = require("body-parser");
const { config } = require("docker-compose");
const express = require("express");
const { default: mongoose } = require("mongoose");
Session = require("express-session");
bodyParser = require("body-parser");
mongoose = require("mongoose");
middleware = require("connect-ensure-login");
fileStore = require("session-file-store");
config = require("./config/default");
flash = require("connect-flash");
port = 3333;
app = express();

mongoose.connect("mongodb://127.0.0.1/nodeStream", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("public"));
app.use(flash());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  Session({
    store: new FileStore({
      path: "./server/sessions",
    }),
    secret: config.server.secret,
    maxAge: Date().now + 60 * 1000 * 30,
  })
);

app.get("*", middleware.ensureLoggedIn(), (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`App listening on ${port}!`));
