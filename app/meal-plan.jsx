import { useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { generateMealPlan, generateSafeFoods } from './utils/mealEngine';


export default function MealPlanScreen() {

  const [age, setAge] = useState('');

  // selected values
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [result, setResult] = useState('');



  // dropdown options
  const conditionOptions = ['Diabetes', 'Ulcers', 'Hypertension'];
  const allergyOptions = ['Peanut', 'Milk', 'Egg', 'Fish'];



  // ADD condition (no duplicates)
  const addCondition = (item) => {
    if (!selectedConditions.includes(item)) {
      setSelectedConditions([...selectedConditions, item]);
    }
  };



  // REMOVE condition
  const removeCondition = (item) => {
    setSelectedConditions(
      selectedConditions.filter(c => c !== item)
    );
  };



  // ADD allergy
  const addAllergy = (item) => {
    if (!selectedAllergies.includes(item)) {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };



  // REMOVE allergy
  const removeAllergy = (item) => {
    setSelectedAllergies(
      selectedAllergies.filter(a => a !== item)
    );
  };



  const handleGenerate = () => {

    const userProfile = {
      age: Number(age),
      conditions: selectedConditions.map(c => c.toLowerCase()),
      allergies: selectedAllergies.map(a => a.toLowerCase())
    };

    const safeFoods = generateSafeFoods(userProfile);
    const mealPlan = generateMealPlan(safeFoods);



    setResult(`

BREAKFAST:
${mealPlan.breakfast.carbohydrate} + ${mealPlan.breakfast.protein} + ${mealPlan.breakfast.extra}

LUNCH:
${mealPlan.lunch.carbohydrate} + ${mealPlan.lunch.protein} + ${mealPlan.lunch.extra}

DINNER:
${mealPlan.dinner.carbohydrate} + ${mealPlan.dinner.protein} + ${mealPlan.dinner.extra}

SNACK:
${mealPlan.snack.fruit || "No snack"}

    `);

  };



  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Meal Planner</Text>



      {/* AGE */}
      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Enter age"
      />



      {/* CONDITIONS DROPDOWN */}
      <Text style={styles.label}>Add Condition</Text>

      <View style={styles.dropdown}>
        {conditionOptions.map((item) => (
          <Pressable
            key={item}
            onPress={() => addCondition(item)}
            style={styles.dropdownItem}
          >
            <Text>+ {item}</Text>
          </Pressable>
        ))}
      </View>



      {/* CONDITION CHIPS */}
      <View style={styles.chipContainer}>
        {selectedConditions.map((item) => (
          <View key={item} style={styles.chip}>
            <Text>{item}</Text>

            <Pressable onPress={() => removeCondition(item)}>
              <Text style={styles.remove}> ✕ </Text>
            </Pressable>
          </View>
        ))}
      </View>



      {/* ALLERGY DROPDOWN */}
      <Text style={styles.label}>Add Allergy</Text>

      <View style={styles.dropdown}>
        {allergyOptions.map((item) => (
          <Pressable
            key={item}
            onPress={() => addAllergy(item)}
            style={styles.dropdownItem}
          >
            <Text>+ {item}</Text>
          </Pressable>
        ))}
      </View>



      {/* ALLERGY CHIPS */}
      <View style={styles.chipContainer}>
        {selectedAllergies.map((item) => (
          <View key={item} style={styles.chip}>
            <Text>{item}</Text>

            <Pressable onPress={() => removeAllergy(item)}>
              <Text style={styles.remove}> ✕ </Text>
            </Pressable>
          </View>
        ))}
      </View>



      {/* GENERATE */}
      <Button title="Generate Meal Plan" onPress={handleGenerate} />



      {/* RESULT */}
      {result ? (
        <Text style={styles.result}>{result}</Text>
      ) : null}

    </ScrollView>
  );
}



const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },

  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600'
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 5
  },



  dropdown: {
    marginTop: 8,
    marginBottom: 5
  },

  dropdownItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 3,
    borderRadius: 6
  },



  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d0e8ff',
    padding: 8,
    borderRadius: 20,
    margin: 4
  },

  remove: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold'
  },



  result: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22
  }

});