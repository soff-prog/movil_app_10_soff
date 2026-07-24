import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { estiloGlobal } from '../styles/EstilosGlobal'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function LoginScreen({navigation}: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  function login(){

    if(correo=="" || contrasenia==""){
      Alert.alert(
        "Campos vacíos",
        "Completa todos los campos."
      )
      return
    }

    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {

      const user = userCredential.user;
      console.log(user)

      Alert.alert(
        "Bienvenido",
        "Inicio de sesión exitoso."
      )

      navigation.navigate("Tabs")

    })
    .catch((error) => {

      const errorCode = error.code;

      if(errorCode == "auth/invalid-email"){
        Alert.alert(
          "Correo inválido",
          "Verifica el correo ingresado."
        )
      }else if(errorCode == "auth/missing-password"){
        Alert.alert(
          "Contraseña",
          "Ingresa la contraseña."
        )
      }else if(errorCode == "auth/invalid-credential"){
        Alert.alert(
          "Credenciales incorrectas",
          "Correo o contraseña incorrectos."
        )
      }else{
        Alert.alert(
          "Error",
          "No fue posible iniciar sesión."
        )
      }

    });
  }

  function restablecerContrasenia(){

    if(correo==""){
      Alert.alert(
        "Correo requerido",
        "Ingresa tu correo para restablecer la contraseña."
      )
      return
    }

    sendPasswordResetEmail(auth, correo)
      .then(() => {

        Alert.alert(
          "Correo enviado",
          "Revisa tu bandeja de entrada."
        )

    })
    .catch((error) => {

      const errorCode = error.code;

      if(errorCode=="auth/invalid-email"){
        Alert.alert(
          "Correo inválido",
          "Verifica el correo ingresado."
        )
      }else{
        Alert.alert(
          "Error",
          "No fue posible enviar el correo."
        )
      }

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
        secureTextEntry={true}
        onChangeText={setcontrasenia}
      />

      <Button
        title='Login'
        onPress={login}
      />

      <Text
        onPress={()=>navigation.navigate("Registro")}
        style={{fontSize:20}}
      >
        Registrate aqui
      </Text>

      <Button
        title='olvidaste la contraseña?'
        onPress={restablecerContrasenia}
      />

    </View>
  )
}

const styles = StyleSheet.create({})