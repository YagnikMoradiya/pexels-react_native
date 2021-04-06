import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const Header = ({query, getQuery, submit}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../logo.png')} style={styles.logo} />
      <TextInput
        style={styles.searchbar}
        placeholder="Search photo"
        value={query}
        onChangeText={(text) => getQuery(text)}
        onSubmitEditing={submit}
      />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  logo: {
    width: 40,
    height: 40,
    marginHorizontal: 25,
  },
  searchbar: {
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#dcdde1',
    flexGrow: 1,
    marginEnd: 25,
    fontSize: 16,
    paddingStart: 5,
  },
});
