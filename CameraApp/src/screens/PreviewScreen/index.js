import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,TouchableHighlight,Image,ScrollView} from 'react-native';
import { RNCamera } from 'react-native-camera';

import CommonStyles from '../../common/CommonStyle';

import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { RNPhotoEditor } from 'react-native-photo-editor'
import Permissions from 'react-native-permissions'

import ImagePicker from 'react-native-image-picker';

import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'


const { Styles } = CommonStyles;

const apiUrl = "http://192.168.1.154:88";

var self= null;
export default class PreviewScreen extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      imageUri:'',
      stickers:[]
    }
    self = this;
    //this.setState({ viewRef: findNodeHandle(this.backgroundImage) });    
  }
  componentDidMount() {
    Permissions.checkMultiple(['camera','photo']).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
    var result = this.getStickers();
    this.setState({stickers:result});
  }
  getStickers()
  {
    const request = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      url: apiUrl + '/stickers/info.json',
      method: 'get'
      //body: JSON.stringify(device)
    }    
    fetch(request.url, request)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(result => {              
              self.setState({stickers:result});              
            });
        } else {

        }
      })
      .catch(error => {        
        return false;
    });
  }
  _requestPermission = () => {
    Permissions.request('camera').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
    Permissions.request('photo').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
  }

  render() {
    return (
      <View style={Styles.cameraContainer}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={Styles.cameraPreview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={Styles.vwControl}>
            <TouchableHighlight style={Styles.backButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'} 
                      onPress={()=>this.props.navigator.push({
                              screen: 'MainScreen',
                              navigatorStyle: {
                                navBarHidden: true
                              }
                      })}>
                  <Image style={Styles.imgBackButton} source={require('../../common/Images/ic_back_white.png')}/>
            </TouchableHighlight>            
            <View style={Styles.vwBottomBar}>
              <View style={{flex:1,marginTop:15}}>
                      <ScrollView horizontal={true}>                      
                          <Image style={Styles.imgFilter} source={require('../../common/Images/img_filter.png')}/>
                          <Image style={Styles.imgFilter} source={require('../../common/Images/img_filter.png')}/>
                          <Image style={Styles.imgFilter} source={require('../../common/Images/img_filter.png')}/>
                          <Image style={Styles.imgFilter} source={require('../../common/Images/img_filter.png')}/>
                          <Image style={Styles.imgFilter} source={require('../../common/Images/img_filter.png')}/>
                      </ScrollView>
              </View>
              <View style={{flex:1,flexDirection:'row',marginBottom:15}}>
                <TouchableHighlight style={Styles.smallButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'}
                    onPress={this.openImagePicker}>
                      <Image style={{width:24,height:24}} source={require('../../common/Images/gallery.png')}/>
                </TouchableHighlight>
                <TouchableHighlight style={Styles.smallButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'}>
                      <Image style={{width:24,height:28}} source={require('../../common/Images/ic_flash.png')}/>
                </TouchableHighlight>
                <TouchableHighlight style={Styles.smallButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'}
                        onPress={this.onTakePhoto.bind(this)}>
                      <Image style={Styles.imgLargeButton} source={require('../../common/Images/ic_capture.png')}/>
                </TouchableHighlight>
                <TouchableHighlight style={Styles.smallButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'} 
                      onPress={this.takePicture.bind(this)}>
                      <Image style={{width:22,height:22}} source={require('../../common/Images/ic_rotate.png')}/>
                </TouchableHighlight>
                <TouchableHighlight style={Styles.smallButtonContainer} activeOpacity={0.6} underlayColor={'rgba(255,255,255,0.1)'}>
                      <Image style={{width:24,height:21}} source={require('../../common/Images/ic_menu.png')}/>
                </TouchableHighlight>           
              </View>
            </View>
        </View>
      </View>
    );
  }

  openImagePicker = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel || !response.error) {
        const url = Platform.OS === 'ios' ? response.origURL : `file://${response.path}`;
        this.setState({ imageUri: url});        
        this.onEditPhoto();
      }
    });
  }


  onEditPhoto = () =>{
    let filter;
    if (Platform.OS === 'ios') {
      filter = [];
    } else if (Platform.OS === 'android') {
      filter = ".*\\.*";
    }
    RNPhotoEditor.Edit({
      baseUrl: apiUrl,
      path: this.state.imageUri,
      stickers: this.state.stickers,
      hiddenControls: [],
      colors: undefined,
      onDone: () => {
        console.log('on done')
      },
      onCancel: () => {
        console.log('on cancel')
      }
    });
  }
  onTakePhoto = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({ imageUri: data.path});
      this.onEditPhoto();
    }
  }
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}
const styles = StyleSheet.create({
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});