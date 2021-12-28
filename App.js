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
import SearchInactiveImage from "./images/searchInactive.svg";
import FavoritesImage from "./images/heart.svg";
import FavoritesInactiveImage from "./images/heartInactive.svg";
import LatestMoviesImage from "./images/clock.svg";
import LatestMoviesInactiveImage from "./images/clockInactive.svg";


const Tab = createBottomTabNavigator();





const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "darkgrey",
        }}>
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              // ceci fut un "early return", présenté dans un oneliner
              if (focused) return <SearchImage width={32} height={32}/>;

              return <SearchInactiveImage width={32} height={32}/>;
            }
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) return <FavoritesImage width={32} height={32}/>;

              return <FavoritesInactiveImage width={32} height={32}/>;
            }
          }}
        />
        <Tab.Screen
          name="Latest Movies"
          component={LatestMoviesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) return <LatestMoviesImage width={32} height={32}/>;

              return <LatestMoviesInactiveImage width={32} height={32}/>;
            }
          }}
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
