import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import { actionCreator } from '../store';

import './style.css';

import File from '../file';

import TeamInfo from '../teamInfo';


import { Layout, Menu, Button, Dropdown, Icon } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import teamInfo from '../teamInfo';
moment.locale('zh-cn');
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class Lay extends Component{

  getItem(){
    let content = null;
    switch(this.props.itemNumber){
      case '5': content = (
        <File fileId='1'></File>
      );
      break;
      case '6': content = (
        <File fileId='2'></File>
      );
      break;
      case '7': content = (
        <File fileId='3'></File>
      );
      break;
      case '8': content = (
        <File fileId='4'></File>
      );
      break;
      case '9': content = (
        <File fileId='5'></File>
      );
      break;
      case '10': content = (
        <TeamInfo />
      );
      break;
      default: content = null;
    }
    return content;
  }


  render() {

    const menu = (
      <Menu >
        <Menu.Item key="1">
          <Icon type="user" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          3rd item
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
            软件工程
          </div>

        <div className = "right-container">
          
            <Dropdown overlay={menu}>
              <div className="right-item1">         
                <svg className="right-icon1" aria-hidden="true">
                    <use xlinkHref="#icon-tongzhi"></use>
                </svg>
              </div> 
            </Dropdown>
            <Dropdown overlay={menu}>          
              <div className = "right-item2">
                <div className="lay-round">
                  方硕                
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

        <Menu style={{background:'#202d40'}}  theme="dark" mode="inline" onClick={this.props.handleSelectItem.bind(this)} defaultOpenKeys={['sub1','sub2','sub3']} defaultSelectedKeys={['10']}>
          <Menu.Item key = '0' className="lay-group">
              <svg className="group-icon" aria-hidden="true">
                <use xlinkHref="#icon-dateboard"></use>
              </svg>
              <div className="group-text">
                巴方硕的小组A
              </div>
          </Menu.Item>


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
              <Menu.Item className="sub-item" key="1">需求任务</Menu.Item>
              <Menu.Item className="sub-item" key="2">设计任务</Menu.Item>
              <Menu.Item className="sub-item" key="3">实现任务</Menu.Item>
              <Menu.Item className="sub-item" key="4">测试任务</Menu.Item>
            </SubMenu>

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
              <Menu.Item className="sub-item" key="10">项目概况</Menu.Item>
              <Menu.Item className="sub-item" key="11">项目通知</Menu.Item>
              <Menu.Item className="sub-item" key="12">成员管理</Menu.Item>
              <Menu.Item className="sub-item" key="13">项目设置</Menu.Item>
            </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{display:'flex',minHeight:'100vh' }}>

        
        <Header style={{  background: '#fff', padding: 0, height:"3rem" }} />
        <Content style={{  background:'#fff',overflow: 'initial',flexGrow:'1'}}>
          <div style={{padding: '1.5rem', textAlign: 'center'}}>
            {this.getItem()}
          </div>
        </Content>
        <Footer style={{textAlign:'center',padding:'1rem'}}>Ant Design ©2018 Created by Ant UED</Footer>

      </Layout>
    </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    itemNumber:state.getIn(['itemNumber'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSelectItem(e){
      console.log(e)
          const action = actionCreator.setItemNumber(e.key);
          dispatch(action);
      },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Lay)