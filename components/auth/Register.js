import React from 'react'
import { View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

function Register({app}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const auth = getAuth(app)
    const db = getFirestore(app);

const onSignUp = async (e) => {
    e.preventDefault();
    console.log([email, password, username]);
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
        console.log(result);
        try {
            setDoc(doc(db, "users", auth.currentUser.uid), {
              username: username,
              email: email,
            });
            console.log("Document written");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    })
    .catch((error) => {
        console.log(error);
    })
}

  return (
    <View>
        <TextInput 
            placeholder='name'
            onChangeText={(name) => setUsername(name)}
        />
         <TextInput 
            placeholder='email'
            onChangeText={(email) => setEmail(email)}
        />
         <TextInput 
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
        />

        <Button 
        onPress={onSignUp}
        title="Sign up"
        />
    </View>
  )
}

export default Register