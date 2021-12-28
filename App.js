/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import { 
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from "./components/searchTab/SearchScreen";
import FavoritesScreen from "./components/favoritesTab/FavoritesScreen";
import LatestMoviesScreen from "./components/latestMoviesTab/LatestMoviesScreen";
import SearchImage from "./images/search.svg";


const Tab = createBottomTabNavigator();





const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Recherche"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return <SearchImage />
            }
          }}
        />
        <Tab.Screen
          name="Favoris"
          component={FavoritesScreen}
        />
        <Tab.Screen
          name="Les derniers films"
          component={LatestMoviesScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
