import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { estiloGlobal } from '../styles/EstilosGlobal'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function LoginScreen({navigation}: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  function login(){
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigation.navigate("Tabs")
     // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      Alert.alert(errorCode, errorMessage)

      if(errorCode == "auth/invalid-email"){
        Alert.alert("Correo invalido", "Verificar el campo de correo")
      }else if(errorCode == "auth/missing-password")
        Alert.alert("Contrasela incorrecta", "Verificar el campo de contraseña")
      else{
        Alert.alert("Error","Verifica credenciales")
      }

    });
  }

  function restablecerContrasenia(){
    sendPasswordResetEmail(auth, correo)
      .then(() => {
        // Password reset email sent!
        Alert.alert("Mensaje", "Se envio un mensaje a tu correo")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return (
    <View>
      <Text>LoginScreen</Text>
      <TextInput
        placeholder='Ingresar Correo'
        style={estiloGlobal.input}
        onChangeText={setcorreo}
      />
      <TextInput
        placeholder='Ingresar Contrasenia'
        style={estiloGlobal.input}
        onChangeText={setcontrasenia}
      />

      <Button 
        title='Login' 
        onPress={login}
      ></Button>
      <Text 
        onPress={()=>navigation.navigate("Registro")}
        style={{fontSize:20}}
      >Registrate aqui</Text>

      <Button title='olvidaste la contraseña?' onPress={restablecerContrasenia}/>
    </View>
  )
}

const styles = StyleSheet.create({})