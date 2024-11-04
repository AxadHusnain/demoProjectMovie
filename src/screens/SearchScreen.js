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
import SearchMore from '../assets/icons/SearchMore.png';
const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const getMovieList = () => {
    api
      .get('/movie/upcoming')
      .then(response => {
        setMovies(response.data?.results);
      })
      .catch(error => {
        console.error('Error fetching popular movies:', error);
      });
  };
  const searchMovies = async () => {
    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
        },
      });
      const filteredResults = response.data.results
        .filter(movie => movie.poster_path)
        .slice(0, 5);
      setResults(filteredResults);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  useEffect(() => {
    if (query === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.firstHalfSearch}>
          <Image style={styles.searchIcon} source={Search} />
          <TextInput
            style={styles.inputField}
            placeholderTextColor="#202C434D"
            placeholder="TV shows, movies and more"
            value={query}
            onChangeText={text => setQuery(text)}
          />
        </View>
        <TouchableOpacity onPress={() => setQuery('')}>
          <Image style={styles.closeIcon} source={Close} />
        </TouchableOpacity>
      </View>
      <View style={styles.moviesSection}>
        {query === '' ? (
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
        ) : (
          <View style={styles.searchResultCon}>
            <Text style={styles.topResult}>Top Results</Text>
            <View style={styles.seperatorBorder} />
            <View style={styles.searchListCon}>
              <FlatList
                data={results}
                keyExtractor={item => item?.id.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity style={styles.searchTile}>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                        }}
                        style={styles.searchPoster}
                        resizeMode="stretch"
                      />
                      <View style={styles.tileSubscript}>
                        <View>
                          <Text style={styles.subsTitle}>{item.title}</Text>
                          <Text style={styles.genre}>Genre</Text>
                        </View>
                        <Image source={SearchMore} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  genre: {
    color: '#DBDBDF',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(1.2),
  },
  subsTitle: {
    fontFamily: 'Poppins-Medium',
    color: '#202C43',
    fontSize: hp(1.7),
  },
  tileSubscript: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchTile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  searchPoster: {
    width: hp(13.5),
    height: hp(11),
    borderRadius: hp(1.2),
  },
  searchListCon: {
    marginTop: hp(2),

    flex: 1,
  },
  seperatorBorder: {
    borderTopWidth: 1,
    borderColor: '#0000001C',
    marginTop: hp(1),
  },
  topResult: {
    fontSize: hp(1.4),
    fontFamily: 'Poppins-Medium',
    color: '#202C43',
  },
  searchResultCon: {
    // borderWidth: 1,
    // borderColor: 'black',
    flex: 1,
  },
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
