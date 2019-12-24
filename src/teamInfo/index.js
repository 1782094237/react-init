import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message, Modal, Input, Table, Divider, Tag, Collapse, Timeline } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'userName',
    key: 'userName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tags',
    key: 'identity',
    dataIndex: 'identity',
    render: identity => (
      <span>
        {
            identity.split(',').map((tag,index) => {
              let color ;
              if(tag === '普通组员'){
                color = 'geekblue'
              }
              else if (tag === '组长') {
                color = 'volcano';
              }else{
                color = 'geekblue'
              }
              if(index !== 0){
                return (
                  <Tag  className = "team-padding" color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              }

            })
        } 
      </span>
    ),
  },
];

const setting = {
  hideOnSinglePage:true
}

const getTag = (status)=>{
  let color ;
  if(status === '未开始'){
    color = 'volcano'
  }
  else if (status === '进行中') {
    color = 'geekblue';
  }else if(status === '待审核'){
    color = 'purple'
  }else{
    color = 'green'
  }
  return (
    <Tag color={color} key={status}>
      {status.toUpperCase()}
    </Tag>
  );
}




const taskColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },

  {
    title: 'Tags',
    key: 'status',
    dataIndex: 'status',
    render: status => (
      <span>
        {
          getTag(status)
        }
      </span>
    ),
  },
  {
    title: '负责人',
    dataIndex: 'workerName',
    key: 'workerName',
  },



  
];


const taskSetting = {
  hideOnSinglePage:true,
}




class TeamInfo extends Component{

  constructor(props){
    super(props)
    this.state={
      fileList:[]
    }
  }

  componentDidMount(){

    axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
    .then((resolve) => {
      // console.log("数据输出")
      // console.log(resolve.data.bigTasks[0].smallTasks)
      // let data = resolve.data.bigTasks.samllTasks;
      // resolve.data.bigTasks[0].smallTasks.reverse();
      // let data = resolve.data.bigTasks.samllTasks;
      this.props.handleSetTaskData(fromJS(resolve.data));
      // console.log("**************************")
    })
    .catch((error) => {
      message.error('获取任务信息失败！')
    })

    axios.get(localStorage.api+'team/info',{withCredentials:true})
    .then((resolve) => {
      // console.log("数据输出11111")
      // console.log(resolve.data)
      this.props.handleSetPeopleInfo(resolve.data)

    })
    .catch((error) => {
      message.error('获取小组信息失败！')
    })


    axios.get(localStorage.api+'team/myNotice',{withCredentials:true})
    .then((resolve) => {

      // console.log("数据输出11111")
      // console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetNotice(resolve.data)

    })
    .catch((error) => {
      message.error('获取通知失败！')
    })

    axios.get(localStorage.api+'/team/info',{withCredentials:true})
    .then((resolve) => {
      // console.log("数据输出11111")
      // console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetPeopleInfo(resolve.data)

    })
    .catch((error) => {
      message.error('获取任务信息失败！')
    })
  }

  getStudentTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.groupNotice.map((value,index) => {
          result.push(
                <Timeline.Item key = { value.time } className="notice-top">
                  <p><a>{value.creatorName}</a>&nbsp;&nbsp;to&nbsp;&nbsp;<a>{value.receiverName}</a>&nbsp;&nbsp;{value.time.slice(0,10)} {value.time.slice(11,19)} </p>
                  <p dangerouslySetInnerHTML={{ __html: value.content }}  />
                </Timeline.Item>
          )
        })
      }
    }
    // console.log("&&&&&&&&&&&&&&&&&&&&&&")
    // console.log(result)
    return result;

  //   <Timeline.Item >
  //   <p>陈小路 &nbsp;&nbsp; 2019-01-06 18:55</p>
  //   Create a services site 2015-09-01
  // </Timeline.Item>
  }

  getTeacherTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.teacherNotice.map((value,index) => {
          result.push(
                <Timeline.Item key = { value.time } className="notice-top">
                  <p><a>{value.creatorName}</a>&nbsp;&nbsp;to&nbsp;&nbsp;<a>{value.receiverName}</a>&nbsp;&nbsp;{value.time.slice(0,10)} {value.time.slice(11,19)} </p>
                  <p dangerouslySetInnerHTML={{ __html: value.content }}  />
                </Timeline.Item>
          )
        })
      }
    }
    // console.log("&&&&&&&&&&&&&&&&&&&&&&")
    // console.log(result)
    return result;
  }

  getMyTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.myNotice.map((value,index) => {
          result.push(
                <Timeline.Item key = { value.time } className="notice-top">
                  <p><a>{value.creatorName}</a>&nbsp;&nbsp;to&nbsp;&nbsp;<a>{value.receiverName}</a>&nbsp;&nbsp;{value.time.slice(0,10)} {value.time.slice(11,19)} </p>
                  <p dangerouslySetInnerHTML={{ __html: value.content }}  />
                </Timeline.Item>
          )
        })
      }
    }
    // console.log("&&&&&&&&&&&&&&&&&&&&&&")
    // console.log(result)
    return result;
  }

  getStatge(){
    // console.log("获取状态成功+++++++++++")
    // console.log(this.props.taskData.getIn(['bigTasks']))
    if(this.props.taskData.getIn(['bigTasks'])){
      // console.log("获取状态成功-------------")

    if(this.props.taskData.getIn(['bigTasks',0,'status']) == '进行中'){
      return 1;
    }else if(this.props.taskData.getIn(['bigTasks',1,'status']) == '进行中'){
      return 2;
    }else if(this.props.taskData.getIn(['bigTasks',2,'status']) == '进行中'){
      return 3;
    }else if(this.props.taskData.getIn(['bigTasks',3,'status']) == '进行中'){
      return 4;
    }
  }else{
    return 0;
  }
  }

  getStatgeName(name,number){
    // console.log("得到状态")
    // console.log(this.getStatge())
    if(this.getStatge() == number){
      return name+"--------进行中"
    }else if(this.getStatge() <= number){
      return name+"--------未开始"
    }else{
      return name+"--------已完成"
    }
    
  }

  render(){
    return(
      <Fragment>
        <Row>
          <Col span={16}>
          <div className="info-left">
              系统名称：
              <i className="info-title">{this.props.teamInfo.teamTitle.split("<br/>")[0].split("系统名称：")[1]}</i>
            </div>
            <div className="info-left">
             需求背景：
              <i className="info-title">{this.props.teamInfo.teamTitle.split("<br/>")[1].split("需求背景：")[1]}</i>
            </div>
            <div className="info-left">
              项目动态
            </div>
            <Timeline className="info-notice">
              {this.getTeacherTimeItem()}
            </Timeline>
            <Timeline className="info-notice">
              {this.getStudentTimeItem()}
            </Timeline>
            <Timeline className="info-notice">
              {this.getMyTimeItem()}
            </Timeline>
          </Col>
          <Col span={8}>
            <div className="info-box ">
              项目成员
              <Table rowKey="userId" showHeader={false} className="info-table" columns={columns} dataSource={this.props.peopleInfo.studentsInfo} pagination={setting} />
            </div>
            <div className="info-box">
              项目进度
              <Collapse
              className="info-list"
                bordered={false}
                defaultActiveKey={[this.getStatge()]}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel  header={"需求 —— "+this.props.taskData.getIn(['bigTasks',0,'status'])} key="1" style={customPanelStyle}>
                <Table rowKey="id" className="info-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.taskData.getIn(['bigTasks']) == null ? null : this.props.taskData.getIn(['bigTasks',0,'smallTasks']).toJS()} pagination={taskSetting} />
                </Panel>
                <Panel header={"设计 —— "+this.props.taskData.getIn(['bigTasks',1,'status'])} key="2" style={customPanelStyle}>
                <Table rowKey="id" className="info-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.taskData.getIn(['bigTasks']) == null ? null : this.props.taskData.getIn(['bigTasks',1,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
                <Panel header={"开发 —— "+this.props.taskData.getIn(['bigTasks',2,'status'])}  key="3" style={customPanelStyle}>
                <Table rowKey="id" className="info-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.taskData.getIn(['bigTasks']) == null ? null : this.props.taskData.getIn(['bigTasks',2,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
                <Panel header={"测试 —— "+this.props.taskData.getIn(['bigTasks',3,'status'])}  key="4" style={customPanelStyle}>
                <Table rowKey="id" className="info-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.taskData.getIn(['bigTasks']) == null ? null : this.props.taskData.getIn(['bigTasks',3,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => {
  return ({
    taskData:state.getIn(['taskData']),
    peopleInfo:state.getIn(['peopleInfo']),
    notice:state.getIn(['notice']),
    teamInfo:state.getIn(['teamInfo']),

    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetTaskData(key){
      const action = actionCreator.setTaskData(key);
      dispatch(action);
    },
    handleSetPeopleInfo(key){
      const action = actionCreator.setPeopleInfo(key);
      dispatch(action);
    },
    handleSetNotice(key){
      const action = actionCreator.setNotice(key);
      dispatch(action);
    },
    // handleSetFile(key){
    //       const action = actionCreator.setFile(key);
    //       dispatch(action);
    //   },
    // handleSetShowFile(key){
    //     const action = actionCreator.setShowFile(key);
    //     dispatch(action);
    // },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(TeamInfo)