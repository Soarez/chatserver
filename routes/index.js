var express = require('express');
var router = express.Router();
var operate = require('../operations.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.signedCookies.name)
		res.render('index', { title: 'Chat' });
	else
		res.redirect('signin');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

router.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	operate.addUser(username, password, function(err){
		if(err) throw err;
		res.redirect('/signin');
	});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Login' });
});

router.post('/signin', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log('trying to sign in', req.body);
	operate.authenticate(username, password, function(err, user) {
		if(err) throw err;
		if(!user) {
			res.redirect('/signin');
		}
		else {
			//socket.emit('login', username);
			res.cookie('name', username, { expires: new Date(Date.now() + 900000), signed: true});
			res.redirect('/');
		}
	});
});

router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'Settings' });
});

router.get('/logout', function(req, res, next) {
	//socket.emit('logout', username);
	res.clearCookie('name');
	res.redirect('/signin');
})

module.exports = router;
