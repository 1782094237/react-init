import React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import {  Button, Row, Col, message, Modal, Timeline, Select, Form } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
var E = require('wangeditor')

const { Option } = Select;
let hasFu = false;
let editor = false;


let clearEdit;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    componentWillUnmount(){
      editor = false;
      // editor_1 = false;
    }
    getEditor(){
      // console.log("获取富文本"+editor)
      if(editor){

      }else{
        editor = new E(ReactDOM.findDOMNode(this._div))

        editor.customConfig.onchange = (html) => {
          //将html值设为form表单的desc属性值
          // console.log("输出html***************************************************"+editor.txt.html())
          // console.log(editor.txt.html())
          this.props.form.setFieldsValue({
            'desc': html
          });
        }
        

        editor.customConfig.menus = [
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
        editor.create()
        clearEdit = editor;
        hasFu = true;
      }

    }
    componentDidUpdate(){
      // console.log()
      if(this.props.visible && !hasFu){
        setTimeout(() => {this.getEditor()})
      }
    }
    
    render() {
      const { visible, onCancel, onOk, form, data, option } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新建通知"
          okText="创建"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form  layout="vertical">
              <Form.Item label="通知对象">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: '请选择通知对象！' }],
                })(
                  <Select
                    placeholder="请选择通知对象"
                    // onChange={this.handleSelectChange}
                  >
                    {option}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="通知内容">
                  {getFieldDecorator('desc', {
                    rules: [{ message: '请输入通知内容！' }],
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
    const result = [<Option key = '0' value='0'>全组人员</Option>];
    if(this.props.peopleInfo){
      if( this.props.peopleInfo.size !== 0){
        this.props.peopleInfo.studentsInfo.map((value,index) => {
        // console.log(value)
        result.push(
        <Option key = {value.userId} value={value.userId}>{value.userName}</Option>
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
      // console.log("*********************")
      // console.log(values) 
      axios.post(localStorage.api+'team/addNotice',qs.stringify({
        targetId:values.gender,
        content:values.desc
      }),{withCredentials:true}
      )
      .then(function(response){
        // console.log("成功")
        // console.log(response.data)
        message.success('新建通知成功！')
        
      axios.get(localStorage.api+'team/myNotice',{withCredentials:true})
      .then((resolve) => {
  
        // console.log("数据输出11111")
        // console.log(resolve.data)
        // let data = resolve.data.bigTasks.samllTasks;
        // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
  
        that.props.handleSetNotice(resolve.data)
  
      })
      .catch((error) => {
        message.error('获取通知失败！')
      })
      })
      .catch(function(err){
        // console.log(err)
        message.error('新建通知失败！')
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
      // console.log("数据输出")
      // console.log(resolve.data.bigTasks[0].smallTasks)
      // let data = resolve.data.bigTasks.samllTasks;
      // resolve.data.bigTasks[0].smallTasks.reverse();
      // let data = resolve.data.bigTasks.samllTasks;
      this.props.handleSetTaskData(fromJS(resolve.data));
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
      message.error('获取通知信息失败！')
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
      message.error('获取小组信息失败！')
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

  deleteNotice(id){
    
    const that = this;
    axios.post(localStorage.api+'team/deleteNotice',qs.stringify({
      noticeId:id,
    }),{withCredentials:true}
    )
    .then(function(response){
      message.success('删除成功！')
      axios.get(localStorage.api+'team/myNotice',{withCredentials:true})
      .then((resolve) => {
  
        // console.log("数据输出11111")
        // console.log(resolve.data)
        // let data = resolve.data.bigTasks.samllTasks;
        // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
  
        that.props.handleSetNotice(resolve.data)
  
      })
      .catch((error) => {
        message.error('获取通知失败！')
      })

    })
    .catch(function(err){
      message.error('删除失败！')

    })


  }

  getMyTimeItem(){
    let result = [];
    if(this.props.notice){
      if(this.props.notice.size!==0){
        this.props.notice.myNotice.map((value,index) => {
          result.push(
                <Timeline.Item key = { value.time } className="notice-top">
                  <p>
                    <a>{value.creatorName}</a>&nbsp;&nbsp;to&nbsp;&nbsp;<a>{value.receiverName}</a>&nbsp;&nbsp;{value.time.slice(0,10)} {value.time.slice(11,19)} 
                    <a onClick={this.deleteNotice.bind(this,value.id)} style={{float:'right'}}>删除</a>
                  </p>
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
      if(key === false){
        hasFu = false;
      }  
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