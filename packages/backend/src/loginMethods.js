import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginToFirebase = async (app, user, pass) => {
  const auth = getAuth(app);
  let returnVal;
  await signInWithEmailAndPassword(auth, user, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(`Signed in as ${user.email}.`);
      returnVal = true;
    })
    .catch((error) => {
      console.log(error.message);
      returnVal = false;
    });
  return returnVal;
};

export default loginToFirebase;
