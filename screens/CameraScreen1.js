
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

import Camera from 'react-native-camera'
import {db} from '../config.js';
const fetch = require('node-fetch');
const FormData = require('form-data');

export default class CameraScreen1 extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      path: null,
	  score: 0,
    };
  }

  async processImage(data){
	  const formData = new FormData();
	  formData.append('file', {
		  name: "frontHand.jpg",
		  type: "image/jpeg",
		  uri: data.path
	  });

	  fetch('http://8c41529b.ngrok.io/image', {
		  method: 'post',
		//  headers: {
		//	  Accept: 'multipart/form-data',
		//	  'Content-Type':'multipart/form-data',
		//	  }, 
		  body: formData
		  }).then(res => res.json())
		.then(json => this.setState({score: (json.percent * 100).toFixed(0)}, () => {
			db.ref('/sessions/' + finalSession + '/sessionID/' + finalName).update({Score: this.state.score});
			this.props.navigation.navigate('PieChart',{score: this.state.score});
		}))		
		.catch(err => console.log(err))
  }
  

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
		this.processImage(data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress = {
			  () => setTimeout(this.takePicture.bind(this),5000)
			}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Text
          style={styles.cancel}
        > Loading...
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
	alignItems: 'center',
	justifyContent: 'center',
    position: 'absolute',
    right: 70,
    top: 10,
    backgroundColor: '#FFF',
    color: '#000',
    fontWeight: '600',
    fontSize: 25,
  }
});
