import { actionTypes } from './';
import axios from 'axios';
import { fromJS } from 'immutable';
//fromJS(res.data)

export const setItemNumber = (key) => ({
  type: actionTypes.ITEM_NUMBER,
  value:key,
});

export const setLogin = (key) => ({
  type: actionTypes.LOGIN,
  value:key,
});

export const setFile = (key) => ({
  type: actionTypes.FILE,
  value:key,
});

export const setShowFile = (key) => ({
  type: actionTypes.SHOWFILE,
  value:key,
});


