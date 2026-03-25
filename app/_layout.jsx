import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'


const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="home" options={{ title:'Home' }} />
      <Stack.Screen name="meal-plan" options={{ title:'Meal Plan' }} />
      <Stack.Screen name="food-checker" options={{ title:'Food Checker' }} />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})