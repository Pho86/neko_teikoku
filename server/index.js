import { db, auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, sendPasswordResetEmail } from '@firebase/auth';
import { doc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, getDoc, orderBy } from '@firebase/firestore';
import OfferingsData from "@/data/ingredients.json"
import ItemsData from "@/data/items.json"
import { selectRandomFromArray } from "@/util";
import CatData from "@/data/meow.json"
/**
 * @desc signs a user up with your parameter values
 * @param {*} values an object of values for email, password, and username
 */
export const SignUp = async (values) => {
    const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
    let pfp = await selectRandomFromArray(CatData[1]);
    const usersRef = await setDoc(doc(db, "users", userCred.user.uid), {
        username: values.username,
        email: values.email,
        location: "Vancouver",
        avatar: pfp
    });
    const userUpdate = await updateProfile(userCred.user, {
        displayName: values.username
    });
    for (let i = 0; i < OfferingsData.length; i++) {
        await newUserOfferings(OfferingsData[i])
    }
    for (let i = 0; i < ItemsData.length; i++) {
        await addUserItem(ItemsData[i])
    }
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

export const updateUserData = async (data) => {
    let count = 0;
    let progress = 0;
    await data.forEach((element) => {
        if (element.count != undefined) {
            count += element.count
            progress += 1
        }
    })
    const ref = doc(db, "users", auth.currentUser.uid)
    await updateDoc(ref, {
        catsVisited: count,
        catsCompletion: progress
    });
}

export const fetchCatData = async () => {
    let data = []
    const q = query(collection(db, "cats"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data(), id: document.id })
    });
    return data;
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
        data.push({ ...document.data(), id: document.id })
    });
    return data;
}


export const addUserItem = async (item) => {
    let data;
    const q = query(collection(db, "items"), where("itemID", "==", item.id), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    try {
        querySnapshot.forEach((document) => {
            data = document.id
        });
        const ref = doc(db, "items", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                count: docSnap.data().count
            });
        }
    }
    catch (error) {
        const itemData = {
            uid: auth.currentUser.uid,
            name: item.name,
            count: 1,
            itemID: item.id,
        }
        const docRef = await addDoc(collection(db, "items"), itemData);
    }
}

export const makeTreat = async (food, items) => {
    if (items[food.ing1].count <= 0) {
        return 1
    }
    if (items[food.ing2].count <= 0) {
        return 2
    }
    const OneRef = doc(db, "offerings", (items[food.ing1].itemID));
    const oneSnap = await getDoc(OneRef);
    await updateDoc(OneRef, {
        count: items[food.ing1].count - 1
    });
    const TwoRef = doc(db, "offerings", (items[food.ing2].itemID));
    const secSnap = await getDoc(TwoRef);
    await updateDoc(TwoRef, {
        count: items[food.ing2].count - 1
    });
    try {
        let data;
        const q = query(collection(db, "treats"), where("itemID", "==", food.id), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            data = document.id
        });
        const ref = doc(db, "treats", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const update = updateDoc(ref, {
                count: docSnap.data().count + 1,
            });
        }
    }
    catch (error) {
        const treatData = {
            uid: auth.currentUser.uid,
            count: 1,
            itemID: food.id,
            ing1ID: items[food.ing1].itemID,
            ing2ID: items[food.ing2].itemID
        }
        const docRef = await addDoc(collection(db, "treats"), treatData);
    }
    const ref = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(ref)
    try {
        if (docSnap.exists()) {
            if (docSnap.data().cooked) {
                await updateDoc(ref, {
                    cooked: docSnap.data().cooked + 1
                });
            }
            else {
                await updateDoc(ref, {
                    cooked: 1
                });
            }
        }
    }
    catch (error) {
        await updateDoc(ref, {
            cooked: 1
        });
    }
    return true
}

export const fetchUserTreats = async () => {
    let data = []
    const q = query(collection(db, "treats"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data(), id: document.id })
    });
    return data;
}

export const adjustUserTreat = async (treat) => {
    try {
        const docRef = doc(db, "treats", treat.itemID);
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
            count: treat.count - 1,
        });
    } catch (error) {
        console.log(error)
    }
}

export const addUserOfferings = async (offering) => {
    let data;
    try {
        const q = query(collection(db, "offerings"), where("itemID", "==", offering.id), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            data = document.id
        });
        const ref = doc(db, "offerings", data);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            if (offering.cat) {
                const update = await updateDoc(ref, {
                    count: docSnap.data().count + 1,
                    cat: offering.cat,
                    catImg: offering.catImg,
                    state: false,
                });
            } else {
                const update = await updateDoc(ref, {
                    count: docSnap.data().count + 1,
                    state: false,
                });
            }
        }
    }
    catch (error) {
        const offeringData = {
            uid: auth.currentUser.uid,
            count: 1,
            itemID: offering.id,
            state: false,
        }
        const docRef = await addDoc(collection(db, "offerings"), offeringData);
    }
}

export const newUserOfferings = async (offering) => {
    const offeringData = {
        uid: auth.currentUser.uid,
        count: 6,
        itemID: offering.id,
        state: false,
    }
    const docRef = await addDoc(collection(db, "offerings"), offeringData);
}
export const fetchUserOfferings = async () => {
    let data = []
    const q = query(collection(db, "offerings"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
        data.push({ ...document.data(), id: document.id })
    });
    return data;
}

export const changeUserOfferingState = async (offering) => {
    const docRef = doc(db, "offerings", offering.itemID);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
        state: true,
    });
}

export const fetchLeaderboard = async () => {
    const userCollection = await query(collection(db, "users"), orderBy('catsVisited', "desc"));
    const querySnapshot = await getDocs(userCollection);
    let data = [];
    querySnapshot.forEach((document) => {
        data.push({ ...document.data(), id: document.id })
    })
    return data;
}
