//! MODULE REQUIREMENTS
const express = require('express'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    path = require('path'),
    moment = require("moment"),
    methodOverride = require('method-override');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const SESSION_PASSWORD = process.env.SESSION_PASS

//! MONGO BAĞLANTISI
mongoose.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    // Server başlatma kodu
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("Database not connected", error);
    })

app.use(session({
    secret: SESSION_PASSWORD,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now * 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const User = require('./models/user'); 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.moment = moment;
    next()
})

const authRoutes = require('./routes/auth'),
    hotelRoutes = require('./routes/hotel'),
    userRoutes = require('./routes/users'),
    reviewRoutes = require('./routes/reviews');
app.use(authRoutes);
app.use(hotelRoutes);
app.use(userRoutes);
app.use(reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})