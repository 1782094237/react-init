import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import {  message, Modal, Input, Table,  Tag, Collapse, Form, Select } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');

const { Panel } = Collapse;
const { Option } = Select;

Array.prototype.contains = function(obj){
  let i = this.length;
  while(i--){
    if(this[i] === obj){
      return true;
    }
  }
  return false; 
}



const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    
    render() {
      const { visible, onCancel, onOk, form, data } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="编辑成员信息"
          okText="Create"
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form  layout="vertical">

                <Form.Item label="姓名">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                    initialValue:data.userName
                  })(<Input disabled />)}
                </Form.Item>
              <Form.Item label="负责人">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                  initialValue:(data.identity === undefined ? null :data.identity.split(','))
                })(
                  <Select
                    mode="multiple"
                    placeholder="Select a option and change input text above"
                    // onChange={this.handleSelectChange}
                  >
                    <Option value="需求负责人">需求负责人</Option>
                    <Option value="设计负责人">设计负责人</Option>
                    <Option value="实现负责人">实现负责人</Option>
                    <Option value="测试负责人">测试负责人</Option>
                  </Select>,
                )}
              </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

const setting = {
  disabled:true,
  hideOnSinglePage:true
}

class TeamPeople extends Component{
  componentDidMount(){

    axios.get(localStorage.api+'team/info',{withCredentials:true})
    .then((resolve) => {
      // console.log("数据输出11111")
      // console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
      this.props.handleSetPeopleInfo(resolve.data)
      // console.log("^^^^^^^^^^^^^^^^^^^^")
      // console.log(this.props.peopleInfo.studentsInfo)
    })
    .catch((error) => {
      message.error('获取小组信息失败！')
    })

  }

  selectTable(record,rowkey){
    this.props.handleSetPeople(true);
    this.props.handleSetPeopleSmall(record);



  }
  render(){
//     identity: "普通组员"
// userClass: "zy1602"
// userCollege: "计算机科学与技术学院"
// userId: "0121610870807"
// userName: "陈小路"
// userProfessional: "计算机科学与技术"
// userSex: "男"
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
        render:identity => (
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
                  <Tag className="people-padding" color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              }
            })
            }
          </span>
        ),
      },
      {
        title: 'Class',
        dataIndex: 'userClass',
        key: 'userClass',
      },  
      {
        title: 'Edit',
        key: 'edit',
        render: (text, record) => {
          if(this.props.personal.identity.contains("组长")){
            return <a>编辑</a>
          }else{
            return <a>无权限</a>
          }
        },
      },
    ];
    return(
      <Fragment>
        <Table columns={columns} pagination={setting} dataSource={this.props.peopleInfo.studentsInfo}
           onRow={(record,rowkey)=>{
             if(this.props.personal.identity.contains("组长")){
               return {
                 onClick : this.selectTable.bind(this,record,rowkey)
               }
             }else{
               return {}
             }   
           }}
        />


        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          visible={this.props.changePeople}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          data={this.props.peopleSmall}
        />


      </Fragment>
      )
  }
  handleOk(){
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log('Received values of form: ', values);
      // console.log(values.gender.join(','))
      // console.log(this.props.peopleSmall)
      const taskId=[];
      values.gender.map((value,index) => {
        switch(value){
          case '需求负责人':
            taskId.push(1)
            break;
          case '设计负责人':
            taskId.push(2)
            break;
          case '实现负责人':
            taskId.push(3)
            break;
          case '测试负责人':
            taskId.push(4)
            break;
        }
      })
      // console.log(taskId.join(','))
      const that = this;

      axios.post(localStorage.api+'team/bigWorker',qs.stringify({
        workerId:this.props.peopleSmall.userId,
        taskIdStr:taskId.join(',')
      }),{withCredentials:true}
      )
      .then(function(response){
        message.success('更改权限成功！')
        // console.log("成功")
        // console.log(response.data)
        axios.get(localStorage.api+'team/info',{withCredentials:true})
        .then((resolve) => {
          // console.log("数据输出11111")
          // console.log(resolve.data)
          // let data = resolve.data.bigTasks.samllTasks;
          // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
          that.props.handleSetPeopleInfo(resolve.data)
        })
        .catch((error) => {
          message.error('获取小组信息失败！')
        })
      })
      .catch(function(err){
        // console.log("失败")
        // console.log(err)
        message.error('更改权限失败！')
      })
      form.resetFields();
      this.props.handleSetPeople(false)
    });
  }
  handleCancel(){
    const { form } = this.formRef.props;
    form.resetFields();
    this.props.handleSetPeople(false);
  }
  saveFormRef(formRef){
    this.formRef = formRef;
  };

}

const mapStateToProps = (state) => {
  return ({
    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
    changePeople:state.getIn(['changePeople']),
    peopleInfo:state.getIn(['peopleInfo']),
    peopleSmall:state.getIn(['peopleSmall']),
    personal:state.getIn(['personal'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetPeople(key){
      const action = actionCreator.setChangePeople(key);
      dispatch(action);
  },
  handleSetPeopleInfo(key){
    const action = actionCreator.setPeopleInfo(key);
    dispatch(action);
  },
  handleSetPeopleSmall(key){
    const action = actionCreator.setPeopleSmall(key);
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

export default connect(mapStateToProps,mapDispatchToProps)(TeamPeople)