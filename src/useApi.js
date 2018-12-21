import { useEffect, useReducer } from 'react';

const BASE_URL = 'https://dome.now.sh/api';

export default function useApi(path) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetch(`${BASE_URL}${path}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      });
  }, []);

  return state;
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
