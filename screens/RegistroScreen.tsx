import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { estiloGlobal } from '../styles/EstilosGlobal'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { ref, set } from 'firebase/database'

export default function RegistroScreen({navigation}: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [edad, setedad] = useState(0)
  const [nick, setnick] = useState("")

  function registro(){
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    guardarUsuario(user.uid)

    navigation.navigate("Login")

    //console.log(user.uid);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert(errorCode, errorMessage)
    // ..
  });
  }
  
  function guardarUsuario( uid: string ){
    set(ref(db, 'usuarios/' + uid), {
      correo: correo,
      edad: edad,
      nick: nick
    });
  }
  
     return (
      <View>
        <Text>LoginScreen</Text>
        <TextInput
          placeholder='Ingresar correo'
          style={estiloGlobal.input}
          onChangeText={setcorreo}
        />
        <TextInput
          placeholder='Ingresar edad'
          style={estiloGlobal.input}
          onChangeText={(texto)=>setedad(+texto)}
        />
        <TextInput
          placeholder='Ingresar nick'
          style={estiloGlobal.input}
          onChangeText={setnick}
        />
        <TextInput
          placeholder='Ingresar contrasenia'
          style={estiloGlobal.input}
          onChangeText={setcontrasenia}
        />

        <Button title='Login'color={"purple"} onPress={registro}></Button>
      </View>
    )
  }

  const styles = StyleSheet.create({})