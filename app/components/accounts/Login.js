/* application/components/accounts/Login.js */
import React, { Component } from 'react';
import {API, DEV} from '../../config';
import Header from  '../../fixtures';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { extend } from 'underscore';

import BackButton from '../../shared/BackButton';
import Colors from '../../styles/colors';
import NavigationBar from 'react-native-navbar';
import { globals, formStyles } from '../../styles';

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
    fetch('${API}/user/login', {
      method: 'POST',
      headers: Header,
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => this.loginStatus(data))
    .catch(err => this.connectionError())
    .done();
  }

  loginStatus(response){
    if (response.status === 401){
      this.setState({ errorMsg: 'Email or password was incorrect.' });
    } else {
      this.fetchUserInfo(response.id)
    }
  }
  fetchUserInfo(sid){
    fetch(`${API}/users/me`, { headers: extend(Header, { 'Set-Cookie': `sid=${sid}`}) })
    .then(response => response.json())
    .then(user => this.updateUserInfo(user))
    .catch(err => this.connectionError())
    .done();
  }
  updateUserInfo(user){
    if (DEV) { console.log('Logged in user:', user); }
    this.props.updateUser(user);
    this.props.navigator.push({ name: 'Dashboard' })
  }
  connectionError(){
    this.setState({ errorMsg: 'Connection error.'})
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
          tintColor={Colors.brandPrimary}
        />
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