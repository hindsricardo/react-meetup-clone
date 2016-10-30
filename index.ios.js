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
import {stoargeKey} from './app/config';

class assemblies extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = { user: null };
  }

  logout(){
    AsyncStorage.removeItem(stoargeKey, ()=>{
      this.nav.push({ name: 'Landing' });
      this.updateUser(null);
    });
  }

  updateUser(user) {
    this.setState({ user: user });
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
                <Landing navigator={navigator}/>
              );
            case 'Dashboard':
              return(
                <Dashboard 
                  updateUser={this.updateUser}
                  navigator={navigator}
                  user={this.state.user}
                  logout={this.logout}
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
                />
              );
            case 'Login':
              return(
                <Login 
                updateUser={this.updateUser}
                navigator={navigator} 
                />
              );

          }
        }}
      />
    );
  }
}



AppRegistry.registerComponent('assemblies', () => assemblies);
