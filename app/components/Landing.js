/* app/components/Landings.js */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
 } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';
import Colors from '../styles/colors';
import { globals } from '../styles';
import {landingStyles} from '../styles';
const BackgroundImage = 'https://s3-us-west-2.amazonaws.com/assembliesapp/welcome%402x.png';
const Logo = 'https://s3-us-west-2.amazonaws.com/assembliesapp/logo.png';
const styles = landingStyles;
import {storageKey} from  '../config';

class Landing extends Component{
  constructor(){
    super();
    this.visitLogin = this.visitLogin.bind(this);
    this.visitRegister = this.visitRegister.bind(this);
    AsyncStorage.getItem(storageKey, (err, obj) => {
      this.props.updatedToken(obj);
      AsyncStorage.getItem("currentUser", (err, data) => {
        this.props.updateUser(JSON.parse(data));
        AsyncStorage.getItem("location", (err,result) => {
          this.props.updateLocation(JSON.parse(result));
        })
      })
      .then( () => {
        this.visitDashboard(obj);
      })
    })

  }
      
  visitDashboard(obj){
    if(obj !== null){
       this.props.navigator.push({
          name: 'Dashboard'
        });
      }
  }

  visitLogin(){
    this.props.navigator.push({
      name: 'Login'
    });
  }

  visitRegister(){
    this.props.navigator.push({
      name: 'Register'
    });
  }

  render(){
    return (
      <View style={styles.container} >
        <View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={{ uri: BackgroundImage }}
          />
        </View>
        <View style={globals.flexCenter} >
          <Image style={styles.logo} source={{uri:Logo}} />
          <Text style={[globals.lightText, globals.h2, globals.mb2]} >
            assemblies
          </Text>
          <Text style={[globals.lightText, globals.h4]} >
            Where Developers Connect
          </Text>
        </View>
        <TouchableOpacity
          style={[globals.button, globals.inactive, styles.loginButton]}
          onPress={this.visitLogin}
        >
          <Icon name='lock' size={36} color={Colors.brandPrimary} />
          <Text style={[globals.buttonText, globals.primaryText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globals.button}
          onPress={this.visitRegister}
        >
          <Icon name='person' size={36} color='white' />
          <Text style={globals.buttonText}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Landing;