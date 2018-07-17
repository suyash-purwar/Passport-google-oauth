const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

// set up cookieSession
app.use(cookieSession({
   maxAge: 24*60*60*1000,
   keys: [keys.session.cookieKey]
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
   res.render('home', {user: req.user});
});

// set up port
app.listen(port, () => {
   console.log("Server is up on port " + port);
});