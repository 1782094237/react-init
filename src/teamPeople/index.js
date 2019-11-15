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
        {
        tags.map(tag => {
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
        })
        }
      </span>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },  
  {
    title: 'Edit',
    key: 'edit',
    render: (text, record) => (
        <a>编辑</a>
    ),
  },
];

const data = [
  {
    name: '巴方硕',
    tags: ['组长'],
    email: '17820952@qq.com',
    edit: 'New York No. 1 Lake Park',

  },
  {
    name: '何金超',
    tags: ['开发负责人'],
    email: '17820952@qq.com',
    edit: 'New York No. 1 Lake Park',
  },
  {
    name: '陈小路',
    tags: ['组员'],
    email: '17820952@qq.com',
    edit: 'New York No. 1 Lake Park',
  },
];
const setting = {
  disabled:true,
  hideOnSinglePage:true
}

class TeamPeople extends Component{
  render(){
    return(
      <Fragment>
        <Table columns={columns} dataSource={data} pagination={setting} />
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

export default connect(mapStateToProps,mapDispatchToProps)(TeamPeople)