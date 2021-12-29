import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FavoritesEmptyHeartImage from "../images/heartEmpty.svg";

const styles = StyleSheet.create({
  movieCard: {
    minWidth: "100%",
    maxWidth: "100%",
    marginBottom: 16,
    flexDirection: "row",
  },
  imageContainer: {
    width: 120,
    height: 190,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  textSection: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  frontBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 48,
  },
  favoriteButton: {
    marginHorizontal: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 4,
    textAlign: "center",
    flex: 1,
    color: "black",
  },
  notation: {
    fontWeight: "bold",
    fontSize: 24,
    marginHorizontal: 4,
  },
  overview: {
    color: "black",
  },
  bottomBar: {
    flexDirection: "row-reverse",
  },
});

function MovieCard({ movie }) {
  return (
    <View style={styles.movieCard}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
        />
      </View>
      <View style={styles.textSection}>
        <View>
          <View style={styles.frontBar}>
            <FavoritesEmptyHeartImage style={styles.favoriteButton} width={20} height={20} />
            <Text
              style={styles.title}
              numberOfLines={2}
              elipsizeMode="tail"
            >
              {movie.title}
            </Text>
            <Text style={styles.notation}>{movie.vote_average}</Text>
          </View>
          <View>
            <Text
              numberOfLines={6}
              elipsizeMode="tail"
              style={styles.overview}
            >
              {movie.overview}
            </Text>
          </View>
        </View>
        <View style={styles.bottomBar}>
          <Text>
            Released on
            {movie.release_date}
          </Text>
        </View>
      </View>

    </View>
  );
}

export default MovieCard;
