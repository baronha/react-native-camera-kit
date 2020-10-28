import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Button, Image, Dimensions } from 'react-native';

import { CameraKitGallery } from '../../src';
import CameraKitGalleryView from '../../src/CameraKitGalleryView';

const { width, height } = Dimensions.get('window');

export default class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: this.props.albumName,
      presentedImage: undefined,
      selectedImages: [],
      showPresentedImage: false,
    };
  }

  onTapImage(event) {
    const { selectedImages } = this.state;
    const imageArray = [...selectedImages];
    const selected = event?.nativeEvent?.selected;
    const foundIndex = imageArray.findIndex((item) => item === selected);

    if (foundIndex < 0) {
      if (selectedImages.length === 5) {
        alert('limit');
        return;
      }
      imageArray.push(selected);
    } else {
      imageArray.splice(foundIndex, 1);
    }

    this.setState({ selectedImages: imageArray });
  }

  renderPresentedImage() {
    return (
      <View style={{ position: 'absolute', width, height, backgroundColor: 'green' }}>
        <View style={styles.container}>
          <Image
            resizeMode={'cover'}
            style={{ width: 300, height: 300 }}
            source={{ uri: this.state.presentedImage.imageUri }}
          />

          <Button title={'Back'} onPress={() => this.setState({ showPresentedImage: false })} />
        </View>
      </View>
    );
  }

  render() {
    const { selectedImages } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <CameraKitGalleryView
          style={{ flex: 1, margin: 0, marginTop: 50 }}
          albumName={this.state.album}
          minimumInteritemSpacing={10}
          minimumLineSpacing={10}
          columnCount={3}
          selection={{
            selectedImage: require('../images/hugging.png'),
            imagePosition: 'top-right',
          }}
          onTapImage={(event) => this.onTapImage(event)}
          remoteDownloadIndicatorType={'progress-pie'} //spinner / progress-bar / progress-pie
          remoteDownloadIndicatorColor={'white'}
          backgroundColor={'pink'}
          enable={selectedImages.length < 5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
