import React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message, Modal, Input, Table, Divider, Tag, Collapse, Timeline, Select, Form } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');
var E = require('wangeditor')

const { Option } = Select;
let hasFu = false;


let clearEdit;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    componentDidUpdate(){
      console.log(this.props.visible)
      if(this.props.visible && !hasFu){
        setTimeout(() => {this.getEditor()})
      }
    }
    getEditor(){
      var editor2 = new E(ReactDOM.findDOMNode(this._div))
      editor2.customConfig.onchange = (html) => {
        //将html值设为form表单的desc属性值
        this.props.form.setFieldsValue({
          'desc': html
        });
      }
      editor2.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'code',  // 插入代码
        'list',  // 列表
        'justify',  // 对齐方式
    ]
      editor2.create()
      clearEdit = editor2;
      hasFu = true;
    }
    
    render() {
      const { visible, onCancel, onOk, form, data, option } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新建通知"
          okText="Create"
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form  layout="vertical">
              <Form.Item label="Gender">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                })(
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={this.handleSelectChange}
                  >
                    {option}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="需求描述">
                  {getFieldDecorator('desc', {
                    rules: [{ message: 'Please input the title of collection!' }],
                  })(<div ref = { (ref) => this._div = ref }></div>)}
              </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);



class Notice extends Component{


  newNotice(){
    this.props.handleSetNewNotice(true);
  }

  getOption(){
    const result = [<Option value='0'>全组人员</Option>];
    if(this.props.peopleInfo){
      if( this.props.peopleInfo.size !== 0){
        this.props.peopleInfo.studentsInfo.map((value,index) => {
        console.log(value)
        result.push(
        <Option value={value.userId}>{value.userName}</Option>
        )
      })
      }
    }
    return result;
  }

  
  handleOk(){
    const that = this;
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("*********************")
      console.log(values)
      
      axios.post(localStorage.api+'team/addNotice',qs.stringify({
        targetId:values.gender,
        content:values.desc
      }),{withCredentials:true}
      )
      .then(function(response){
        console.log("成功")
        console.log(response.data)
        
      axios.get(localStorage.api+'team/myNotice',{withCredentials:true})
      .then((resolve) => {
  
        console.log("数据输出11111")
        console.log(resolve.data)
        // let data = resolve.data.bigTasks.samllTasks;
        // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
  
        that.props.handleSetNotice(resolve.data)
  
      })
      .catch((error) => {
      })
      })
      .catch(function(err){
        console.log("失败")
        console.log(err)
      })

      clearEdit.txt.clear();


      form.resetFields();
      this.props.handleSetNewNotice(false)
    });



   }

  handleCancel(){
    const { form } = this.formRef.props;
    form.resetFields();
    this.props.handleSetNewNotice(false);
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  };

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
      console.log("数据输出11111")
      console.log(resolve.data)
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

    axios.get(localStorage.api+'/team/info',{withCredentials:true})
    .then((resolve) => {
      console.log("数据输出11111")
      console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetPeopleInfo(resolve.data)

    })
    .catch((error) => {
    })
  }

  getStudentTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.groupNotice.map((value,index) => {
          result.push(
                <Timeline.Item className="notice-top">
                  <p>{value.creatorName} &nbsp;&nbsp; {value.time} </p>
                    {value.content}
                </Timeline.Item>
          )
        })
      }
    }
    console.log("&&&&&&&&&&&&&&&&&&&&&&")
    console.log(result)
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
                <Timeline.Item className="notice-top">
                  <p>{value.creatorName} &nbsp;&nbsp; {value.time} </p>
                    {value.content}
                </Timeline.Item>
          )
        })
      }
    }
    console.log("&&&&&&&&&&&&&&&&&&&&&&")
    console.log(result)
    return result;
  }

  getMyTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.myNotice.map((value,index) => {
          result.push(
                <Timeline.Item className="notice-top">
                  <p>{value.creatorName} &nbsp;&nbsp; {value.time} </p>
                    {value.content}
                </Timeline.Item>
          )
        })
      }
    }
    console.log("&&&&&&&&&&&&&&&&&&&&&&")
    console.log(result)
    return result;
  }

  render(){
    return(
      <Fragment>
        <Row>
          <Col  span = {6}>
          </Col>
          <Col span = {6}></Col>
          <Col span = {6}></Col>
          <Col span = {6} style={{textAlign:'right'}}>
          <Button onClick={this.newNotice.bind(this)} className="notice-new">新建通知</Button>
          </Col>
        </Row>
        <Row>
          <Col className="notice-subTitle" span={12}>
          <h1>组内通知</h1>
            {this.getStudentTimeItem()}
          </Col>
          <Col className="notice-subTitle" span={12}>
            <h1>老师通知</h1>
            {this.getTeacherTimeItem()}
            <p style={{height:'1rem'}}></p>
            <h1>我创建的通知</h1>
            {this.getMyTimeItem()}
          </Col>
        </Row>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          visible={this.props.newNotice}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          option={this.getOption()}
        />
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => {
  return ({
    taskData:state.getIn(['taskData']),
    peopleInfo:state.getIn(['peopleInfo']),
    notice:state.getIn(['notice']),
    newNotice:state.getIn(['newNotice']),
    peopleInfo:state.getIn(['peopleInfo'])
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
    handleSetNewNotice(key){
      const action = actionCreator.setNewNotice(key);
      dispatch(action);
    },
    handleSetPeopleInfo(key){
      const action = actionCreator.setPeopleInfo(key);
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

export default connect(mapStateToProps,mapDispatchToProps)(Notice)