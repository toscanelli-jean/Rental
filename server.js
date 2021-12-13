const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// add after CRUD
const session = require("express-session");
app.use(session({
    secret: "SecretRandomKey123QWE",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

// add after SESSION
/* const auth = require("./utils/users.auth");
auth.initialization(app); */

// add first
app.listen(process.env.SERVER_PORT,
    function() { console.log("Server listening at:" + process.env.SERVER_PORT); }
);
app.get('/', (request, response) => {
    response.render('accueil');
});
// CUT 1

app.set("view engine", "ejs");
app.set("views", "views");
const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true })); //callback, callback, ...
//app.use("/hello", require("./controllers/hello.route")); // path, callback
// CUT 2

app.use('/static', express.static(__dirname + '/static'));
app.use("/bikes", require("./controllers/bikes.route"));
app.use("/accueil", require("./controllers/accueil.route"));
app.use("/stores", require("./controllers/stores.route"));

// CUT 3