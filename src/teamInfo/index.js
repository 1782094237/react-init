import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message, Modal, Input, Table, Divider, Tag } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');


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
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
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

    name: 'John Brown',

    tags: ['nice', 'developer'],
  },
  {

    name: 'Jim Green',

    tags: ['loser'],
  },

];
const setting = {
  disabled:true,
  hideOnSinglePage:true
}

class TeamInfo extends Component{
  render(){
    return(
      <Fragment>
        <Row>
          <Col span={18}>
            <div className="info-left">
              项目动态
            </div>
          </Col>
          <Col span={6}>
            <div className="info-box info-title">
              项目成员
              <Table columns={columns} dataSource={data} pagination={setting} />
                <Row >

                  <Col className="info-name" span={12}>
                    巴方硕
                  </Col>


                  <Col className="info-ident" span={12}>组长</Col>



                </Row>
                <Row >
                  <Col span={12}>巴方硕</Col>
                  <Col span={12}>组长</Col>
                </Row>
            </div>
            <div className="info-box">
              项目进度
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