import React, { useEffect, useState } from "react"; 
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native"; 
 
export default function TasksScreen() { 

    const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
 
  const fetchTasks = async () => { 
    try { 
      const response = await fetch("https://jsonplaceholder.typicode.com/todos"); 
      if (!response.ok) { 
        throw new Error("Erreur réseau"); 
      } 
      const json = await response.json(); 
      setData(json); 
    } catch (e) { 
      setError("Impossible de charger les tâches"); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  useEffect(() => { 
    fetchTasks(); 
  }, []); 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.title}>Liste des tâches</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />} 
      
      {error && <Text style={styles.errorText}>{error}</Text>} 
 
      {!loading && !error && (
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => ( 
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={item.completed ? styles.completed : styles.pending}>
                {item.completed ? "Terminée" : "Non terminée"}
              </Text>
            </View>
          )} 
        /> 
      )}
    </View> 
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskTitle: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  completed: {
    color: "green",
    fontSize: 12,
    marginTop: 4,
  },
  pending: {
    color: "orange",
    fontSize: 12,
    marginTop: 4,
  },
});