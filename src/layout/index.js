import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import { actionCreator } from '../store';
import qs from 'qs';

import axios from 'axios';

import './style.css';

import {fromJS, toJS, getIn} from 'immutable';

import Task from '../task'

import Task_1 from '../task_1'

import Task_2 from '../task_2'

import Task_3 from '../task_3'



import File from '../file';

import File_1 from '../file_1';

import File_2 from '../file_2';

import File_3 from '../file_3';

import File_4 from '../file_4';

import File_5 from '../file_5';

import TeamInfo from '../teamInfo';

import TeamPeople from '../teamPeople';

import Notice from '../notice'


import { Layout, Menu, message, Dropdown, Icon } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Lay extends Component{

  getItem(){
    let content = <TeamInfo />;
    switch(this.props.itemNumber){
      case '1': content = (
        <Task></Task>
      );
      break;
      case '2': content = (
        <Task_1></Task_1>
      )
      break;
      case '3': content = (
        <Task_2></Task_2>
      );
      break;
      case '4': content = (
        <Task_3></Task_3>
      )
      break;
      case '5': content = (
        <File fileId='1'></File>
      );
      break;
      case '6': content = (
        <File_1 fileId='2'></File_1>
      );
      break;
      case '7': content = (
        <File_2 fileId='3'></File_2>
      );
      break;
      case '8': content = (
        <File_3 fileId='4'></File_3>
      );
      break;
      case '9': content = (
        <File_4 fileId='5'></File_4>
      );
      break;
      case '10': content = (
        <File_5 ></File_5>
      );
      break;
      case '11': content = (
        <TeamInfo />
      );
      break;
      case '12': content =(
        <Notice></Notice>
      )
      break;
      case '13': content = (
        <TeamPeople />
      );
      break;
      default: content = <TeamInfo />;
    }
    return content;
  }

  getName(){
    // console.log("&&&&&&&&&&&&&&&&^^^^^^^^^^^^^")
    // console.log(this.props.personal.name)
    if(this.props.personal.name){
      if (this.props.personal.name.length ==2){
        return this.props.personal.name
      }else{
        return this.props.personal.name.slice(this.props.personal.name.length-2,this.props.personal.name.length)
      }
    }
    return "?"
  }

  getSubItem(){
    

    if(this.props.teamInfo.nowTask){
      // console.log("获取状态成功")
      // console.log(this.props.taskData)
      if(this.props.taskData){


          return (
            <SubMenu
            className="main-item"
            key="sub1"
            title={
              <span  style={{fontSize:'1rem'}}>
                <Icon type="profile" style={{fontSize:'1rem'}} />
                <span>任务管理</span>
              </span>
            }
          >
              <Menu.Item className="sub-item" key="1" disabled={this.props.taskData.getIn(['bigTasks',0,'status']) =="未开始"?true:false} >需求任务 —— {this.props.taskData.getIn(['bigTasks',0,'status'])}</Menu.Item>
              <Menu.Item className="sub-item" key="2" disabled={this.props.taskData.getIn(['bigTasks',1,'status']) =="未开始"?true:false}>设计任务 —— {this.props.taskData.getIn(['bigTasks',1,'status'])}</Menu.Item>
              <Menu.Item className="sub-item" key="3" disabled={this.props.taskData.getIn(['bigTasks',2,'status']) =="未开始"?true:false}>实现任务 —— {this.props.taskData.getIn(['bigTasks',2,'status'])}</Menu.Item>
              <Menu.Item className="sub-item" key="4" disabled={this.props.taskData.getIn(['bigTasks',3,'status']) =="未开始"?true:false}>测试任务 —— {this.props.taskData.getIn(['bigTasks',3,'status'])}</Menu.Item>
            </SubMenu>
          );
    }
  }
}

componentDidMount(){
      //获取所有任务，刷新任务
      axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
      .then((resolve) => {
        // console.log("数据输出888888888888888888888888888")
        // resolve.data.bigTasks[0].smallTasks.reverse();
        // console.log(resolve.data)
        // console.log(resolve.data.bigTasks[0].smallTasks)

        // let data = resolve.data.bigTasks.samllTasks;
        this.props.handleSetTaskData(fromJS(resolve.data));
        // console.log(this.props.taskData.bigTasks[0].smallTasks)
        // console.log(this.props.taskData.getIn(['bigTasks',0,'smallTasks']))
      })
      .catch((error) => {
        message.error('获取任务信息失败！')
      })
}

lgout(){
  axios.get(localStorage.api+"logout",{withCredentials:true})
    .then((resolve) => {
      this.props.handleSetLogin(0)
      message.success('注销成功！')
    })
    .catch((error) => {
      message.error('注销失败！')
    })
}

backHome(){
  const that = this;
  if(this.props.teacherToStudent){
    this.lgout();
    let postData = {
      userAccount:this.props.teacherId.userAccount,
      userPassword:this.props.teacherId.userPassword
    }

    axios.post(localStorage.api+'login',qs.stringify(postData),{withCredentials:true})
    .then(function(response){
      // console.log(response)
      if(response.data.key == 0){
        //账号密码错误
        message.error("账号或密码错误！")
      }else{
        //登陆成功
        that.props.handleSetTeacherToStudent(false);
        that.props.handleSetLogin(1);
        // message.success('登陆成功！');
      }
    })
    .catch(function(err){
      message.error('登陆失败！');
      // that.props.handleSetLogin(1);
    })

  }
}

lgout(){
  axios.get(localStorage.api+"logout",{withCredentials:true})
    .then((resolve) => {
      this.props.handleSetLogin(0)
      // message.success('注销成功！')
    })
    .catch((error) => {
      message.error('注销失败！')
    })
}


  render() {


    const menu = (
      <Menu onClick={this.lgout.bind(this)}>
        <Menu.Item key="1">
          <Icon type="user" />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return(
      <Layout >
        <div className = "lay-container  web-font">
          <div onClick={this.backHome.bind(this)} className = "home-container">
            <svg className="home-icon" aria-hidden="true">
                <use xlinkHref="#icon-shouye1"></use>
            </svg>
          </div>

          <div className = "home-name">
            软件研发管理虚拟仿真平台
          </div>

        <div className = "right-container">
          
            {/* <Dropdown overlay={menu}>
              <div className="right-item1">         
                <svg className="right-icon1" aria-hidden="true">
                    <use xlinkHref="#icon-tongzhi"></use>
                </svg>
              </div> 
            </Dropdown> */}
            <Dropdown overlay={menu}>          
              <div className = "right-item2">
                <div className="lay-round">
                  {
                    this.getName()
                  }                
                </div>
                <svg className="right-icon2" aria-hidden="true">
                    <use xlinkHref="#icon-un-sortbydown-o"></use>
                </svg>
              </div>
            </Dropdown>      
          
        </div>
        </div>
      <Sider
        className="lay-sider"
      >

        <Menu style={{background:'#202d40'}}  theme="dark" mode="inline" onClick={this.props.handleSelectItem.bind(this)} defaultOpenKeys={['sub1','sub2','sub3']} defaultSelectedKeys={['11']}>
          <Menu.Item key = '0' className="lay-group">
              <svg className="group-icon" aria-hidden="true">
                <use xlinkHref="#icon-dateboard"></use>
              </svg>
              <div className="group-text">
                {
                  this.props.teamInfo ? this.props.teamInfo.teamName : null
                }
              </div>
          </Menu.Item>



            {
                this.getSubItem()
            }
            <SubMenu
              className="main-item"
              key="sub2"
              title={
                <span style={{fontSize:'1rem'}}>
                  <Icon type="cloud-upload" style={{fontSize:'1rem'}} />
                  <span>文件管理</span>
                </span>
              }
            >
              <Menu.Item className="sub-item" key="5">源代码</Menu.Item>
              <Menu.Item className="sub-item" key="6">需求文档</Menu.Item>
              <Menu.Item className="sub-item" key="7">设计文档</Menu.Item>
              <Menu.Item className="sub-item" key="8">实现文档</Menu.Item>
              <Menu.Item className="sub-item" key="9">测试文档</Menu.Item>
              <Menu.Item className="sub-item" key="10">其他文档</Menu.Item>
            </SubMenu>

            <SubMenu
              className="main-item"
              key="sub3"
              title={
                <span style={{fontSize:'1rem'}}>
                  <Icon type="setting" style={{fontSize:'1rem'}}/>
                  <span>设置</span>
                </span>
              }
            >
              <Menu.Item className="sub-item" key="11">项目概况</Menu.Item>
              <Menu.Item className="sub-item" key="12">项目通知</Menu.Item>
              <Menu.Item className="sub-item" key="13">成员管理</Menu.Item>
            </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ background: '#fff',display:'flex',height:'100vh' }}>

        
        <Header style={{   padding: 0, height:"3rem" }} />
        <Content style={{  background:'#fff',overflow: 'initial',flexGrow:'1'}}>
          <div style={{padding: '1.5rem', textAlign: 'center'}}>
            {this.getItem()}
          </div>
        </Content>

      </Layout>
    </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    itemNumber:state.getIn(['itemNumber']),
    personal:state.getIn(['personal']),
    teamInfo:state.getIn(['teamInfo']),
    taskData:state.getIn(['taskData']),
    login:state.getIn(['login']),
    teacherId:state.getIn(['teacherId']),
    teacherToStudent:state.getIn(['teacherToStudent'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSelectItem(e){
      // console.log(e)
          const action = actionCreator.setItemNumber(e.key);
          dispatch(action);
      },
    handleSetTaskData(value){
      const action = actionCreator.setTaskData(value);
      dispatch(action);
    },
    handleSetLogin(value){
      const action = actionCreator.setLogin(value);
      dispatch(action);
    },
    handleSetTeacherToStudent(value){
      const action = actionCreator.setTeacherToStudent(value);
      dispatch(action);
    }
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Lay)