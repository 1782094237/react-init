import React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS,toJS} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import {  Button, Row, Col, message, Modal, Timeline, Select, Form, Table, Collapse, Icon, Tag, Upload,  Descriptions } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
var E = require('wangeditor')
var download2 = require('../static/download2.js')

const { Option } = Select;
const { Panel } = Collapse;
const { confirm } = Modal;



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


class TeacherGroup extends Component{

  constructor(props){
    super(props)
    this.state={
      fileList:[]
    }
  }

  componentDidMount(){
    const that = this;

    axios.get(localStorage.api+'teacher/allGroups',{withCredentials:true})
      .then(function(response){
        // console.log("获取文件成功77777")
        // console.log(response.data)
        // console.log("********************")
        // console.log(response)
        that.props.handleSetTeacherGroup(fromJS(response.data))
      })
      .catch(function(err){
        // console.log("获取文件失败")
        // console.log(err)
        message.error('获取小组信息失败！')
      })

  }

  handleChange(info){
    const that = this;
 
     // console.log("执行")
     let fileList = [...info.fileList];
     // 1. Limit the number of uploaded files
     // Only to show two recent uploaded files, and old ones will be replaced by the new
     fileList = fileList.slice(-1);
 
 
     this.setState({ fileList });
 
 
     if (info.file.status !== 'uploading') {
       // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
       // console.log(info.file)
       // console.log(info.fileList);
     }
     if (info.file.status === 'done') {
 
      //  if(info.file.response.key != 1){
      //      message.error(`${info.file.name} 上传失败.`);
      //  }else{
         // console.log("完成")
         message.success(`${info.file.name} file uploaded successfully`);
      //  }
     } else if (info.file.status === 'error') {
       // console.log("失败")
       message.error(`${info.file.name} file upload failed.`);
     }
   
  }

  inGroup(id){
    console.log(id)
    const that = this;
    axios.post(localStorage.api+'teacher/teamAccount',qs.stringify(id),{withCredentials:true})
    .then(function(response){
      console.log(response.data.id)
      that.lgout();
      let postData = {          
        userAccount:response.data.id,
        userPassword:response.data.id
      }

      axios.post(localStorage.api+'login',qs.stringify(postData),{withCredentials:true})
      .then(function(response){
        // console.log(response)
        if(response.data.key == 0){
          //账号密码错误
          message.error("账号或密码错误！")
        }else{
          //登陆成功
          that.props.handleSetTeacherToStudent(true);
          that.props.handleSetLogin(1);
          message.success('登陆成功！');
        }
      })
      .catch(function(err){
        message.error('登陆失败！');
        // that.props.handleSetLogin(1);
      })
        
      })
      .catch(function(err){
        message.error('获取账号失败！');
        // that.props.handleSetLogin(1);
      })
    






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

  getItem(){
    let result = [];
    if(this.props.teacherGroup.getIn(['groups'])){
    for(let i = 0; i<this.props.teacherGroup.getIn(['groups']).size; i++){
      result.push(
      <Row className="teacher-row">
          <Col className="teacher-col" span = {8}>
          <Descriptions
            bordered
            column={1}
          >
            <Descriptions.Item label="小组名称">{this.props.teacherGroup.getIn(['groups',i,'teamInfo','teamName'])}</Descriptions.Item>
            <Descriptions.Item label="小组组长">{this.props.teacherGroup.getIn(['groups',i,'teamInfo','leaderName'])}</Descriptions.Item>
            <Descriptions.Item label="任务阶段">{this.props.teacherGroup.getIn(['groups',i,'teamInfo','nowTask'])}</Descriptions.Item>
            <Descriptions.Item label="详细信息"><a onClick={this.inGroup.bind(this,this.props.teacherGroup.getIn(['groups',i,'teamInfo','teamId']))}>进入小组</a></Descriptions.Item>
          </Descriptions>
          </Col>
          <Col className="teacher-col" span = {8}>
            <div className="teacher-box">
              项目进度
              <Collapse
              className="teacher-list"
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel  header={"需求 —— "+this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',0,'status'])} key="1" style={customPanelStyle}>
                <Table className="teacher-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks']) == null ? null : this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',0,'smallTasks']).toJS()} pagination={taskSetting} />
                </Panel>
                <Panel header={"设计 —— "+this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',1,'status'])} key="2" style={customPanelStyle}>
                <Table className="teacher-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks']) == null ? null : this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',1,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
                <Panel header={"开发 —— "+this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',2,'status'])}  key="3" style={customPanelStyle}>
                <Table className="teacher-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks']) == null ? null : this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',2,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
                <Panel header={"测试 —— "+this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',3,'status'])}  key="4" style={customPanelStyle}>
                <Table className="teacher-panel-table" showHeader={false}  columns={taskColumns} dataSource={this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks']) == null ? null : this.props.teacherGroup.getIn(['groups',i,'taskInfo','bigTasks',3,'smallTasks']).toJS()} pagination={taskSetting} />

                </Panel>
              </Collapse>
            </div>
          </Col>
          <Col className="teacher-col" span = {8}>
            <div className="teacher-box ">
              项目成员
              <Table showHeader={false} className="teacher-table" columns={columns} dataSource={this.props.teacherGroup.getIn(['groups']) ? this.props.teacherGroup.getIn(['groups',i,'studentsInfo']).toJS() : null} pagination={setting} />
            </div>
          </Col>
        </Row>
      )
    }

  }
    return result;
  }

  download(){

      axios({
          method: 'POST',
          url: localStorage.api+'teacher/getRecordExcel',
          responseType: 'blob',
          withCredentials:true
      }).then((res) =>{

        download2(res.data,"学生信息");

      }).catch(err=>{
          message.error("下载文件失败！")
      })

  }

  render(){

    const that = this;
    const props = {
      name: 'excelFile',
      action: localStorage.api+'teacher/updateExcel',
      withCredentials:'true',
      showUploadList:{ showPreviewIcon: false, showRemoveIcon: false, showDownloadIcon: false },
      data:{
        key:1,
      },
      onChange: this.handleChange.bind(this),
      beforeUpload(file){  
        let key = 0;
        
        // application/vnd.ms-excel
        // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        if(file.type == "application/vnd.ms-excel" || file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
          // confirm({
          //   content: <p>上传信息将会覆盖以前的信息，是否确认上传？</p>,
          //   onOk() {
          //     key = 1;
          //   },
          //   onCancel() {
          //     key = 0;
          //   },
          //   okText:"确认",
          //   cancelText:"取消"
          // });
          alert("上传信息将会覆盖以前的信息，是否确认上传？")
          return true;

        }else{
          message.error("只支持上传表格文件！")
        }
        return false;
      },
      headers: {
        authorization: 'authorization-text',
      },
    };

    return(
      <Fragment>
        <div className="teacher-button">
          <Row>
            <Col span="12"><Button onClick={this.download.bind(this)} className="teacher-up-file">下载信息</Button></Col>
            <Col span="12">
              <Upload  {...props} fileList={this.state.fileList} >
                <Button style={{display:'inline'}} className="teacher-up-file" type="primary">上传信息</Button>
              </Upload>
            </Col>
          </Row>
        </div>
        { this.getItem() }
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => {
  return ({
    teacherGroup:state.getIn(['teacherGroup'])
    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetTeacherGroup(key){
      const action = actionCreator.setTeacherGroup(key);
      dispatch(action)
    },
    handleSetLogin(key){
      const action = actionCreator.setLogin(key);
      dispatch(action)
    },
    handleSetTeacherToStudent(key){
      const action = actionCreator.setTeacherToStudent(key);
      dispatch(action)
    }
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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherGroup)