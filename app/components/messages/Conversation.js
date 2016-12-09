/* application/components/messages/Conversation.js */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import moment from 'moment';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/colors';
import { Headers, DefaultAvatar } from '../../fixtures';
import BackButton from '../../shared/BackButton';
import { isEqual } from 'underscore';
import { DEV, API } from '../../config';
import { globals, messagesStyles } from '../../styles';

const styles = messagesStyles;

const Message = ({ user, message }) => {
  return (
    <View style={[globals.centeredRow, globals.pt1]}>
      <View>
        <Image 
          style={globals.avatar} 
          source={{uri: user.avatar? user.avatar : DefaultAvatar }} 
        />
      </View>
      <View style={[styles.flexCentered, globals.pv1]}>
        <View style={globals.flexRow}>
          <Text style={styles.h5}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text style={styles.h6}>
            {moment(new Date(message.created_at)).fromNow()}
          </Text>
        </View>
        <View style={globals.flexContainer}>
          <Text style={styles.messageText}>
            {message.text}
          </Text>
        </View>
      </View>
    </View>
  )
};

class Conversation extends Component{
  constructor(){
    super();
    this.goBack = this.goBack.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      messages  : [],
      message   : '',
    }
  }
  componentWillMount(){
    this._loadMessages();
  }
  _loadMessages(){
    let { user, currentUser, token } = this.props;
    fetch(`${API}/conversation/messages`,{
      method:'POST',
      headers: {'Content-Type': 'application/json','token': token },
      body: JSON.stringify({
        id1: user.username,
        id2: currentUser.username
      })
    })
    .then(response => response.json().then( (reply)=>{
      this.setState({ messages:reply.messages })
    }))
    .catch(err => console.log('ERR:', err))
    .done();
  }

  createMessage(){
    let { currentUser, user, token } = this.props;
    fetch(`${API}/create/messages`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json','token': token },
      body: JSON.stringify({
        senderUN      : currentUser.username,
        recipientUN   : user.username,
        text          : this.state.message,
        created_at     : new Date().valueOf(),
      })
    })
    .then(response => response.json().then( (data)=>{
      this.setState({ message: '', messages: [ data.message[0], ...this.state.messages ]})
    }))
    .catch(err => {})
    .done();
  }
  goBack(){
    this.props.navigator.pop();
  }
  render(){
    let { user, currentUser } = this.props;
    let titleConfig = {
      title: `${user.firstName} ${user.lastName}`,
      tintColor: 'white'
    };
    return(
      <View style={globals.flexContainer}>
        <InvertibleScrollView inverted={true}>
          {this.state.messages.map((msg, idx) => {
            let dauser = isEqual(msg.senderUN, currentUser.username) ? currentUser : user;
            return (
              <Message
                key={idx}
                message={msg}
                user={dauser}
              />
            );
          })}
        </InvertibleScrollView>
        <View style={styles.navContainer}>
          <NavigationBar
            tintColor={Colors.brandPrimary}
            title={titleConfig}
            leftButton={<BackButton handlePress={this.goBack}/>}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            multiline={true}
            value={this.state.message}
            placeholder='Say something...'
            placeholderTextColor={Colors.bodyTextLight}
            onChangeText={(message) => this.setState({ message })}
            style={styles.input}
          />
          <TouchableOpacity
            style={ this.state.message ? styles.buttonActive : styles.buttonInactive }
            underlayColor='#D97573'
            onPress={this.createMessage}>
            <Text style={ this.state.message ? styles.submitButtonText : styles.inactiveButtonText }>Send</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer topSpacing={-50} />
      </View>
    )
  }
};

export default Conversation;