import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import TasksScreen from './TasksScreen';
import Crud from './Crud';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.section}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerText}>EXERCICE DE SYNTHÈSE</Text>
        </View>
        <View style={styles.componentContainer}>
          <TasksScreen />
        </View>
      </View>


      <View style={styles.section}>
        <View style={[styles.headerBadge, { backgroundColor: '#007AFF' }]}>
          <Text style={styles.headerText}>AXIOS : CRUD</Text>
        </View>
        <View style={styles.componentContainer}>
          <Crud />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F0F2F5', // Gris très clair pour le fond
  },
  section: {
    flex: 1, // Donne 50% de l'écran à chaque section
  },
  componentContainer: {
    flex: 1, 
    paddingHorizontal: 10,
  },
  headerBadge: {
    backgroundColor: '#FF3B30', // Rouge pour le premier titre
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 20,
    elevation: 3, // Ombre Android
    shadowColor: '#000', // Ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 1,
  },
});