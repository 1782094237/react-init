import { actionTypes } from './';
import axios from 'axios';
import { fromJS } from 'immutable';
//fromJS(res.data)

export const setItemNumber = (key) => ({
  type: actionTypes.ITEM_NUMBER,
  value:key,
});
