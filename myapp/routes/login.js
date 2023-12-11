const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res, next) {
  res.render('login', {user: req.session.user});
});

router.post('/', async (req, res) => {
  const user = req.body.user;
  if (await database.user.isLoginRight(user, req.body.pass)) {
      req.session.user = { username: user };
      req.session.message = "Usuario logeado correctamente!"
      loggedInUser = req.session.user;
      res.redirect("restricted");
  } else {
      req.session.error = "Error en el login, por favor vuelva a introducir sus credenciales";
      res.redirect("login");
  }
});


module.exports = router;
