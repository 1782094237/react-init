import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message, Modal, Input, Table, Divider, Tag, Collapse } from 'antd';
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
  render(){
    return(
      <Fragment>
        <Row>
          <Col span={16}>
            <div className="info-left">
              项目动态
            </div>
          </Col>
          <Col span={8}>
            <div className="info-box info-title">
              项目成员
              <Table showHeader={false} className="info-table" columns={columns} dataSource={data} pagination={setting} />
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
    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
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