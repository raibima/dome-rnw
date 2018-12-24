import React, { useEffect, useRef } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { FlatList as RNFlatList } from 'react-native';

export default function FlatList(props) {
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

  return <RNFlatList {...props} ref={scrollRef} />;
}
