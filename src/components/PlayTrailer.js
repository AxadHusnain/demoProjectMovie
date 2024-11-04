import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import YouTube from 'react-native-youtube-iframe'; // install this library
import api from '../utils/axiosConfig';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from './Loader';
const TrailerPlayer = ({movieId, closeTrailer}) => {
  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/movie/${movieId}/videos`);
        const trailers = response.data.results.filter(
          video => video.type === 'Trailer',
        );
        if (trailers.length > 0) {
          setTrailerId(trailers[0].key);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
  }, [movieId]);

  const toggleFullScreen = () => {
    setIsFullScreen(false);
    closeTrailer();
  };

  return (
    <View style={styles.mainContainer}>
      {trailerId ? (
        <>
          <Modal isVisible={isFullScreen} style={{margin: 0}}>
            <View style={styles.wrapper}>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={toggleFullScreen}
                  style={styles.btnClose}>
                  <Text style={styles.btnText}>Close</Text>
                </TouchableOpacity>
              </View>
              <YouTube videoId={trailerId} height="100%" play />
            </View>
            <Loader loading={loading} />
          </Modal>
        </>
      ) : (
        <Text>No Trailer Available</Text>
      )}
    </View>
  );
};

export default TrailerPlayer;
const styles = StyleSheet.create({
  mainContainer: {
    height: 200,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: hp(2),
  },
  btnClose: {
    borderWidth: 1,
    borderColor: 'yellow',
    paddingVertical: hp(1),
    borderRadius: hp(2),
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: hp(1.9),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
