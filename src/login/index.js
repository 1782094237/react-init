import React,{ Component, Fragment,PureComponent } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import qs from 'qs'

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon,Form, Input, Checkbox, Modal } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');
const{ confirm } = Modal;

class LoginForm extends Component{

//登陸
  getLogin(err,values,mail){
    const that = this;
//后端 登录接口
      let postData;
      if(mail){
        postData = {          
          userAccount:values.username,
          userPassword:values.password,
          userEmail: mail
        }
      }else{
        postData = {          
          userAccount:values.username,
          userPassword:values.password
        }
      }        
      axios.post(localStorage.api+'login',qs.stringify(postData),{withCredentials:true})
      .then(function(response){
        if(response.data.key == 0 && response.data.errorInfo == "请输入邮箱以激活账号"){
          //激活
          const { getFieldDecorator } = this.props.form;
                    confirm({
                      title: '请输入邮箱以激活账号',
                      content: 
                      <Form>
                         <Form.Item>
                          {getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                              },
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ],
                          })(
                            <Input
                              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="Email"
                              id="mail"
                            />,
                          )}
                        </Form.Item>
                      </Form>                      
                      ,
                      onOk() {
                        that.getLogin.call(that,err,values,document.getElementById("mail").value)
                      },
                      onCancel() {},
                    });
        }else if(response.data.key == 0){
          //账号密码错误
                    confirm({
                      title: '登陆失败',
                      content: <div><br/><p>账号或密码错误！</p></div>,
                      onOk() {
                      },
                      onCancel() {},
                    });
        }else{
          //登陆成功
          console.log("登錄成功")
          console.log("333333333333333333333")
          that.props.handleSetLogin(1);


          // axios.get(localStorage.api+'team/info',{withCredentials:true})
          // .then((resolve) => {
          //   console.log("获取信息成功33333333333333333333333")
          //   that.props.handleSetTeamInfo(resolve.data.teamInfo)
          //   let result = {};
          //   for(let i = 0 ; i < resolve.data.studentsInfo.length; i++){
          //     console.log("123"+response.data.userMap.id)
          //     if(response.data.userMap.id == resolve.data.studentsInfo[i].userId){


          //       result = {
          //         id:response.data.userMap.id,
          //         name:response.data.userMap.userName,
          //         class:response.data.userMap.userClass,
          //         identity:resolve.data.studentsInfo[i].identity.split(',')
          //       }
          //       that.props.handleSetPersonal(result);
          //       break;
          //     }
          //   }
      
          // })
          // .catch((error) => {
          //   console.log("获取信息失敗3333333333333333333")
          //   console.log(error)
          // })
        }
      })
      .catch(function(err){
        console.log("登錄失敗")
        console.log(err)
        // that.props.handleSetLogin(1);
      })
  }

//處理登录表單
  handleSubmit = e => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        that.getLogin.call(that,err,values);
      }
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <div className="login-title">软件工程</div>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入学号!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="学 号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="首次登陆密码默认为学号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(LoginForm);

const mapStateToProps = (state) => {
  return ({
    personal:state.getIn(['personal']),
    teamInfo:state.getIn(['teamInfo'])
    // itemNumber:state.getIn(['header','itemNumber'])
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
    }
    
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)