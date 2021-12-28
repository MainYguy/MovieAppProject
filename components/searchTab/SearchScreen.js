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

function SearchScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.highlight}>Ecran 1</Text>
    </SafeAreaView>
  );
}

export default SearchScreen;