import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';

export default class UserProfile extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const fetchURL = `https://www.googleapis.com/books/v1/volumes?q={this.props.userName}`; 
    fetch(fetchURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
              isLoading: false,
              dataSource:
                responseJson.graphql.user.edge_owner_to_timeline_media.edges,
            });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image
                style={styles.imageComponentStyle}
                source={{ uri: item.node.display_url }}
              />
            </View>
          )}
          numColumns={3}
          key={'THREE COLUMN'}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  imageComponentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#cd486b',
  },
});
