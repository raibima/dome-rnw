import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.textResult}>
          {`Result for `}
          <Text style={[styles.textResult, styles.textQuery]}>
            {props.query}
          </Text>
        </Text>

        {props.count && (
          <Text style={styles.textFoundResult}>
            {`Found ${props.count} result(s) in ${props.time}ms`}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  header: {
    padding: 16,
    width: '100%',
  },
  textResult: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textQuery: {
    color: '#2fcc71',
  },
  textFoundResult: {
    fontSize: 16,
  },
});
