/* application/components/messages/MessagesView.js */

import React, { Component } from 'react';
import { Navigator, AsyncStorage } from 'react-native';
import { flatten, uniq, map } from 'underscore';

import Conversation from './Conversation';
import Conversations from './Conversations';
import { DEV, API } from '../../config';
import { globals } from '../../styles';
import {Headers} from  '../../fixtures';


class MessagesView extends Component{
  constructor(){
    super();
    this.state = {
      conversations : [],
      ready         : false,
      users         : [],
    };
  }
  componentDidMount(){
    
    this._loadConversations()

  }

  _loadConversations(){
      let { currentUser } = this.props;
      let {token} = this.props;
      fetch( API+ '/conversations/me', {
        method:'GET',
        headers: {'Content-Type': 'application/json','token': token }
      })
      .then(response => response.json().then((reply) => {
        let conversations = [];
        let users = []
        for (var key in reply.result[0]) {
          if (reply.result[0].hasOwnProperty("conversations")) {
            conversations.push(key);
          }
          if (reply.result[0].hasOwnProperty("users")) {
            users.push(key);
          }
        }
        this.setState({ conversations: conversations, users: users, ready: true })
      }))
      .catch(err => this.ready(err))
      .done()
    }

      


  ready(err){
    this.setState({ ready: true });
  }

  render(){
    return (
      <Navigator
        style={globals.flex}
        initialRoute={{ name: 'Conversations' }}
        renderScene={(route, navigator) => {
          switch(route.name){
            case 'Conversations':
              return (
                <Conversations
                  {...this.props}
                  {...this.state}
                  navigator={navigator}
                />
            );
            case 'Conversation':
              return (
                <Conversation
                  {...this.props}
                  {...this.state}
                  {...route}
                  navigator={navigator}
                />
            );
          }
        }}
      />
    )
  }
}

export default MessagesView;