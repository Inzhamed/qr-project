const passport = require("passport")
const GoogleSt = require("passport-google-oauth20")
const User = require("../../models/user")

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.default.findById(id).then((user) => {
        done(null, user);
    });
})

passport.use(new GoogleSt({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/auth/google/redirect",
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile._json)
    User.default.findOne({ email: profile._json.email }).then(current => {
        if(current) {
            return done(null, current)
        } else {
            const newUser = User.default.create({
                fullName: profile._json.given_name + " " + profile._json.family_name,
                email: profile._json.email
            }).then((user) => {
                    done(null, user)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    })
}))