import {
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { ImagePicker, Permissions } from "expo";

const CREATE_RECIPE = gql`
  mutation addRecipe(
    $title: String!
    $description: String!
    $ingredients: [String!]!
    $instructions: [String!]!
    $imageURL: String
  ) {
    createRecipe(
      title: $title
      description: $description
      ingredients: $ingredients
      instructions: $instructions
      imageURL: $imageURL
    ) {
      id
      title
      description
      ingredients
      instructions
      imageURL
    }
  }
`;

const FILE_UPLOAD_URL =
  "https://api.graph.cool/file/v1/cjj6o76c901470166quzicvvl";

class CreateRecipeForm extends React.Component {
  state = {
    titleInputValue: "",
    descriptionInputValue: "",
    ingredients: "",
    instructions: "",
    imageUri: null,
    imageURL: null
  };
  static navigationOptions = {
    title: "NEW RECIPE"
  };

  handleChangeTitleInputValue = titleInputValue => {
    this.setState({ titleInputValue });
  };
  handleChangeDescriptionInputValue = descriptionInputValue => {
    this.setState({ descriptionInputValue });
  };
  handleIngredientsInputValue = ingredients => {
    this.setState({ ingredients });
  };
  handleInstructionsInputValue = instructions => {
    this.setState({ instructions });
  };

  handelUploadButtonPress = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const photo = await ImagePicker.launchImageLibraryAsync();
    this.setState({ imageUri: photo.uri });

    let formData = new FormData();
    formData.append("data", {
      uri: this.state.imageUri,
      name: "image.png",
      type: "multipart/form-data"
    });

    try {
      const res = await fetch(FILE_UPLOAD_URL, {
        method: "POST",
        body: formData
      });
      const resJson = await res.json();
      this.setState({ imageURL: resJson.url });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  render() {
    return (
      <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, { data, loading, error }) => (
          <ScrollView alwaysBounceVertical={false}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Title"
              value={this.state.titleInputValue}
              onChangeText={this.handleChangeTitleInputValue}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              value={this.state.descriptionInputValue}
              onChangeText={this.handleChangeDescriptionInputValue}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Ingredients"
              value={this.state.ingredients}
              onChangeText={this.handleIngredientsInputValue}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Instructions"
              value={this.state.instructions}
              onChangeText={this.handleInstructionsInputValue}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.handelUploadButtonPress}
            >
              <Text style={{ color: "white" }}>UPLOAD PHOTO</Text>
            </TouchableOpacity>
            {!!this.state.imageUri && (
              <Image
                style={styles.imageStyle}
                source={{ uri: this.state.imageUri }}
              />
            )}
            <TouchableOpacity
              style={styles.saveButton}
              disabled={
                loading ||
                this.state.titleInputValue === "" ||
                this.state.descriptionInputValue === "" ||
                this.state.ingredientsInputValue === "" ||
                this.state.instructionsInputValue === "" ||
                this.state.imageURL === null
              }
              onPress={() => {
                createRecipe({
                  variables: {
                    title: this.state.titleInputValue,
                    description: this.state.descriptionInputValue,
                    ingredients: this.state.ingredients,
                    instructions: this.state.instructions,
                    imageURL: this.state.imageURL
                  }
                });
                this.props.navigation.navigate("RecipeList");
              }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.saveButtonText}>SUBMIT</Text>
              )}
            </TouchableOpacity>
            <View />
          </ScrollView>
        )}
      </Mutation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  descriptionInput: {
    paddingHorizontal: 20,
    marginTop: 10,
    height: 40,
    width: "90%",
    fontSize: 14,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: 40,
    width: "90%",
    borderRadius: 5,
    marginHorizontal: 20,
    margin: 10
  },
  saveButtonText: {
    color: "white"
  },
  imageStyle: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10
  }
});

export default CreateRecipeForm;
