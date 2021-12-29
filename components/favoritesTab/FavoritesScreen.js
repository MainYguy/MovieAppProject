import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from "axios";
import { TMDB_API_KEY, TMDB_USERNAME, TMDB_PASSWORD } from "@env";
import MovieCard from "../MovieCard";
import NoMovieToDisplay from "./NoMovieToDisplay";

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  moviesContainer: {
    width: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});

function FavoritesScreen({ sessionId }) {
  const [movies, setMovies] = useState([]);

  async function getFavoriteMovies() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${TMDB_API_KEY}&session_id=${sessionId}&page=1`);
      setMovies(response.data.results);
    } catch (err) {
      console.log("la recherche de favoris a échoué car : ", err);
    }
  }

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  const renderItem = ({ item }) => (
    <MovieCard movie={item} />
  );

  return (
    <SafeAreaView>
      <View style={styles.moviesContainer}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={NoMovieToDisplay}
        />
      </View>
    </SafeAreaView>
  );
}

export default FavoritesScreen;
