import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from "axios";
import MovieCard from "../MovieCard";
import { TMDB_API_KEY } from "@env";

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  moviesContainer: {
    width: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});


function SearchScreen() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Ceci est également à retirer pour simplifier niveau syntaxe, mais au moins c'est un peu clair ainsi :
  function handleChangeText(text) {
    setSearchText(text);
  }

  function searchMovieByTitle() {
    const apiKey = TMDB_API_KEY;

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=Jack+Reacher`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(err => {
        console.log({ err });
      })
  }


  function displayNoResult() {
    if (movies.length > 0) return null;

    return <Text>Aucun résultat</Text>;
  }

  function displayMovies() {
    if (movies.length === 0) return null;

    // Ici, utilisation de .map qui retourne quelquechose, comme .forEach (qui lui ne retourne rien)
    // return movies.map((movie) => displayMovieCard(movie));
    return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
  }


  return (
    <SafeAreaView>
      <Text style={styles.highlight}>Ecran 1</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChangeText(text)}
          // On peut simplifier la syntaxe comme ça, et c'est permis, car on évite les redondances et le côté verbeux
          // onChangeText={handleChangeText}

          // Pareil ici :
          // onChangeText={(text) => setSearchText(text)}

          // Ou ici :
          // onChangeText={setSearchText}
          value={searchText}
          placeholder="Type the title of a movie you're looking for"
        />
        <Button
          title="Search"
          onPress={() => searchMovieByTitle()}
          // le mieux c'est d'écrire comme ci :
          // onPress={searchMovieByTitle}
          // Mais JAMAIS comme ça :
          // onPress={searchMovieByTitle()}
        />
        <View style={styles.moviesContainer}>
          {displayNoResult()}
          {displayMovies()}
        </View>
      </SafeAreaView>
  );
}

export default SearchScreen;
