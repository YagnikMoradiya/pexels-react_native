import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNFetchBlob from 'rn-fetch-blob';

const ImageScreen = ({route}) => {
  const {data} = route.params;
  const refRBSheet = useRef();

  const savePhoto = async (url) => {
    let date = new Date();
    let image_URL = url;
    let ext = getExtention(image_URL);
    ext = '.' + ext;
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.showWithGravity(
          'Download successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .catch((err) => console.log(err));
  };

  const getExtention = (url) => {
    const ext = url.split('.');
    return ext[ext.length - 1];
  };

  const DPermisson = async (url) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        savePhoto(url);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onShare = async (image_URL) => {
    try {
      const result = await Share.share({
        message: image_URL,
      });
      if (result.action === Share.dismissedAction) {
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top__container}>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{width: 25, height: 35}}>
          <Icon name="ellipsis-v" size={30} color="#e2e2e2" />
        </TouchableOpacity>
      </View>
      <View style={styles.image__container}>
        <Image
          resizeMode="contain"
          source={{uri: data.src.original}}
          style={styles.image__style}
        />
      </View>
      <View style={styles.bottom__container}>
        <Text style={styles.photographer__name}>{data.photographer}</Text>
        <Text
          style={styles.photographer__link}
          onPress={() => Linking.openURL(data.photographer_url)}>
          Visit Profile
        </Text>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#222f3e',
          },
        }}>
        <View style={{backgroundColor: '#1e272e', flex: 1}}>
          <TouchableOpacity
            style={styles.BSbutton__container}
            onPress={() => {
              DPermisson(data.src.original);
              refRBSheet.current.close();
            }}>
            <Icon name="download" size={20} color="#dfe4ea" />
            <Text style={styles.button__text}>Original</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BSbutton__container}
            onPress={() => {
              DPermisson(data.src.portrait);
              refRBSheet.current.close();
            }}>
            <Icon name="download" size={20} color="#dfe4ea" />
            <Text style={styles.button__text}>Portrait</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BSbutton__container}
            onPress={() => {
              DPermisson(data.src.landscape);
              refRBSheet.current.close();
            }}>
            <Icon name="download" size={20} color="#dfe4ea" />
            <Text style={styles.button__text}>Landscape</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BSbutton__container}
            onPress={() => {
              onShare(data.src.original);
              refRBSheet.current.close();
            }}>
            <Icon name="share" size={20} color="#dfe4ea" />
            <Text style={styles.button__text}>Share</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};
export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  top__container: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  image__container: {
    flex: 1,
    justifyContent: 'center',
  },
  image__style: {
    width: null,
    height: 500,
  },
  bottom__container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photographer__name: {
    fontSize: 30,
    fontWeight: '600',
    color: '#f5f6fa',
    fontFamily: 'ArchitectsDaughter-Regular',
  },
  photographer__link: {
    fontSize: 14,
    fontWeight: '300',
    color: '#487eb0',
    fontFamily: 'RobotoMono-Bold',
  },
  BSbutton__container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  button__text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#dfe4ea',
    fontFamily: 'RobotoMono-Bold',
    marginLeft: 15,
  },
});
