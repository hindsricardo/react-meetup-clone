/* application/components/messages/Conversations.js */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import { find, isEqual } from 'underscore';
import Colors from '../../styles/colors';
import { globals, messagesStyles } from '../../styles';
import { rowHasChanged } from '../../utilities';

const styles = messagesStyles;

class Conversations extends Component{
  constructor(){
    super();
    this.visitConversation = this.visitConversation.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this.dataSource = this.dataSource.bind(this);
  }

  visitConversation(user){
    this.props.navigator.push({
      name:'Conversation',
      user: user
    })
  }

  _renderRow(conversation){
    let {currentUser} = this.props;
    let userIDs = this.props.users;
    let otherUserID = find(userIDs, (username) => !isEqual(username, currentUser.username));
    //let user = find(this.props.users, ({ id }) => isEqual(id, otherUserID));
    return (
      <TouchableOpacity 
        style={globals.flexContainer}
        onPress={()=> this.visitConversation(otherUserID)}
      >
        <View style={globals.flexRow}>
          <Image
            style={globals.avatar}
            source={{uri: otherUserID.avatar}}
          />
          <View style={globals.flex}>
            <View style={globals.textContainer}>
              <Text style={styles.h5}>
                {otherUserID.firstName} {otherUserID.lastName}
              </Text>
              <Text style={styles.h6}>
                {moment(conversation.lastMessageDate).fromNow()}
              </Text>
            </View>
            <Text style={[styles.h4, globals.mh1]}>
              {conversation.lastMessageText}
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon
              size={30}
              name="ios-arrow-forward"
              color={Colors.bodyTextLight}
            />
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    )
  }
  dataSource(){
    return (
      new ListView.DataSource({ rowHasChanged: rowHasChanged })
        .cloneWithRows(this.props.conversations)
    );
  }
  render() {
    let titleConfig = { title: 'Messages', tintColor: 'white' };
    return (
      <View style={globals.flexContainer}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
        />
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource()}
          contentInset={{ bottom: 49 }}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
};

export default Conversations;