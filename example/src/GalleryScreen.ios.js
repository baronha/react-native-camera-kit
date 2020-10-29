import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Button, Image, Dimensions, TouchableOpacity, Text } from 'react-native';

import { CameraKitGallery } from '../../src';
import CameraKitGalleryView from '../../src/CameraKitGalleryView';

const { width, height } = Dimensions.get('window');

export default class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: this.props.albumName,
      presentedImage: undefined,
      selectedImages: [
        {
          height: 1695,
          id: '99F342DF-A360-4840-982E-3BCB1CB21C37/L0/001',
          name: 'public.png',
          size: 65486,
          uri:
            'file:///Users/bao/Library/Developer/CoreSimulator/Devices/4C2AD5B7-0A07-4A2C-828F-8DDD9AE03469/data/Containers/Data/Application/DFF80E55-7044-4CEC-AE5D-5370D4C3CFD6/tmp/06A7E223-7DDF-465C-A551-EDEA2A8C0FC7-78783-00008A66C959719B/public.png',
        },
      ],
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
      imageArray.unshift(selected);
    } else {
      imageArray.splice(foundIndex, 1);
    }

    this.setState({ selectedImages: imageArray });
  }

  async getImage() {
    const { selectedImages } = this.state;
    const imgs = await CameraKitGallery.getImagesForIds(selectedImages);
    console.log('imgs', imgs);
    // this.setState({ selectedImages: imgs.images });
  }

  componentWillUpdate(np, ns) {
    console.log('ns', ns.selectedImages);
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
        <TouchableOpacity
          style={{ padding: 12, margin: 24, backgroundColor: '#000', alignItems: 'center' }}
          onPress={() => this.getImage()}
        >
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Get</Text>
        </TouchableOpacity>
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
