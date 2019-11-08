import React,{ Component, Fragment,PureComponent } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import { actionCreator } from '../layout/store';
import './style.css';
import qs from 'qs'
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

//登录
  handleSubmit = e => {
    function getLogin(err,values,mail){
      const that = this;
      console.log('Received values of form: ', values);
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
        axios.post('http://27y6v05022.wicp.vip:40292/login',qs.stringify(postData),{withCredentials:true})
        .then(function(response){
          if(response.data.key == 0 && response.data.errorInfo == "请输入邮箱以激活账号"){
            console.log(response)
            //激活
                      confirm({
                        title: '请输入邮箱以激活账号',
                        content: <div><br/><Input id="mail" placeholder="Basic usage" /></div>,
                        onOk() {
                          getLogin.call(that,err,values,document.getElementById("mail").value)
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
            that.props.handleSetLogin(1);
          }
        })
        .catch(function(err){
          console.log(err)
          that.props.handleSetLogin(1);
        })
    }
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        getLogin.call(that,err,values);
      }
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <div className="title">软件工程</div>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox className="rember">Remember me</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
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
    // itemNumber:state.getIn(['header','itemNumber'])
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

export default connect(mapStateToProps,mapDispatchToProps)(Login)