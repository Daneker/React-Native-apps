import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

const SIGNIN_USER_MUTATION = gql`
    mutation SigninUserMutation($email: AUTH_PROVIDER_EMAIL) {
        signinUser(email: $email) {
            token
            user {
                id
            }
        }
    }
`;

class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'SIGN IN',
    };

    state = {
        email: '',
        password: '',
    }
    
    handleLogin = async ({user}) => {
        try {
            const result = await this.props.SIGNIN_USER_MUTATION({
                variables: {
                    email: {
                        email: this.state.email,
                        password: this.state.password,
                    }
                }
            })
            this.props.navigation.navigate('RecipeList', {user: user});
            console.log(result, 'result')
        } catch(err) {
            alert("Email is not registered!")
        }
    }

    handleChangePassword = (password) => {
        this.setState({password});
    }
    handleChangeEmail = (email) => {
        this.setState({email});
    };

    render () {
        return (
            <Mutation mutation={SIGNIN_USER_MUTATION}>
            {(signinUser, { data, loading, error }) => (
                <ScrollView alwaysBounceVertical={false}>
                        <TextInput style={styles.descriptionInput}
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={this.handleChangeEmail}
                        />
                        <TextInput style={styles.descriptionInput}
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={this.handleChangePassword}
                        /> 
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {this.handleLogin(data.user)}}
                        >
                            <Text style={styles.saveButtonText}>SIGN IN</Text>
                        </TouchableOpacity>
                </ScrollView>
            )}
            </Mutation>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,1)'
    },
    header:{
      fontSize:20,
      textAlign:'center',
      fontWeight: 'bold'
    },
    descriptionInput: {
      paddingHorizontal: 20,
      marginTop:30,
      height: 40,
      width:'90%',
      fontSize: 14,
      borderColor: 'gray',
      borderWidth: 1,
      marginHorizontal:20,
    },
    saveButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      height: 40,
      width:'90%',
      borderRadius: 5,
      marginHorizontal:20,
      margin:10,
    },
    saveButtonText: {
      color: 'white',
    },
  })
export default graphql(SIGNIN_USER_MUTATION, {name: "SIGNIN_USER_MUTATION"})(SignInScreen);