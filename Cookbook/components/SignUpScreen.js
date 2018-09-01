import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation(
        $authProvider: AuthProviderSignupData = {
            email: { email: "", password: "" }
        }
    ) {
        createUser(authProvider: $authProvider) {
            email
            password
        }
    }
`;

class SignUpScreen extends React.Component {
    static navigationOptions = {
        title: 'SIGN UP',
      };

    state = {
        email: '',
        password: '',
        passwordConfirm: '',
    }

    handleSignup = async () => {
        try {
            const result = await this.props.CREATE_USER_MUTATION({
                variables: {
                    authProvider: {
                        email: {
                            email: this.state.email,
                            password: this.state.password,
                        }   
                    }
                }
            });
            this.props.navigation.navigate('SignInScreen');
            console.log(result, 'result')
        } catch(err) {
            alert("Email is already registered!")
        }
    }

    handleChangePassword = (password) => {
        this.setState({password});
    }
    handleChangeEmail = (email) => {
        this.setState({email});
    };
    handleChangePasswordConfirm = (passwordConfirm) => {
        this.setState({passwordConfirm});
    }

    render () {
        return (
            <Mutation mutation={CREATE_USER_MUTATION}>
            {(createUser, { data, loading, error }) => (
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
                        <TextInput style={styles.descriptionInput}
                            placeholder="Confirm passowrd"
                            value={this.state.passwordConfirm}
                            onChangeText={this.handleChangePasswordConfirm}
                        />  
                        <TouchableOpacity
                            style={styles.saveButton}
                            disabled={this.state.password !== this.state.passwordConfirm}
                            onPress={() => {this.handleSignup()}}
                        >
                            <Text style={styles.saveButtonText}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("SignInScreen");
                              }}>
                            <Text style={styles.haveAccount}>Have an Account?</Text>
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
      marginTop: 15,
    },
    saveButtonText: {
      color: 'white',
    },
    haveAccount:{
        fontSize:18,
        textAlign:'center',
      },
  })
  export default graphql(CREATE_USER_MUTATION, {name: "CREATE_USER_MUTATION"})(SignUpScreen);