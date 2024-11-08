import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Search from '../assets/icons/Search.png';
import api from '../utils/axiosConfig';
import Loader from '../components/Loader';
const Watch = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovieList = () => {
    setLoading(true);
    api
      .get('/movie/upcoming')
      .then(response => {
        setMovies(response.data?.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.headerView}>
        <Text style={styles.heading}>Watch</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Image source={Search} />
        </TouchableOpacity>
      </View>
      <View style={styles.moviesSection}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetails', item.id)}
              style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Loader loading={loading} />
    </View>
  );
};

export default Watch;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: hp(4),
    backgroundColor: '#FFFFFF',
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(2),
    marginHorizontal: wp(4),
  },
  heading: {
    color: '#202C43',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(1.8),
  },
  moviesSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#EFEFEF',
    backgroundColor: '#F6F6FA',
    paddingTop: hp(1.2),
  },
  movieContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: hp(2.3),
    marginHorizontal: wp(4),
    backgroundColor: '#F6F6FA',
  },
  poster: {
    width: hp(42),
    height: hp(20),
    borderRadius: hp(1.2),
  },
  title: {
    position: 'absolute',
    bottom: hp(1.3),
    left: wp(4.5),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
});
