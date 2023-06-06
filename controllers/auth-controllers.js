const User = require('../models/user');

const showRegisterForm = async (req, res) => {
    res.render('users/register')
}

const getRegistrationForm = async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            name: req.body.name
        })
        let registeredUser = await User.register(user, req.body.password)
        req.logIn(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'Kayıt başarısız !')
                return res.redirect('/register')
            }
            req.flash('success', 'User registered successfully !')
            res.redirect('/hotels')
        })
    } catch (error) {
        req.flash('error', 'Kayıt başarısız !')
        return res.redirect('/register')
    }
}

const loginForm = async (req, res) => {
    // login form
    res.render('users/login')
}

const getLoginForm = (req, res) => {
    req.flash('success', 'Tekrar hoşgeldin')


    const redirectTo = req.session.originalUrl || '/';
    delete req.session.originalUrl; 
    res.redirect(redirectTo);
}

const logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

module.exports = {
    showRegisterForm,
    getRegistrationForm,
    loginForm,
    getLoginForm,
    logout
}