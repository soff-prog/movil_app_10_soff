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

    if(correo=="" || contrasenia=="" || nick=="" || edad==0){
      Alert.alert(
        "Campos vacíos",
        "Completa toda la información."
      )
      return
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {

      const user = userCredential.user;

      guardarUsuario(user.uid)

      Alert.alert(
        "Registro exitoso",
        "La cuenta fue creada correctamente."
      )

      navigation.navigate("Login")

    })
    .catch((error) => {

      const errorCode = error.code;

      if(errorCode=="auth/email-already-in-use"){
        Alert.alert(
          "Correo existente",
          "Ese correo ya se encuentra registrado."
        )
      }else if(errorCode=="auth/invalid-email"){
        Alert.alert(
          "Correo inválido",
          "Verifica el correo ingresado."
        )
      }else if(errorCode=="auth/weak-password"){
        Alert.alert(
          "Contraseña débil",
          "Debe contener al menos 6 caracteres."
        )
      }else{
        Alert.alert(
          "Error",
          "No fue posible registrar el usuario."
        )
      }

    });
  }

  function guardarUsuario(uid: string){

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
        secureTextEntry={true}
        onChangeText={setcontrasenia}
      />

      <Button
        title='Login'
        color={"purple"}
        onPress={registro}
      />

    </View>
  )
}

const styles = StyleSheet.create({})