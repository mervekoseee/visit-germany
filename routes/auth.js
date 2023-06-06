let express = require('express');
const passport = require('passport');
let router = express.Router();
let { showRegisterForm, getRegistrationForm, loginForm, getLoginForm, logout } = require('../controllers/auth-controllers')

router.get('/register', showRegisterForm)

router.post('/register', getRegistrationForm)

router.get('/login', loginForm)

router.post("/login", passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), getLoginForm);

// router.get('/logout', async (req, res) => {
//     req.logout((error) => {
//         if (error) {
//             req.flash('error', 'Error  !')
//             console.log("error logging out", error)
//             return res.redirect('/hotels')
//         }
//         console.log("hi")
//         req.flash('success', 'Logged out successfully !')
//         res.redirect('/hotels')
//     })
// })

router.get("/logout", logout);


module.exports = router;