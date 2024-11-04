import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../utils/axiosConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import backArrow from '../assets/icons/backArrow.png';
import playBtn from '../assets/icons/PlayBtn.png';
import Loader from '../components/Loader';

const MovieDetails = props => {
  const [movieId, setMovieId] = useState(props.route.params);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  console.log('movie id being send', props);
  const getMovieList = () => {
    setLoading(true);
    api
      .get(`/movie/${movieId}`)
      .then(response => {
        console.log('response of getting movie id from imdb', response.data);
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching  movie id:', error);
        setLoading(false);
      });
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 128); // Random value between 0 and 127
    const g = Math.floor(Math.random() * 128); // Random value between 0 and 127
    const b = Math.floor(Math.random() * 128); // Random value between 0 and 127
    return `rgb(${r}, ${g}, ${b})`; // Return the RGB color string
  };
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
          style={styles.backgroundImage}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => props.navigation.pop()}>
                <Image style={styles.backbtn} source={backArrow} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Watch</Text>
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.subtitle}>
                In Theaters {formatDate(movie?.release_date)}
              </Text>

              <TouchableOpacity style={styles.buttonPrimary}>
                <Text style={styles.buttonPrimaryText}>Get Tickets</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSecondary}>
                <Image source={playBtn} style={styles.playbtn} />

                <Text style={styles.buttonSecondaryText}> Watch Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.lowerSection}>
          <Text style={styles.genreText}>Genres</Text>
          <View style={styles.genreContainer}>
            {movie?.genres.map(genre => (
              <Text
                key={genre.id}
                style={[
                  styles.genreLabels,
                  {backgroundColor: getRandomColor()},
                ]}>
                {genre.name}
              </Text>
            ))}
          </View>
          <View style={styles.seperator} />
          <View style={styles.overViewContainer}>
            <Text style={styles.overViewHeading}>Overview</Text>
          </View>
          <Text style={styles.overViewText}>{movie?.overview}</Text>
        </View>
      </View>
      <Loader loading={loading} />
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
  },
  backgroundImage: {
    height: hp(60),
    width: wp(100),
  },
  headerContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    borderColor: 'white',
    marginTop: hp(7),
    paddingLeft: wp(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backbtn: {
    height: hp(4),
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(1.8),
    marginTop: hp(0.4),
    marginLeft: wp(1.7),
  },
  btnContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: hp(1.8),
  },
  buttonPrimary: {
    backgroundColor: '#61C3F2',
    borderRadius: hp(1),
    marginBottom: hp(1.2),
    height: hp(6),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: hp(1.9),
    fontFamily: 'Poppins-SemiBold',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#61C3F2',
    borderRadius: hp(1),
    marginBottom: hp(3.6),
    height: hp(6),
    paddingHorizontal: wp(11),
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#FFFFFF',
    fontSize: hp(1.9),
    fontFamily: 'Poppins-SemiBold',
  },
  playbtn: {
    marginRight: wp(1),
  },
  lowerSection: {
    marginHorizontal: hp(4.5),
    marginTop: hp(3.2),
  },
  genreText: {
    fontSize: hp(1.8),
    color: '#202C43',
    fontFamily: 'Poppins-Medium',
  },
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  genreLabels: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(1.4),
    borderRadius: hp(1.6),
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.2),
    marginRight: wp(1.2),
  },
  seperator: {
    borderTopWidth: hp(0.022),
    borderColor: '#000000',
    marginTop: hp(2.2),
  },
  overViewContainer: {
    marginTop: hp(1.5),
  },
  overViewHeading: {
    fontFamily: 'Poppins-Medium',
    color: '#202C43',
    fontSize: hp(1.8),
  },
  overViewText: {
    color: '#8F8F8F',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.4),
  },
});
