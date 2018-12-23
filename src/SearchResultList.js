import React from 'react';

import House from './House';

import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

export default function SearchResultList(props) {
  return (
    <ScrollView>
      {props.loading && (
        <ActivityIndicator
          style={styles.loading}
          animating
          color="rgb(47, 204, 113)"
          size="large"
        />
      )}
      {Array.isArray(props.houses) &&
        props.houses.map((h) => (
          <House
            key={h.id}
            name={h.name}
            address={h.address}
            thumbnail={h.photos[0]}
            rating={h.rating}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 16,
  },
});
