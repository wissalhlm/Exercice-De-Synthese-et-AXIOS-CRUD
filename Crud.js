import React, { useState, useEffect } from "react"; 
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"; 
import axios from "axios"; 

export default function Crud() { 
  const [users, setUsers] = useState([]); 
  const URL = "https://jsonplaceholder.typicode.com/users"; 

  const getUsers = () => { 
    // AVANTAGE AXIOS : Pas besoin de premier .then(res => res.json())
    // Axios transforme automatiquement la réponse JSON en objet JavaScript.
    axios.get(URL) 
      .then(res => {
        // Les données se trouvent directement dans res.data
        setUsers(res.data);
      }) 
      .catch(err => {
        // AVANTAGE AXIOS : Il entre ici automatiquement si le serveur répond 404 ou 500.
        // Avec fetch, il faudrait vérifier manuellement si 'response.ok' est true.
        console.log("Erreur de récupération :", err);
      }); 
  }; 

  const addUser = () => { 
    const newUser = { name: "User1", email: "user1@mail.com" }; 
    
    // AVANTAGE AXIOS : On envoie l'objet 'newUser' directement.
    // Avec fetch, il faudrait faire JSON.stringify(newUser) et configurer les headers.
    axios.post(URL, newUser) 
      .then(res => console.log("Utilisateur ajouté avec succès :", res.data)) 
      .catch(err => console.log("Erreur lors de l'ajout :", err)); 
  }; 

  const updateUser = () => { 
    const updatedUser = { name: "User Modifié" }; 
    
    // Mise à jour de l'utilisateur ayant l'ID 1
    axios.put(`${URL}/1`, updatedUser) 
      .then(res => console.log("Utilisateur modifié :", res.data)) 
      .catch(err => console.log("Erreur de modification :", err)); 
  }; 

  const deleteUser = () => { 
    // Suppression de l'utilisateur ayant l'ID 1
    axios.delete(`${URL}/1`) 
      .then(res => console.log("Utilisateur supprimé avec succès")) 
      .catch(err => console.log("Erreur de suppression :", err)); 
  }; 

  // Charge les données au montage du composant
  useEffect(() => { 
    getUsers(); 
  }, []); 

  return ( 
    <ScrollView style={styles.container}> 
      <Text style={styles.title}>Liste des utilisateurs :</Text> 
      
      {users.map(user => ( 
        <Text key={user.id} style={styles.userItem}>• {user.name}</Text> 
      ))} 
 
      <View style={styles.buttonContainer}>
        <Button title="Rafraîchir (GET)" onPress={getUsers} color="blue" /> 
        <Button title="Ajouter (POST)" onPress={addUser} color="green" /> 
        <Button title="Modifier ID 1 (PUT)" onPress={updateUser} color="orange" /> 
        <Button title="Supprimer ID 1 (DELETE)" onPress={deleteUser} color="red" /> 
      </View>
    </ScrollView> 
  ); 
} 

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  userItem: { fontSize: 16, marginBottom: 5 },
  buttonContainer: { marginTop: 20, gap: 10 }
});