import React from 'react'
import { View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({app}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app)

const onSignIn = async (e) => {
    e.preventDefault();
    console.log([email, password]);
    signInWithEmailAndPassword(auth, email, password).then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
}

  return (
    <View>
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
        onPress={onSignIn}
        title="Sign in"
        />
    </View>
  )
}

export default Login