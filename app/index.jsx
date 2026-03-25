import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Healthy Nutrition App</Text>
      <Text style={styles.subtitle}>Eat smart. Stay healthy. Live better.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#4CAF50', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#e0f2f1',
  },
});