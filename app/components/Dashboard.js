/* application/components/Dashboard.js */
import React, { Component } from 'react';
import { TabBarIOS, AsyncStorage } from 'react-native';
import { TabBarItemIOS } from 'react-native-vector-icons/Ionicons';

import ActivityView from './activity/ActivityView';
import MessagesView from './messages/MessagesView';
import ProfileView from './profile/ProfileView';
import { Headers } from '../fixtures';
import { API, storageKey } from '../config';

class Dashboard extends Component{
  constructor(){
    super();
    this.state = {
      selectedTab: 'Activity'
    }
  }

  render(){
    let { user } = this.props;
    let {location} = this.props;
    let {logout} = this.props;
    let {token} = this.props;

    return (
      <TabBarIOS>
        <TabBarItemIOS
          title='Activity'
          selected={this.state.selectedTab === 'Activity'}
          iconName='ios-pulse'
          onPress={() => this.setState({ selectedTab: 'Activity' })}
        >
          <ActivityView currentUser={user} token={token} location={location}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Messages'
          selected={this.state.selectedTab === 'Messages'}
          iconName='ios-chatboxes'
          onPress={() => this.setState({ selectedTab: 'Messages' })}
        >
          <MessagesView currentUser={user} token={token} location={location}/>
        </TabBarItemIOS>
        <TabBarItemIOS
          title='Profile'
          selected={this.state.selectedTab === 'Profile'}
          iconName='ios-person'
          onPress={() => this.setState({ selectedTab: 'Profile' })}
        >
          <ProfileView currentUser={user} logout={logout} token={token} location={location}/>
        </TabBarItemIOS>
      </TabBarIOS>
    )
  }
}

export default Dashboard;