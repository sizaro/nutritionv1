import { useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function FoodCheckerScreen() {
  const [food, setFood] = useState('');
  const [condition, setCondition] = useState('None'); // Default
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const conditions = ['None', 'Ulcers', 'Diabetes', 'Hypertension'];

  const checkFood = () => {
    // TEMP simple logic
    if (condition === 'Ulcers' && food.toLowerCase().includes('spicy')) {
      setResult('❌ Not recommended for ulcers');
    } else if (condition === 'Diabetes' && food.toLowerCase().includes('sugar')) {
      setResult('❌ Not recommended for diabetes');
    } else {
      setResult('✔ Recommended');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Food Checker</Text>

      <Text style={styles.label}>Food:</Text>
      <TextInput
        style={styles.input}
        value={food}
        onChangeText={setFood}
        placeholder="Enter food name"
      />

      <Text style={styles.label}>Health Condition:</Text>
      <Pressable
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>{condition}</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {conditions.map((c) => (
              <Pressable
                key={c}
                style={styles.modalItem}
                onPress={() => {
                  setCondition(c);
                  setModalVisible(false);
                }}
              >
                <Text>{c}</Text>
              </Pressable>
            ))}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Check Food" onPress={checkFood} />

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, alignSelf: 'flex-start', marginTop: 10 },
  input: { borderWidth: 1, width: '100%', padding: 8, marginTop: 5, borderRadius: 5 },
  pickerButton: {
    borderWidth: 1,
    width: '100%',
    padding: 12,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  result: { marginTop: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});