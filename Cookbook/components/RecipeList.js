import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ListItem } from "react-native-elements";
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

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

class RecipeList extends React.Component {
  state = {
    refreshing: false,
    selected: false
  };
  static navigationOptions = {
    title: "RECIPE"
  };

  handleOnPressed = item => {
    const user = this.props.navigation.getParam('user');
    const userID = user.id;
    const recipeID = item.id;
    this.props.navigation.navigate("RecipeDetail", { recipe: item, userID, recipeID});
  };
  
  keyExtractor = item => item.id;
  renderItem = ({ item }) => (
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
  );

  render() {
    return (
      <Query query={GET_ALL_RECIPES}>
        {({ loading, data, refetch }) =>
          loading ? (
            <ActivityIndicator />
          ) : (
            <React.Fragment>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={data ? data.allRecipes : []}
                renderItem={this.renderItem}
                onRefresh={refetch}
                refreshing={data.networkStatus === 4}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  this.props.navigation.navigate("CreateRecipeForm");
                }}
              >
                <Text style={styles.saveButtonText}>CREATE NEW RECIPE</Text>
              </TouchableOpacity>
            </React.Fragment>
          )
        }
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 5
  },
  title: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 40,
    width: "90%",
    borderRadius: 5,
    margin: 20
  },
  saveButtonText: {
    color: "white"
  }
});
export default RecipeList;
