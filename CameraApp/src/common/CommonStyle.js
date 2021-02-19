import
{
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');
const bottomBarHeight = 200;

const Styles = StyleSheet.create({
  cameraContainer: {
    flex: 1
  },
  cameraPreview:
  {    
    flex:1
  },
  vwControl:
  {
    position:'absolute',
    flex:1,
  },
  backButtonContainer:
  {
    position:'absolute'
  },
  imgBackButton:
  {
    margin:15,
    width:18,
    height:13
  },
  vwBottomBar:{
      marginTop:height - bottomBarHeight,
      height:bottomBarHeight,
      backgroundColor:"#fff",
      opacity:.7
  },
  imgFilter:
  {
    margin:5,
    width:70,
    height:70,
    borderRadius:10
  },
  smallButtonContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  imgSmallButton:{
    width:24,
    height:24
  },
  imgLargeButton:{
    width:64,
    height:64
  }

});

export default {
  Styles 
};
