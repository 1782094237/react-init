import React, { Fragment, Component,PureComponent } from 'react'
import { connect } from "react-redux"

import { actionCreator } from './store'

import axios from 'axios'

import Lay from './layout'
import Login from './login'

import { message } from 'antd';


class IfLogin extends Component {

  getCookie(name){
    // console.log(document.cookie)
    if (document.cookie.length>0)
    {
      let start=document.cookie.indexOf(name + "=")//返回某指定值在字符串中首次出现的位置。
      if (start!=-1)
      { 
        //已登录
        this.props.handleSetLogin(1)
        // return <Lay></Lay>
      } else{
        //未登录
        // return <Login></Login>
      }
    }
  }

  ifLogin(){
    const that = this;
    if(this.props.login == 1){

      axios.get(localStorage.api+'userMes',{withCredentials:true})
        .then(
          (response) => {
          // console.log("是否循环")
          axios.get(localStorage.api+'team/info',{withCredentials:true})
          .then((resolve) => {
            // console.log("获取信息成功33333333333333333333333")
            that.props.handleSetTeamInfo(resolve.data.teamInfo)
            let result = {};
            // console.log("123"+response.data.id)
            for(let i = 0 ; i < resolve.data.studentsInfo.length; i++){
              if(response.data.id == resolve.data.studentsInfo[i].userId){
                
                result = {
                  id:response.data.id,
                  name:response.data.userName,
                  class:response.data.userClass,
                  identity:resolve.data.studentsInfo[i].identity.split(',')
                }
                that.props.handleSetPersonal(result);    
                this.props.handleSetSecondLogin(true)
              }
            }
          })
        }) 
        .catch((error) => {
          message.error('获取用户信息失败！')
        })
        // return <Lay></Lay>
    }else{
      this.props.handleSetSecondLogin(false);
      // return <Login></Login>
    }
  }

  getLogin(){
    this.ifLogin()

    // console.log(this.ifLogin()+"88888")
    if(this.props.secondLogin == false){
      return <Login></Login>
    }else{
      return <Lay></Lay>
    }
  }
  render(){
    this.getCookie('SOFTID')
    return(
      <Fragment>
          {this.getLogin()}
      </Fragment>
    );
  }
  
}

const mapStateToProps = (state) => {
  return ({
    login:state.getIn(['login']),
    secondLogin:state.getIn(['secondLogin'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetLogin(key){
          const action = actionCreator.setLogin(key);
          dispatch(action);
      },
    handleSetPersonal(key){
        const action = actionCreator.setPersonal(key);
        dispatch(action);
    },
    handleSetTeamInfo(key){
        const action = actionCreator.setTeamInfo(key);
        dispatch(action);
    },
    handleSetSecondLogin(key){
      const action = actionCreator.setSecondLogin(key);
      dispatch(action);
    }
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(IfLogin)


