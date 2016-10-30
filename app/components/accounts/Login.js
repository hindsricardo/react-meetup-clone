/* application/components/accounts/Login.js */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { extend } from 'underscore';
import {API, DEV, stoargeKey} from '../../config';
import BackButton from '../../shared/BackButton';
import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';
import { globals, formStyles } from '../../styles';
import {Headers, secureHeaders} from  '../../fixtures';


const styles = formStyles;

class Login extends Component{
  constructor(){
    super();
    this.loginUser = this.loginUser.bind(this);
    this.goBack = this.goBack.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.state = {
      email           : '',
      password        : '',
      errorMsg        : '',
    };
  }
  loginUser(){
    /* TODO: login user with username and password */
    fetch(API+'/users/login', {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        username: this.state.email.trim(),
        password: this.state.password.trim(),
        lat: 40.7127837,
        lng: -74.0059413,
        city_long_name: "New York",
        state_short_name: "NY"
      })
    })
    .then(response => response.json())
    .then(data => this.loginStatus(data))
    .catch(err => this.connectionError())
    .done();
  }

  loginStatus(sponse){
    if (sponse.status === 401){
      this.setState({ errorMsg: 'Email or password was incorrect.' });
    } else {
      if(sponse.token){
        AsyncStorage.setItem( stoargeKey, sponse.token);
      }
      this.updateUserInfo(sponse.data[0]);
    }
  }
  updateUserInfo(user){
    if (DEV) { console.log('Logged in user:', user); }
    this.props.updateUser(user);
    this.changescene();
  }
  connectionError(){
    this.setState({ errorMsg: 'Connection error.'})
  }

  changescene(){
    this.props.navigator.push({ name: 'Dashboard' });
  }

  goBack(){
    this.props.navigator.pop();
  }
  changeEmail(email){
    this.setState({ email })
  }
  changePassword(password){
    this.setState({ password })
  }
  render(){
    let titleConfig = { title: 'Login', tintColor: 'white' };
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          leftButton={<BackButton handlePress={this.goBack} />}
          title={titleConfig}
          tintColor={Colors.brandPrimary} />
        <ScrollView style={styles.container}>
          <Text style={styles.h3}>
            Login with your email and password.
          </Text>
          <Text style={styles.h4}>
            Email
          </Text>
          <View style={styles.formField}>
            <TextInput
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
              onChangeText={this.changeEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={140}
              placeholderTextColor={Colors.copyMedium}
              style={styles.input}
              placeholder="Your email address"
            />
          </View>
          <Text style={styles.h4}>Password</Text>
          <View style={styles.formField}>
            <TextInput
              ref={(el) => this.password = el }
              returnKeyType="next"
              onChangeText={this.changePassword}
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={140}
              placeholderTextColor={Colors.copyMedium}
              style={styles.input}
              placeholder="Your password"
            />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.errorMsg}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={this.loginUser}
        >
          <Text style={globals.largeButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login;