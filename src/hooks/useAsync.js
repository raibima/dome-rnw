import { useReducer, useEffect } from 'react';

export const AsyncStatus = {
  IDLE: 'IDLE',
  EXECUTING: 'EXECUTING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

export default function useAsync(fn) {
  const [state, dispatch] = useReducer(reducer, {
    status: AsyncStatus.IDLE,
    result: null,
    error: null,
    time: null,
  });

  useEffect(() => {
    dispatch({ type: 'executeStart' });
    const startTime = performance.now();
    fn()
      .then((res) => {
        dispatch({
          type: 'executeDone',
          payload: {
            result: res,
            startTime,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'executeError',
          payload: {
            error: err,
            startTime,
          },
        });
      });
  }, []);

  return state;
}

function reducer(state, action) {
  switch (action.type) {
    case 'executeStart':
      return {
        ...state,
        status: AsyncStatus.EXECUTING,
        result: null,
        error: null,
        time: null,
      };
    case 'executeDone':
      return {
        ...state,
        status: AsyncStatus.DONE,
        result: action.payload.result,
        time: performance.now() - action.payload.startTime,
      };
    case 'executeError':
      return {
        ...state,
        status: AsyncStatus.ERROR,
        error: action.payload.error,
        time: performance.now() - action.payload.startTime,
      };
    default:
      return state;
  }
}
