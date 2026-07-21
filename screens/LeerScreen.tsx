import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { onValue, ref } from 'firebase/database';

export default function LeerScreen() {

  const [usuario, setusuario] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
        leerUsuario(uid)
    // ...
      } else {
    // User is signed out
    // ...
      }
  });
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