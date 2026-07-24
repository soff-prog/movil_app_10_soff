import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref, update } from 'firebase/database';
import { db, auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { estiloGlobal } from '../styles/EstilosGlobal';

export default function PerfilScreen({navigation}: any) {

  const [usuario, setusuario] = useState({})
  const [correo, setcorreo] = useState("")
  const [edad, setedad] = useState(0)
  const [nick, setnick] = useState("")

  useEffect(() => {
    leerUsuario("msRX9F33gcgVjXjxuSEKdRq53nl2")
  }, [])

  function leerUsuario(uid: string){
      const starCountRef = ref(db, 'usuarios/' + uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        setusuario(data)

        setcorreo(data.correo)
        setedad(data.edad)
        setnick(data.nick)

  });
    }

    function actualizarUsuario(){

      update(ref(db,'usuarios/' + "msRX9F33gcgVjXjxuSEKdRq53nl2"),{
        correo: correo,
        edad: edad,
        nick: nick
      })

      .then(()=>{
        Alert.alert(
          "Mensaje",
          "Datos actualizados correctamente."
        )
      })

      .catch((error)=>{
        Alert.alert(
          "Error",
          error.message
        )
      })

    }

    function cerrarSesion(){

      signOut(auth)

      .then(()=>{

        Alert.alert(
          "Mensaje",
          "Sesión cerrada correctamente."
        )

        navigation.navigate("Login")

      })

      .catch((error)=>{

        Alert.alert(
          "Error",
          error.message
        )

      })

    }

    return (
      <View>

        <Text>PerfilScreen</Text>

        <TextInput
          style={estiloGlobal.input}
          value={nick}
          onChangeText={setnick}
          placeholder='Nick'
        />

        <TextInput
          style={estiloGlobal.input}
          value={correo}
          editable={false}
          placeholder='Correo'
        />

        <TextInput
          style={estiloGlobal.input}
          value={edad.toString()}
          onChangeText={(texto)=>setedad(+texto)}
          placeholder='Edad'
        />

        <Button
          title='Actualizar Datos'
          onPress={actualizarUsuario}
        />

        <Button
          title='Cerrar Sesión'
          color={"red"}
          onPress={cerrarSesion}
        />

      </View>
    )
}

const styles = StyleSheet.create({
  text:{
    fontSize:25
  }

})