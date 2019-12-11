import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import { actionCreator } from '../store';

import axios from 'axios';

import './style.css';

import TeacherGroup from '../teacherGroup'

import TeacherNotice from '../teacherNotice'

import { Layout, Menu, message, Dropdown, Icon } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
const { Header, Content, Sider } = Layout;


class Teacher extends Component{

  getItem(){
    let content = <TeacherGroup></TeacherGroup>;
    switch(this.props.itemNumber){
      case '0':
        content = <TeacherGroup></TeacherGroup>;
        break;
      case '1':
        content = <TeacherNotice></TeacherNotice>
        break;
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



componentDidMount(){
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
          <div className = "home-container">
            <svg className="home-icon" aria-hidden="true">
                <use xlinkHref="#icon-shouye1"></use>
            </svg>
          </div>

          <div className = "home-name">
            软件研发管理虚拟仿真平台
          </div>

        <div className = "right-container">
          
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
          <Menu.Item key = '10' className="lay-group">
              <svg className="group-icon" aria-hidden="true">
                <use xlinkHref="#icon-dateboard"></use>
              </svg>
              <div className="group-text">
                老师
              </div>
          </Menu.Item>
        </Menu>

        <Menu style={{background:'#202d40'}}  theme="dark" mode="inline" onClick={this.props.handleSelectItem.bind(this)} defaultOpenKeys={['sub1','sub2','sub3']} defaultSelectedKeys={['11']}>

            <Menu.Item
              className="main-item"
              key="0"
            >
              <span style={{fontSize:'1rem'}}>
                <Icon type="setting" style={{fontSize:'1rem'}}/>
                <span>小组管理</span>
              </span>
            </Menu.Item>

            <Menu.Item
              className="main-item"
              key="1"
            >
              <span style={{fontSize:'1rem'}}>
                <Icon type="notification" style={{fontSize:'1rem'}} />
                <span>通 知</span>
              </span>
            </Menu.Item>
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
    itemNumber:state.getIn(['teacherItem']),
    personal:state.getIn(['personal']),
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSelectItem(e){
      // console.log(e)
          const action = actionCreator.setTeacherItem(e.key);
          dispatch(action);
      },
    handleSetLogin(value){
      const action = actionCreator.setLogin(value);
      dispatch(action);
    }
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Teacher)