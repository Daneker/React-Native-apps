import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Image, StyleSheet, View, Text, TouchableOpacity, Share, ScrollView} from 'react-native';

const Favourites_Mutation = gql`
  mutation updateUser(
    $id: ID!
    $favRecipeIds: [Recipe]
  ) {
    createRecipe(
      id: $id
      favRecipeIds: $favRecipeIds
    ) {
      id
      favRecipes {
        id
      }
    }
  }
`;

export default class RecipeDetail extends React.Component {
  static navigationOptions = {
    title: 'RECIPE DETAIL',
  };
  
  recipe = this.props.navigation.getParam('recipe', 'default')

  ShareMessage = () => {
    Share.share(
      {    
        message: this.recipe.title
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  LikeRecipe = async() => {
    const { userID, recipeID } = this.props.navigation.state.params;
    const oldRecipeIds =  userID.favRecipes.map(recipe => recipe.id);
    const favRecipeIds = [...oldRecipeIds, recipeID];
    try {
      const result = await this.props.Favourites_Mutation({
        variables: {
          id: user.id,
          favRecipeIds,
        }
      })
    } catch (err) {
      console.log("Error", err);
    }
  }

  render() {
    return (    
      <ScrollView style={styles.container}>       
          <View>
            <Text style={styles.title}>
              {this.recipe.title}
            </Text>
            {!!this.recipe.imageURL && (<Image 
              style={styles.imageStyle} 
              source={{uri: this.recipe.imageURL}}
            />)}
            <Text style={styles.textType}>
              Description:
            </Text>
            <Text style={styles.text}>
              {this.recipe.description}
            </Text>
            <Text style={styles.textType}>
              Ingredients:
            </Text>
            <Text style={styles.text}>
              {this.recipe.ingredients}
            </Text >
            <Text style={styles.textType}>
              Instructions:
            </Text>
            <Text style={styles.text}>
              {this.recipe.instructions}
            </Text>
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={ this.ShareMessage }>
              <Text style={styles.saveButtonText}>
                SHARE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => this.LikeRecipe()}
                >
              <Text style={styles.saveButtonText}>
                LIKE
              </Text>
            </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  title: {
    fontSize: 28,
    margin: 8,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textType: {
    fontSize: 16.5,
    margin: 8,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 40,
    width:'90%',
    borderRadius: 5,
    margin:10,
  },
  saveButtonText: {
    color: 'white',
  },
  imageStyle: {
    height: 200,
    width: 250,
    alignSelf: 'center',
  }
})