import { db, auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';

export const SignUp = async (values) => {
    const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);

    const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
        username: values.username,
        email: values.email,
    });
    const userUpdate = await updateProfile(userCred.user, {
        displayName: values.username
    });
}