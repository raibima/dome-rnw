import React from 'react';

import Star from 'react-feather/dist/icons/star';
import Sort from 'react-feather/dist/icons/align-left';

import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function TabBar() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <Star size={18} color="#444" />
        <Text style={styles.tabName}>RATING</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Sort size={18} color="#444" />
        <Text style={styles.tabName}>SORT BY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 57,
    paddingLeft: 50,
    paddingRight: 50,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabName: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
});
