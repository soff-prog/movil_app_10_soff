import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { estiloGlobal } from '../styles/EstilosGlobal'
import { db } from '../firebase/config'
import { onValue, push, ref, set } from 'firebase/database'

export default function GuardarScreen() {

  const [nombre, setnombre] = useState("")
  const [director, setdirector] = useState("")
  const [genero, setgenero] = useState("")
  const [anio, setanio] = useState(0)

  const [peliculas, setpeliculas] = useState<any[]>([])

  useEffect(() => {
    leerPeliculas()
  }, [])

  function guardarPelicula(){

    if(nombre=="" || director=="" || genero=="" || anio==0){

      Alert.alert(
        "Campos vacíos",
        "Completa toda la información."
      )

      return

    }

    const nuevaPelicula = push(ref(db,'peliculas'))

    set(nuevaPelicula,{
      nombre:nombre,
      director:director,
      genero:genero,
      anio:anio
    })

    .then(()=>{

      Alert.alert(
        "Mensaje",
        "Película guardada correctamente."
      )

      setnombre("")
      setdirector("")
      setgenero("")
      setanio(0)

    })

    .catch((error)=>{

      Alert.alert(
        "Error",
        error.message
      )

    })

  }

  function leerPeliculas(){

    const starCountRef = ref(db,'peliculas')

    onValue(starCountRef,(snapshot)=>{

      const data = snapshot.val()

      if(data){

        const arreglo:any=[]

        Object.keys(data).forEach((key)=>{

          arreglo.push({
            id:key,
            ...data[key]
          })

        })

        setpeliculas(arreglo)

      }else{

        setpeliculas([])

      }

    })

  }

  return (

    <View>

      <Text>GuardarScreen</Text>

      <TextInput
        placeholder='Nombre de la película'
        style={estiloGlobal.input}
        value={nombre}
        onChangeText={setnombre}
      />

      <TextInput
        placeholder='Director'
        style={estiloGlobal.input}
        value={director}
        onChangeText={setdirector}
      />

      <TextInput
        placeholder='Género'
        style={estiloGlobal.input}
        value={genero}
        onChangeText={setgenero}
      />

      <TextInput
        placeholder='Año'
        style={estiloGlobal.input}
        value={anio==0 ? "" : anio.toString()}
        keyboardType='numeric'
        onChangeText={(texto)=>setanio(+texto)}
      />

      <Button
        title='Guardar Película'
        onPress={guardarPelicula}
      />

      <Text
        style={{
          fontSize:22,
          fontWeight:"bold",
          marginTop:20
        }}
      >
        Películas Registradas
      </Text>

      <FlatList
        data={peliculas}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>

          <View
            style={{
              borderWidth:1,
              padding:10,
              marginTop:10
            }}
          >

            <Text>Nombre: {item.nombre}</Text>
            <Text>Director: {item.director}</Text>

            <Text>Género: {item.genero}</Text>

            <Text>Año: {item.anio}</Text>

          </View>

        }
      />

    </View>

  )
}

const styles = StyleSheet.create({})