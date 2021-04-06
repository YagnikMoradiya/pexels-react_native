import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

const Body = ({data, navigation}) => {
  return data.length != 0 ? (
    <ScrollView>
      <View style={styles.container}>
        {data.map((i) => (
          <TouchableOpacity
            key={i.id}
            style={styles.image__container}
            onPress={() => {
              navigation.navigate('Image', {data: i});
            }}>
            <Image source={{uri: i.src.medium}} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.noData__container}>
      <Text style={styles.noData__text}>No Data Found.</Text>
    </View>
  );
};
export default Body;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image__container: {
    margin: 2,
    height: 175,
    width: Dimensions.get('window').width / 2 - 4,
  },
  photo: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  noData__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData__text: {
    color: '#e2e2e2',
    fontSize: 18,
  },
});
