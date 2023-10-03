// import passport from 'passport';
// import db from  './models';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// require('dotenv').config()
//  passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/api/users/google/callback"
//   },
//   async function(accessToken, refreshToken, profile, cb) {
//       //them User vào db
//       if(profile?.id) {
//         // const userId = parseInt(profile.id, 10);
//         await db.User.findOrCreate({
//           where:{fullname:profile.id},
//           defaults:{
//             email:profile.emails[0]?.value,
//             // typeLogin:profile?.provider
//           }
//         })
//       }
//     // console.log(profile); 
//     return cb(null, profile);
//   }
// ));
