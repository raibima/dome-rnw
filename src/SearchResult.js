import React from 'react';
import qs from 'query-string';

import Header from './Header';
import SearchResultList from './SearchResultList';
import TabBar from './TabBar';
import useAsync from './hooks/useAsync';

import { getHouseListByKeyword } from './Service';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default function SearchResult(props) {
  const { q: searchQuery } = qs.parse(props.location.search);

  const { status, result, time } = useAsync(() =>
    getHouseListByKeyword(searchQuery)
  );

  return (
    <View style={styles.page}>
      <Header
        query={searchQuery}
        time={status === 'DONE' ? time.toFixed(2) : '... '}
        count={status === 'DONE' ? result.length : null}
      />

      <SearchResultList houses={result} loading={status === 'EXECUTING'} />

      <TabBar />
    </View>
  );
}
