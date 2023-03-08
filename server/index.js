import { db, auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, sendPasswordResetEmail } from '@firebase/auth';
import { doc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, getDoc } from '@firebase/firestore';

/**
 * @desc signs a user up with your parameter values
 * @param {*} values an object of values for email, password, and username
 */
export const SignUp = async (values) => {
    const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
        username: values.username,
        email: values.email,
        location: "Vancouver",
    });
    const userUpdate = await updateProfile(userCred.user, {
        displayName: values.username
    });
}

/**
 * @desc signs a user in
 * @param {*} values an object of values for email, password
 */
export const SignIn = async (values) => {
    const result = await signInWithEmailAndPassword(auth, values.email, values.password);
}


export const SignOut = async () => {
    await signOut(auth)
}

export const ForgotPassword = async (values) => {
    await sendPasswordResetEmail(auth, values.email)
}

export const addCatData = async (cat) => {
    let data;
    try {
        const q = query(collection(db, "cats"), where("breedName", "==", cat.breedName), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            data = document.id
        });
        const ref = doc(db, "cats", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                count: docSnap.data().count + 1
            });
        } else {
            const catData = {
                uid: auth.currentUser.uid,
                breedName: cat.breedName,
                count: 1,
                catId: cat.id,
            }
            const docRef = await addDoc(collection(db, "cats"), catData);
        }
    }
    catch (error) {
        const catData = {
            uid: auth.currentUser.uid,
            breedName: cat.breedName,
            count: 1,
            catId: cat.id,
        }
        const docRef = await addDoc(collection(db, "cats"), catData);
    }
}

export const fetchCatData = async () => {
    let data = []
    const q = query(collection(db, "cats"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data() })
    });
    return data
}


export const fetchCurrentUserData = async () => {
    const ref = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data();
    }
}


export const updateWeatherData = async (weather) => {
    const ref = doc(db, "users", auth.currentUser.uid)
    await updateDoc(ref, {
        location: weather
    });
}


export const fetchUserItems = async () => {
    let data = []
    const q = query(collection(db, "items"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data() })
    });
    return data;
}


export const addUserItem = async (item) => {
    let data;
    const q = query(collection(db, "items"), where("name", "==", item.name), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data = document.id
    });
    try {
        const ref = doc(db, "items", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                // don't want to update increase count above 1 yet
                // count: docSnap.data().count + 1
                count: docSnap.data().count
            });
        } else {
        }
    }
    catch (error) {
        const itemData = {
            uid: auth.currentUser.uid,
            name: item.name,
            count: 1,
            itemID: item.id,
            image: item.image
        }
        const docRef = await addDoc(collection(db, "items"), itemData);
    }
}
export const addUserTreat = async (item) => {
    let data;
    const q = query(collection(db, "treats"), where("name", "==", item.name), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data = document.id
    });
    try {
        const ref = doc(db, "treats", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                // count: docSnap.data().count + 1
                count: docSnap.data().count
            });
        } else {
        }
    }
    catch (error) {
        const treatData = {
            uid: auth.currentUser.uid,
            name: item.name,
            count: 1,
            itemID: item.id,
            image: item.image
        }
        const docRef = await addDoc(collection(db, "treats"), treatData);
    }
}

export const fetchUserTreats = async () => {
    let data = []
    const q = query(collection(db, "treats"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data() })
    });
    return data;
}

export const addUserOfferings = async (cat, offering) => {
    let data;
    const q = query(collection(db, "offerings"), where("name", "==", offering.name), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data = document.id
    });
    try {
        const ref = doc(db, "offerings", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                count: docSnap.data().count + 1
                // count: docSnap.data().count
            });
        } else {
        }
    }
    catch (error) {
        const offeringData = {
            uid: auth.currentUser.uid,
            name: offering.name,
            count: 1,
            itemID: offering.id,
            image: offering.image,
            cat: cat.breedName,
            catImg: "/cats/caticon.svg",
            state: false,
        }
        const docRef = await addDoc(collection(db, "offerings"), offeringData);
    }
}

export const fetchUserOfferings = async () => {
    let data = []
    const q = query(collection(db, "offerings"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data() })
    });
    return data;
}
