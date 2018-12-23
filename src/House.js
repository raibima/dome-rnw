import React from 'react';

import Heart from 'react-feather/dist/icons/heart';
import Rating from './Rating';

import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';

export default function House(props) {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.thumbnail }} style={styles.image} />
        <TouchableOpacity style={styles.loveBtn}>
          <Heart color="white" size={18} />
        </TouchableOpacity>
      </View>
      {/* Name */}
      <Text style={styles.propertyName}>{props.name}</Text>
      {/* Detals */}
      <View style={styles.detail}>
        <View style={styles.detailLeft}>
          <Text style={styles.address}>{props.address}</Text>
          {/* TODO: Rating */}
          <Rating value={props.rating} style={styles.rating} />
        </View>
        <Text style={styles.detailRight}>{props.rate}</Text>
      </View>
    </TouchableOpacity>
  );
}

House.defaultProps = {
  name: 'Interfaces Fuchsia Multi-tasking',
  address: '22818 Douglas Stravenue Apt. 664',
  rate: '$164,917.00',
  thumbnail: 'https://picsum.photos/375/220?id=42',
  rating: 4.4,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {},
  image: {
    height: 202,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  propertyName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLeft: {
    flex: 2,
  },
  address: {
    fontSize: 12,
    color: '#999',
  },
  detailRight: {
    flex: 1,
    textAlign: 'center',
    color: 'orange',
    fontSize: 20,
  },
  rating: {
    marginTop: 5,
  },
  loveBtn: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    borderRadius: '100%',
    position: 'absolute',
    top: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
