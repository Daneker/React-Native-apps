import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ListItem } from 'react-native-elements';
import { Toolbar, ToolbarContent } from 'react-native-paper';
import { ActivityIndicator, FlatList, Text, StyleSheet, View } from 'react-native';
const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    ingredients
    instructions
    imageURL
  }
}
`;

class RecipeList extends React.Component{
  state = {
    refreshing: false,
  }
  static navigationOptions = {
      title: 'My Favourites',
  };

  handleOnPressed = item => {
    this.props.navigation.navigate('RecipeDetail', {recipe: item})
  }

  keyExtractor = (item) => item.id;
  renderItem = ({item}) => (
    <ListItem 
      title={item.title}
      titleStyle={{ fontSize: 24, color: "blue", alignSelf: 'center' }}
      subtitle={item.description}
      subtitleStyle={{ fontSize: 16, color: "gray", alignSelf: 'center'}}
      avatar={item.imageURL}
      avatarStyle={{height: 80, width:80, alignSelf: 'flex-start'}}
      containerStyle={{height: 100, justifyContent: 'center', alignItems: 'center'}}
      onPress={() => this.handleOnPressed(item)}
    />    
  )
  
  render() {
    return (
      <View style={{backgroundColor: '#ecf0f1'}}>
        <Toolbar style={styles.toolbarStyle}>
          <ToolbarContent style={{textColor: 'white'}} title="Favourites" />
        </Toolbar>
       
      <Query query={GET_ALL_RECIPES}>
        {({loading, data, error, refetch}) => (
          loading
            ? <ActivityIndicator />
            : 
            (
              <React.Fragment>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={data ? data.allRecipes : []}
                  renderItem={this.renderItem}
                  onRefresh={refetch}
                  refreshing={data.networkStatus === 4}
                />            
              </React.Fragment>
            )
        )}
      </Query>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    marginTop:10,
    width:'95%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:3,
    marginHorizontal:5,
  },
  title:{
    fontSize:20,
    margin:10,
    textAlign:'center',
    fontWeight: 'bold'
  },
  toolbarStyle: {
    height: 45,
    backgroundColor: 'blue',
    borderWidth: 0.5, 
    borderColor: 'gray',
  }
})
export default RecipeList;