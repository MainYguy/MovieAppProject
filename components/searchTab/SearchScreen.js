import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from "axios";
import { TMDB_API_KEY } from "@env";
import MovieCard from "../MovieCard";
import NoMovieToDisplay from "../favoritesTab/NoMovieToDisplay";

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
    marginTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
});

function SearchScreen() {
  const flatListRef = useRef();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [researching, setResearching] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Ceci est également à retirer pour simplifier niveau syntaxe, mais au moins c'est un peu clair ainsi :
  function handleChangeText(text) {
    setSearchText(text);
  }

  async function searchMovieByTitle(firstCall) {
    Keyboard.dismiss();
    const apiKey = TMDB_API_KEY;
    if (researching) return;
    if (lastPage >= totalPages) return;

    try {
      setResearching(true);
      const pageToCall = firstCall ? 1 : lastPage + 1;
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}&page=${pageToCall}`);
      console.log("current page: ", response.data.page);

      if (firstCall) {
        console.log("this is the first call");
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        setMovies(response.data.results);
      } else {
        console.log("this is another call");
        setMovies([...movies, ...response.data.results]);
      }
      setLastPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.log(err);
    } finally {
      setResearching(false);
    }
  }

  function releaseSearchButton() {
    if (searchText.trim() === "") return true;
    if (researching) return true;

    return false;
  }

  const renderItem = ({ item }) => (
    <MovieCard movie={item} />
  );

  // appeler les résultats de la page suivante
  // ajouter les nouveaux films à movies

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChangeText(text)}
        value={searchText}
        placeholder="Type the title of a movie you're looking for"
        // On peut simplifier la syntaxe comme ça, et c'est permis,
        // car on évite les redondances et le côté verbeux
        // onChangeText={handleChangeText}

        // Pareil ici :
        // onChangeText={(text) => setSearchText(text)}

        // Ou ici :
        // onChangeText={setSearchText}
      />
      <Button
        title="Search"
        onPress={() => searchMovieByTitle(true)}
        disabled={releaseSearchButton()}
        // le mieux c'est d'écrire comme ci :
        // onPress={searchMovieByTitle}
        // Mais JAMAIS comme ça :
        // onPress={searchMovieByTitle()}
      />
      <View style={styles.moviesContainer}>
        <FlatList
          ref={flatListRef}
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={NoMovieToDisplay}
          onEndReachedThreshold={0.8}
          onEndReached={() => searchMovieByTitle(false)}
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
