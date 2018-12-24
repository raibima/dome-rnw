import React from 'react';

import FlatList from './FlatList';
import House from './House';

import { ActivityIndicator, StyleSheet } from 'react-native';

const PureHouse = React.memo(House);

export default function SearchResultList(props) {
  if (props.loading) {
    return (
      <ActivityIndicator
        style={styles.loading}
        animating
        color="rgb(47, 204, 113)"
        size="large"
      />
    );
  }

  return (
    <FlatList
      data={props.houses}
      keyExtractor={(item) => String(item.id)}
      initialNumToRender={3}
      windowSize={2}
      renderItem={({ item }) => (
        <PureHouse
          name={item.name}
          address={item.address}
          thumbnail={item.photos[0]}
          rating={item.rating}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 16,
    flex: 1,
  },
});
