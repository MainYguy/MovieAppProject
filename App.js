import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import axios from "axios";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TMDB_API_KEY, TMDB_USERNAME, TMDB_PASSWORD } from "@env";
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

function App() {
  const apiKey = TMDB_API_KEY;
  const [sessionId, setSessionId] = useState("");
  const [errorConnectStatus, setErrorConnectStatus] = useState(false);

  async function createRequestToken() {
    const res = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
    const requestToken = res.data.request_token;
    return requestToken;
  }

  async function validateRequestToken(requestToken) {
    await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, {
      username: TMDB_USERNAME,
      password: TMDB_PASSWORD,
      request_token: requestToken,
    });
  }

  async function createSessionId(requestToken) {
    const response = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      request_token: requestToken,
    });
    setSessionId(response.data.session_id);
  }

  async function logUser() {
    try {
      const requestToken = await createRequestToken();
      await validateRequestToken(requestToken);
      createSessionId(requestToken);
    } catch {
      setErrorConnectStatus(true);
    }
  }

  useEffect(() => {
    logUser();
  }, []);

  if (errorConnectStatus) {
    return (
      <SafeAreaView>
        <Text>Login has failed !</Text>
      </SafeAreaView>
    );
  }

  if (!sessionId) {
    return (
      <SafeAreaView>
        <Text>Logging in! Please wait...</Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "darkgrey",
        }}
      >
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              // ceci fut un "early return", présenté dans un oneliner
              if (focused) return <SearchImage width={32} height={32} />;

              return <SearchInactiveImage width={32} height={32} />;
            },
          }}
        />
        <Tab.Screen
          name="Favorites"
          // component={FavoritesScreen}
          children={() => <FavoritesScreen sessionId={sessionId} />}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) return <FavoritesImage width={32} height={32} />;

              return <FavoritesInactiveImage width={32} height={32} />;
            },
          }}
        />
        <Tab.Screen
          name="Latest Movies"
          component={LatestMoviesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) return <LatestMoviesImage width={32} height={32} />;

              return <LatestMoviesInactiveImage width={32} height={32} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
