import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  createStackNavigator
} from 'react-native';

import { MonoText } from '../assets/text/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/surewash_logo.jpg')
                  : require('../assets/images/surewash_logo.jpg')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
			<TextInput style = {styles.input}
			   underlineColorAndroid = "transparent"
               placeholder = "Name"
               autoCapitalize = "none"/>
			<TextInput style = {styles.input}
			   underlineColorAndroid = "transparent"
               placeholder = "Session ID"
               autoCapitalize = "none"/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () =>     this.props.navigation.navigate('Camera1')
               }>
               <Text style = {styles.submitButtonText}> Start </Text>
            </TouchableOpacity>
          </View>
		  
        </ScrollView>

      </View>
    );
  };
};

const styles = StyleSheet.create({
  input: {
	  margin: 15,
	  padding: 10,
	  height: 50,
	  width: 250,
	  borderColor: '#46A293',
	  borderWidth: 1,
	  borderRadius: 10
  },
   submitButton: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
      backgroundColor: '#46A293',
      padding: 10,
      margin: 15,
      height: 50,
	  width: 300,
	  borderWidth: 1,
	  borderRadius: 10
	 
	  

   },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  welcomeImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
