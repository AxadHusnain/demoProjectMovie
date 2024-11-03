import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Search from '../assets/icons/Search.png';
import Close from '../assets/icons/Close.png';
import api from '../utils/axiosConfig';

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const getMovieList = () => {
    api
      .get('/movie/upcoming')
      .then(response => {
        console.log('response of getting movies from imdb', response);
        setMovies(response.data?.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  };
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.firstHalfSearch}>
          <Image style={styles.searchIcon} source={Search} />
          <TextInput
            style={styles.inputField}
            placeholderTextColor="#202C434D"
            placeholder="TV shows, movies and more"></TextInput>
        </View>
        <Image style={styles.closeIcon} source={Close} />
      </View>
      <View style={styles.moviesSection}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: '#F6F6FA',
  },
  searchBarContainer: {
    marginHorizontal: wp(4),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    height: hp(5.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(3),
    borderRadius: wp(7),
    backgroundColor: '#F2F2F6',
  },
  firstHalfSearch: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    flex: 1,
  },
  searchIcon: {
    marginLeft: wp(5),
  },
  inputField: {
    marginLeft: wp(2),
    // fontFamily: 'Poppins-Regular',
    fontSize: hp(2),
    textAlignVertical: 'center',
  },
  closeIcon: {
    marginRight: wp(2),
  },
  moviesSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#EFEFEF',
    // backgroundColor: '#F6F6FA',
    marginHorizontal: hp(1.5),
    paddingTop: hp(5.8),
  },
  listOfMovies: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieContainer: {
    alignItems: 'center',
    marginTop: hp(2.3),
    marginHorizontal: wp(1.5),
    backgroundColor: '#F6F6FA',
  },
  poster: {
    width: hp(20.5),
    height: hp(10),
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
  columnWrapper: {
    // justifyContent: 'space-around', // Optional: space between columns
  },
});
