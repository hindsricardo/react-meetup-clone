/* application/components/shared/TechnologyList.js */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globals, formStyles } from '../styles';
const styles = formStyles;
const TechnologyList = ({ technologies, handlePress }) => {
  return (
    <View style={styles.textContainer}>
      {technologies.map((technology, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => handlePress(idx)}
            style={styles.technology}
          >
            <Text style={[styles.h6, globals.primaryText]}>
              {technology}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TechnologyList;