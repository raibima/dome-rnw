import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function Home(props) {
  const [query, setQuery] = useState('');

  function handleChangeText(text) {
    setQuery(text);
  }

  function handleSubmit() {
    props.history.push(`/search?q=${query}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dome</Text>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchBox}
          placeholder="Find your dream home now..."
          value={query}
          onChangeText={handleChangeText}
        />
        <View style={styles.searchBtn}>
          <Button onPress={handleSubmit} title="Go" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchForm: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 5,
    marginLeft: 16,
    borderRadius: 4,
    padding: 10,
  },
  searchBtn: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
  },
});
