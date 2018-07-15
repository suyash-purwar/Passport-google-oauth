const router = require('express').Router();

const authCheck = (req, res, next) => {
   if(!req.user) {
      // if user is not logged in
      res.redirect('/auth/login');
   } else {
      next();
   }
}

router.get('/', authCheck, (req, res) => {
    res.send(`You are logged in ${req.user.username}, this is your profile`);
});

module.exports = router;