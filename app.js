const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require('./config/passport-setup');

const app = express();
const port = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
   res.render('home');
});

// set up port
app.listen(port, () => {
   console.log("Server is up on port " + port);
});