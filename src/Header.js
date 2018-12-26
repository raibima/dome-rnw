import React, { useState, useRef, useEffect } from 'react';

import Search from 'react-feather/dist/icons/search';
import XCircle from 'react-feather/dist/icons/x-circle';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Header(props) {
  const [searchBarActive, setSearchBarActive] = useState(false);
  const searchBarRef = useRef();

  useEffect(
    () => {
      if (searchBarRef.current) {
        if (searchBarActive) {
          searchBarRef.current.focus();
        } else {
          searchBarRef.current.clear();
        }
      }
    },
    [searchBarActive]
  );

  function handleSearchPress() {
    if (!searchBarActive) {
      setSearchBarActive(true);
    } else {
      props.history.push(`/search?q=${searchBarRef.current._node.value}`);
      setSearchBarActive(false);
    }
  }

  function handleSearchKeyPress(e) {
    if (e.which === 13) {
      // enter / return
      handleSearchPress();
    } else if (e.which === 27) {
      // escape
      setSearchBarActive(false);
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.mainArea}>
        {searchBarActive && (
          <>
            <TextInput
              ref={searchBarRef}
              style={styles.searchBar}
              onKeyPress={handleSearchKeyPress}
              keyboardType="search"
            />
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setSearchBarActive(false)}
            >
              <XCircle size={18} />
            </TouchableOpacity>
          </>
        )}

        {!searchBarActive && (
          <>
            <Text style={styles.textResult}>
              {`Result for `}
              <Text style={[styles.textResult, styles.textQuery]}>
                {props.query}
              </Text>
            </Text>

            {props.status === 'DONE' && (
              <Text style={styles.textFoundResult}>
                {`Found ${props.count} result(s) in ${props.time}ms`}
              </Text>
            )}
          </>
        )}
      </View>

      <TouchableOpacity style={styles.searchIcon} onPress={handleSearchPress}>
        <Search />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    padding: 16,
    width: '100%',
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainArea: {
    flex: 1,
    position: 'relative',
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
  searchIcon: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 4,
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
