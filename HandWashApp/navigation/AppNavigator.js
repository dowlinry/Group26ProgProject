import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen1 from '../screens/CameraScreen1';
import Results from '../screens/Results';
//import ResultsScreen from '../screens/ResultsScreen';
//import MainTabNavigator from './MainTabNavigator';

//export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //Main: MainTabNavigator,
//}));

const MainNavigator = createStackNavigator({
	Home: {screen: HomeScreen},
	Camera1: {screen: CameraScreen1},
	PieChart:{screen:Results},
//	Results: {screen: ResultsScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
