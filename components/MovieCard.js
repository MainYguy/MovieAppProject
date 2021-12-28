import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  movieCard: {
    minWidth: "100%",
    maxWidth: "100%",
    marginBottom: 16,
    // paddingHorizontal: 8,
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  imageContainer: {
    width: 100,
    height: 150,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  textSection: {
    paddingLeft: 16,
    flex: 1,
    backgroundColor: "lightyellow",
  },
  frontBar: {
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notation: {
    fontWeight: "bold",
  },
  overviewContainer: {
    backgroundColor: "lightpink",
  },
  bottomBar: {
    flexDirection: "row-reverse",
    backgroundColor: "lightgreen",
  },
});


function MovieCard({ movie }) {

  return (
    <View style={styles.movieCard}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.poster} 
          source={{ uri: 'https://image.tmdb.org/t/p/original' + movie.poster_path }}
        />
      </View>
      <View style={styles.textSection}>
        <View style={styles.frontBar}>
          <Text>like</Text>
          <Text>{movie.title}</Text>
          <Text style={styles.notation}>{movie.vote_average}</Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text
            numberOfLines={6}
            elipsizeMode='tail'
            style={styles.overview}
          >
            {movie.overview}
          </Text>
        </View>
        <View style={styles.bottomBar}>
          <Text>Released on {movie.release_date}</Text>
        </View>
      </View>
      

    </View>
  );
}

export default MovieCard;