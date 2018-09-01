import { Constants } from 'expo';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import {RecipeList, CreateRecipeForm, RecipeDetail, SignUpScreen, SignInScreen, Favourites} from './components'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjj6o76c901470166quzicvvl'
});

const RootStack = createStackNavigator(
  {   
    RecipeList: {screen: RecipeList},
    RecipeDetail: {screen: RecipeDetail},
    CreateRecipeForm: {screen: CreateRecipeForm},
    SignUpScreen: {screen: SignUpScreen},
    SignInScreen: {screen: SignInScreen},  
  }, 
  {initialRouteName: 'SignUpScreen'})
  
  
const MainScreenNavigator = createBottomTabNavigator({
  RecipeList: {
    screen: RootStack,
    navigationOptions: {
        tabBarLabel: 'Recipes',
        tabBarIcon: ({tintColor}) => <Icon name ="list" size={35} color={tintColor}/>,
      
    }
  },
  Favourites: { 
    screen: Favourites,
    navigationOptions: {
      tabBarLabel: 'My Favourites',
      tabBarIcon: ({tintColor}) => <Icon name ="list" size={35} color={tintColor}/>
    }
  }
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <MainScreenNavigator />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

export default App;