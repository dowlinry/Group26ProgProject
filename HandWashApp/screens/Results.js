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
import Pie from 'react-native-pie';

import { MonoText } from '../assets/text/StyledText';
/*
   Code by: Catalina Rete
   Navigate to this component like this: this.props.navigation.navigate('PieChart',{score: 35})
*/

export default class Results extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const score = navigation.getParam('score', 'NO-ID');
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
          <View style={styles.pieChartContainer}>
            <Pie
              radius={70}
              innerRadius={65}
              series={[score]}
              colors={['#f00']}
              backgroundColor="#ddd"
            />
            <View style={styles.gauge}>
              {/*Text in between Gauge Pie Chart*/}
              <Text style={styles.gaugeText}>{score}%</Text>
            </View>
            <View style={styles.message}>
            <Text style={{fontWeight: 'bold',fontSize:14}}> Congratulations! Your accuracy is {score}%! </Text>
            </View>
          </View>

          <View style={styles.getStartedContainer}>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () =>     this.props.navigation.navigate('Home')
               }>
               <Text style = {styles.submitButtonText}> Reset </Text>
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
    marginTop:20,
  },
  pieChartContainer:{
    marginTop: 30,
    alignItems: 'center',
  },
  gauge: {
   position: 'absolute',
   width: 140,
   height: 140,
   alignItems: 'center',
   justifyContent: 'center',
 },
 gaugeText: {
   backgroundColor: 'transparent',
   color: '#000',
   fontSize: 24,
 },
 message:{
   marginTop:15,
 },
});
