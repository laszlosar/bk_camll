import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import {
  Button,
  TouchableHighlight,
  Modal,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
  View,
  Image,
  Text,
  Alert
} from 'react-native';

import CommonStyles from '../../common/CommonStyle';

const { Styles } = CommonStyles;

const windowWidth = Dimensions.get('window').width;

export default class EditScreen extends Component {
  constructor(props) {
    super(props);
        
  }
render() {
    return (
      <View style={{flex:1,alignItems:'center'}}>          
          <Text>Sign up</Text>          
      </View>
    );
  }
}
