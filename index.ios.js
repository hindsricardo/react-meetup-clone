/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  AsyncStorage
} from 'react-native';

import Landing from './app/components/Landing';
import Dashboard from './app/components/Dashboard';
import { globals } from './app/styles';
import Login from './app/components/accounts/Login';
import Register from './app/components/accounts/Register';
import RegisterConfirmation from './app/components/accounts/RegisterConfirmation';
import {storageKey} from './app/config';

class assemblies extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updatedToken = this.updatedToken.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.state = { user: null, token: null, location:null };
  }

  logout(){
    AsyncStorage.removeItem(storageKey, ()=>{
      this.nav.push({ name: 'Landing' });
      this.updateUser(null);
    });
  }

  updatedToken(token){
      this.setState({ token: token });
  }

  updateUser(user) {
    this.setState({ user: user });
  }

  updateLocation(location){
    this.setState({ location: location });
  }
  render() {
    return (
      <Navigator
        style={globals.flex}
        ref={(el) => this.nav = el }
        initialRoute={{name:'Landing'}}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Landing':
              return( 
                <Landing 
                navigator={navigator}
                updatedToken={this.updatedToken}
                updateUser={this.updateUser}
                updateLocation={this.updateLocation}
                 />
              );
            case 'Dashboard':
              return(
                <Dashboard 
                  updateUser={this.updateUser}
                  updateLocation={this.updateLocation}
                  navigator={navigator}
                  user={this.state.user}
                  location={this.state.location}
                  logout={this.logout}
                  token={this.state.token}
                />
              );
            case 'Register':
              return(
                <Register navigator={navigator} />
              );
            case 'RegisterConfirmation':
              return (
                <RegisterConfirmation
                  {...route}
                  updateUser={this.updateUser}
                  navigator={navigator}
                  updatedToken={this.updatedToken}
                  updateLocation={this.updateLocation}
                />
              );
            case 'Login':
              return(
                <Login 
                updateUser={this.updateUser}
                navigator={navigator} 
                updatedToken={this.updatedToken}
                updateLocation={this.updateLocation}
                />
              );

          }
        }}
      />
    );
  }
}



AppRegistry.registerComponent('assemblies', () => assemblies);
