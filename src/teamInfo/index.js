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
import Axios from 'axios';
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
        {identity.split(',').map(tag => {
          let color ;
          if(tag === '组员'){
            color = 'geekblue'
          }
          else if (tag === '组长') {
            color = 'volcano';
          }else{
            color = 'green'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })} 
      </span>
    ),
  },
];

const data = [ 
  {
    name: '巴方硕',
    tags: ['组长'],
  },
  {

    name: '陈小路',

    tags: ['开发负责人'],
  },
  {

    name: '何金超',

    tags: ['组员'],
  },

];
const setting = {
  disabled:true,
  hideOnSinglePage:true
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
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color ;
          if(tag === '已完成'){
            color = 'geekblue'
          }
          else if (tag === '未开始') {
            color = 'volcano';
          }else{
            color = 'green'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'People',
    dataIndex: 'people',
    key: 'people',
    render: text => <a>{text}</a>,
  },
];

const taskData = [
  {

    name: '任务1',
    people:"巴方硕",
    tags: ['已完成'],
  },
  {

    name: '任务2',
    people:"巴方硕",
    tags: ['进行中'],
  },
  {

    name: '任务3',
    people:"巴方硕",
    tags: ['未开始'],
  },

];
const taskSetting = {
  disabled:true,
  hideOnSinglePage:true,
}










class TeamInfo extends Component{
  componentDidMount(){

    axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
    .then((resolve) => {
      console.log("数据输出")
      console.log(resolve.data.bigTasks[0].smallTasks)
      // let data = resolve.data.bigTasks.samllTasks;
      this.props.handleSetTaskData(resolve.data)
      console.log("**************************")
      console.log(this.props.taskData.bigTasks[0].smallTasks)
    })
    .catch((error) => {

    })

    axios.get(localStorage.api+'team/info',{withCredentials:true})
    .then((resolve) => {
      // identity: "普通组员"
      // userClass: "zy1602"
      // userCollege: "计算机科学与技术学院"
      // userId: "0121610870807"
      // userName: "陈小路"
      // userProfessional: "计算机科学与技术"
      // userSex: "男"
      console.log("数据输出11111")
      console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetPeopleInfo(resolve.data)

    })
    .catch((error) => {
    })


    axios.get(localStorage.api+'team/myNotice',{withCredentials:true})
    .then((resolve) => {

      console.log("数据输出11111")
      console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetNotice(resolve.data)

    })
    .catch((error) => {
    })
  }
  render(){
    return(
      <Fragment>
        <Row>
          <Col span={16}>
          <div className="info-title">
              软件工程项目名称
            </div>
            <div className="info-left">
              项目动态
            </div>
            <Timeline className="info-notice">
              <Timeline.Item >
                <p>陈小路 &nbsp;&nbsp; 2019-01-06 18:55</p>
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
            <Timeline className="info-notice">
              <Timeline.Item >
                <p>何业兰 &nbsp;&nbsp; 2019-01-06 18:55</p>
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </Col>
          <Col span={8}>
            <div className="info-box info-title">
              项目成员
              <Table showHeader={false} className="info-table" columns={columns} dataSource={this.props.peopleInfo.studentsInfo} pagination={setting} />
            </div>
            <div className="info-box">
              项目进度
              <Collapse
              className="info-list"
                bordered={false}
                defaultActiveKey={['2']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel  header="需求&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已完成" key="1" style={customPanelStyle}>
                </Panel>
                <Panel header="设计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进行中" key="2" style={customPanelStyle}>
                <Table className="info-panel-table" showHeader={false}  columns={taskColumns} dataSource={taskData} pagination={taskSetting} />
                </Panel>
                <Panel header="开发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未开始" key="3" style={customPanelStyle}>
                  <p>开发</p>
                </Panel>
                <Panel header="测试&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未开始" key="4" style={customPanelStyle}>
                  <p>测试</p>
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
    notice:state.getIn(['notice'])
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