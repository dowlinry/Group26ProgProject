
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
var FormData = require('form-data');

export default class CameraScreen1 extends Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      score: null,
    };
  }

  async processImage(data){
    const data = new FormData();
    data.append("file", {
      name: data.name,
      type: data.type,
      uri: data.path
    })

    fetch('http://1bb0202d.ngrok.io/image', {
      method: 'POST',
      // headers: {'Content-Type':'multipart/form-data'},
      body: data
    })
    .then(res => res.json())
    .then(json => this.setState({lol: json.percentage}));  
          
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path, score: this.processImage(data) })
        
		db.ref('/sessions/' + finalSession + '/sessionID/' + finalName).update({
			Score: this.state.score
		});
		this.props.navigation.navigate('PieChart',{score: this.state.score})
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
			  () => setTimeout(this.takePicture.bind(this),1500)
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
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
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
    backgroundColor: '#000',
  },
  cameraContainer: {
	  
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
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});
