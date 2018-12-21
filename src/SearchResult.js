import React, { useEffect, useRef } from 'react';
import qs from 'query-string';

import Header from './Header';
import SearchResultList from './SearchResultList';

import { ActivityIndicator } from 'react-native';
import useApi from './useApi';

export default function SearchResult(props) {
  const { q: searchQuery } = qs.parse(props.location.search);

  const { houses, loading, time } = useHouseList(searchQuery);

  return (
    <React.Fragment>
      <Header
        query={searchQuery}
        time={time}
        count={Array.isArray(houses) ? houses.length : undefined}
      />

      <SearchResultList houses={houses} />
    </React.Fragment>
  );
}

function useHouseList(query) {
  const { data, loading } = useApi('/houses');
  const time = useRef(performance.now());

  useEffect(
    () => {
      time.current = (performance.now() - time.current).toFixed(2);
    },
    [data]
  );

  if (data) {
    return {
      houses: data.filter((h) =>
        h.name.toLowerCase().includes(query.toLowerCase().trim())
      ),
      loading,
      time: time.current,
    };
  }

  return {
    houses: [],
    loading,
    time: time.current,
  };
}
