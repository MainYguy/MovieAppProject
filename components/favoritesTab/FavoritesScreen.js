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

function FavoritesScreen() {
  return (
    <SafeAreaView>
        <Text style={styles.highlight}>Ecran 2</Text>
    </SafeAreaView>
  );
}

export default FavoritesScreen;