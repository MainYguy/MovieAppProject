import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

function LatestMoviesScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.highlight}>Ecran 3</Text>
    </SafeAreaView>
  );
}

export default LatestMoviesScreen;
