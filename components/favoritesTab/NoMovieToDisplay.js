import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

function NoMovieToDisplay() {
  return (
    <View>
      <Text>You have not selected a favorite movie yet !</Text>
    </View>
  );
}

export default NoMovieToDisplay;
