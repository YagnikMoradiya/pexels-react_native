import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

const Loading = (props) => (
  <ActivityIndicator style={styles.container} size="large" color="#e2e2e2" />
);
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});
