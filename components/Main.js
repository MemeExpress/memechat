import React from "react";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { updateUser } from "../redux/reducers/userReducer";


function Main({ app }) {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.value);

  const [user, setUser] = useState ({username: '', email: ''});


  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({username: docSnap.data().username, email: docSnap.data().email});
      } else {
        console.log("couldn't find that user");
      }
      dispatch(updateUser({username: docSnap.data().username, email: docSnap.data().email}));
    };
    getUser();
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>{user.username} is logged in</Text>
      <Text>{currentUser.username} is logged in</Text>
    </View>
  );
}

export default Main;
