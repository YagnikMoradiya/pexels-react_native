import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Header from '../component/Header';
import Body from '../component/Body';
import api from '../api/api';
import Loading from '../component/Loading';

const HomeScreen = ({navigation}) => {
  const [img, setImg] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.get('/search', {
        params: {
          query: query || 'india',
          page: 1,
          per_page: 80,
        },
      });
      if (response) {
        setImg(response.data.photos);
      } else {
        Alert(alert('Result not found'));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setQuery('');
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header getQuery={setQuery} query={query} submit={handleSubmit} />
      <Body data={img} navigation={navigation} />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
