import { actionTypes } from './';
import axios from 'axios';
import { fromJS } from 'immutable';
//fromJS(res.data)

export const getPersonInfo = () => ({
  type: actionTypes.PERSON_INFO
});
