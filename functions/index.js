const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//auth trigger for new user
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.email).set({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    rating: [],
  });
});
// user deleted
/* exports.UserDeleted = functions.auth.user().onDelete((user) => {
  console.log("user deleted", user.email, user.uid);
}); */
