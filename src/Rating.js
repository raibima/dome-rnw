import React from 'react';

import Star from 'react-feather/dist/icons/star';

import { View, StyleSheet } from 'react-native';

export default function Rating(props) {
  const roundedValue = Math.round(props.value);

  const greens = [];
  for (let i = 0; i < roundedValue; i++) {
    greens.push(`green-${i}`);
  }

  const blacks = [];
  for (let j = 0; j < 5 - roundedValue; j++) {
    blacks.push(`black-${j}`);
  }

  return (
    <View style={[styles.container, props.style]}>
      {greens.map((g) => (
        <View key={g} style={styles.icon}>
          <Star size={14} color="rgb(47, 204, 113)" />
        </View>
      ))}
      {blacks.map((b) => (
        <View key={b} style={styles.icon}>
          <Star key={b} size={14} color="rgb(153, 153, 153)" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});
