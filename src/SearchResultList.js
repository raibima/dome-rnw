import React, { useRef, useEffect } from 'react';

import House from './House';

import { ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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

  const scrollRef = useRef();

  useEffect(() => {
    // overflow CSS property on HTML body is discarded
    // in iOS. We need a way to prevent scroll focus from
    // getting blurred from the ScrollView (by disabling further scroll
    // when is already on the top)
    const scrollableNode = scrollRef.current.getScrollableNode();
    disableBodyScroll(scrollableNode);
    return () => {
      enableBodyScroll(scrollableNode);
    };
  }, []);

  return (
    <FlatList
      ref={scrollRef}
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
