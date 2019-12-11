import React,{ Component, Fragment,PureComponent } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import qs from 'qs'

import './style.css';

import { actionCreator } from '../store';

import {  Button, Icon,Form, Input, Modal, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');
const{ confirm } = Modal;




const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, data, onCreate, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="请输入邮箱以激活账号"
          onCancel={onCancel}
          onOk={onCreate}
          okText="确认"
          cancelText="取消"
        >
          <Form layout="vertical">
            
          <Form.Item label="请输入邮箱:">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '这不是一个有效的邮箱！',
                  },
                  {
                    required: true,
                    message: '请输入邮箱！',
                  },
                ],
              })(<Input />)}
          </Form.Item>

          </Form>
        </Modal>
      );
    }
  },
);

class LoginForm extends Component{

//登陸
  getLogin(values,mail){
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
        that.props.handleSetLoginValue(values);
        postData = {          
          userAccount:values.username,
          userPassword:values.password
        }
      }        
      axios.post(localStorage.api+'login',qs.stringify(postData),{withCredentials:true})
      .then(function(response){
        // console.log(response)
        if(response.data.key == 0 && response.data.mes == "请输入邮箱以激活账号"){
          //激活
          that.props.handleSetLoginVisible(true);
        }else if(response.data.key == 0){
          //账号密码错误
                    // confirm({
                    //   title: '登陆失败',
                    //   content: <div><br/><p>账号或密码错误！</p></div>,
                    //   okText: '确认',
                    //   cancelText: '取消',
                    //   onOk() {
                    //   },
                    //   onCancel() {},
                    // });
                    message.error("账号或密码错误！")
        }else{
          //登陆成功
          that.props.handleSetLogin(1);
          message.success('登陆成功！');


          axios.get(localStorage.api+'userMes',{withCredentials:true})
          .then((response) => {
    
              if(response.data.role == "学生"){

              }else{
                //老师
                that.props.handleSetTeacherId({
                  userAccount:values.username,
                  userPassword:values.password
                })
              }
  
            }) 
            .catch((error) => {
              message.error('获取用户信息失败！')
            })




        }
      })
      .catch(function(err){
        message.error('登陆失败！');
        // that.props.handleSetLogin(1);
      })
  }

//處理登录表單
  handleSubmit = e => {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        that.getLogin.call(that,values);
      }
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCreate(){
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.getLogin(this.props.loginValue,values.email)

      form.resetFields();
      this.props.handleSetLoginVisible(false);
    });
  }

  handleCancle(){
    this.props.handleSetLoginVisible(false);
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <div className="login-title">软件研发管理虚拟仿真平台</div>
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
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          visible={this.props.loginVisible}
          data={this.props.loginValue}
          onCancel={this.handleCancle.bind(this)}
          onCreate={this.handleCreate.bind(this)}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    personal:state.getIn(['personal']),
    teamInfo:state.getIn(['teamInfo']),
    loginValue:state.getIn(['loginValue']),
    loginVisible:state.getIn(['loginVisible'])
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
    },
    handleSetLoginValue(key){
      const action = actionCreator.setLoginValue(key);
      dispatch(action);
    },
    handleSetLoginVisible(key){
        // console.log("这里")
        const action = actionCreator.setLoginVisible(key);
        dispatch(action);
    },
    handleSetTeacherId(key){
      const action = actionCreator.setTeacherId(key);
      dispatch(action);
    }
    
  })
}

const Login = Form.create({ name: 'horizontal_login' })(LoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(Login)