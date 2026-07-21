import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase/config';

export default function PerfilScreen() {

  const [usuario, setusuario] = useState({})

  useEffect(() => {
    leerUsuario("msRX9F33gcgVjXjxuSEKdRq53nl2")
  }, [])
  

  function leerUsuario(uid: string){
      const starCountRef = ref(db, 'usuarios/' + uid);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setusuario(data)
  });
    }
  
    return (
      <View>
        <Text>LeerScreen</Text>
        <Text style={styles.text}>{usuario.nick}</Text>
        <Text style={styles.text}>{usuario.correo}</Text>
        <Text style={styles.text}>{usuario.edad}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  text:{
    fontSize: 25
  }
})



