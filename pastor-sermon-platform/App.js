import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './components/HomeScreen';
import BibleStudyScreen from './components/BibleStudyScreen';
import SermonAIScreen from './components/SermonAIScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Bible Study') iconName = 'menu-book';
              else if (route.name === 'Sermon AI') iconName = 'psychology';
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4A90E2',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: '#4A90E2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Bible Study" component={BibleStudyScreen} />
          <Tab.Screen name="Sermon AI" component={SermonAIScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
