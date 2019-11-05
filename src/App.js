import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Lay from './layout';
import Login from './login/login.js'

import './style.css';
import layout from './layout';
import { isLogicalExpression } from '@babel/types';
require('./static/icons/iconfont.js')
class App extends Component {

  ifLogin(name){

    if (document.cookie.length>0)
    {
      let start=document.cookie.indexOf(name + "=")//返回某指定值在字符串中首次出现的位置。
      if (start!=-1)
      { 
        return <Lay></Lay>
        // start = start + name.length+1; 
        // let end=document.cookie.indexOf(";",start)
        // if (end !=-1) 
        //   document.cookie.substring(start,end);
      } else{
        return <Login></Login>
      }
    }
    return <Login></Login>
  }
  render(){
    return (
      <Fragment>
        <Provider store = { store }>
          {this.ifLogin('sessionId')}
          {/* <BrowserRouter>
              <Fragment>
                <Route path = '/' exact component={Home}></Route>
                <Route path = '/detail' exact component={Detail}></Route>
                <Route path = '/' exact render={() => <div>home</div>}></Route>
                <Route path = '/detail' exact render={() => <div>detail</div>}></Route>
              </Fragment>
          </BrowserRouter> */}
        </Provider>
      </Fragment>
    );
  }
  
}

export default App;
