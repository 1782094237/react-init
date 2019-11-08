import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import Lay from './layout';
import Login from './login/login.js'
import { actionCreator } from './layout/store/index'
require('./static/icons/iconfont.js')
class IfLogin extends Component {

  getCookie(name){
    console.log("###################")
    console.log(document.cookie)
    if (document.cookie.length>0)
    {
      let start=document.cookie.indexOf(name + "=")//返回某指定值在字符串中首次出现的位置。
      if (start!=-1)
      { 
        //已登录
        this.props.setLogin(1)
        // return <Lay></Lay>
      } else{
        //未登录
        // return <Login></Login>
      }
    }
  }

  ifLogin(){
    if(this.props.login == 1){
      return <Lay></Lay>
    }else{
      return <Login></Login>
    }
  }
  render(){
    this.getCookie('SOFTID')
    return(
      <Fragment>
          {this.ifLogin()}
      </Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return ({
    login:state.getIn(['header','login'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetLogin(key){
          const action = actionCreator.setLogin(key);
          dispatch(action);
      },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(IfLogin)


