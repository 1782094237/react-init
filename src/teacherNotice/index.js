import React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS} from 'immutable';

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
      const { visible, onCancel, onOk, form, data, } = this.props;
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
                  initialValue:"全组人员"
                })(
                  <Select
                    placeholder="请选择通知对象"
                    disabled
                    // onChange={this.handleSelectChange}
                  >
                    
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



class TeacherNotice extends Component{


  newNotice(){
    this.props.handleSetNewNotice(true);
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
      axios.post(localStorage.api+'teacher/addNotice',qs.stringify({
        is_all:'是',
        content:values.desc
      }),{withCredentials:true}
      )
      .then(function(response){
        // console.log("成功")
        // console.log(response.data)
        message.success('新建通知成功！')
        
      axios.get(localStorage.api+'teacher/findNotice',{withCredentials:true})
      .then((resolve) => {
  
        // console.log("数据输出11111")
        // console.log(resolve.data)
        // let data = resolve.data.bigTasks.samllTasks;
        // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
  
        that.props.handleSetTeacherNotice(resolve.data)
  
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

    // axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
    // .then((resolve) => {
    //   this.props.handleSetTaskData(fromJS(resolve.data));
    // })
    // .catch((error) => {

    //   message.error('获取任务信息失败！')
    // })

    // axios.get(localStorage.api+'team/info',{withCredentials:true})
    // .then((resolve) => {
    //   // console.log("数据输出11111")
    //   // console.log(resolve.data)
    //   this.props.handleSetPeopleInfo(resolve.data)

    // })
    // .catch((error) => {
    //   message.error('获取小组信息失败！')
    // })


    axios.get(localStorage.api+'teacher/findNotice',{withCredentials:true})
    .then((resolve) => {

      // console.log("数据输出11111")
      // console.log(resolve.data)
      // let data = resolve.data.bigTasks.samllTasks;
      // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

      this.props.handleSetTeacherNotice(resolve.data)

    })
    .catch((error) => {
      message.error('获取通知信息失败！')
    })

    // axios.get(localStorage.api+'/team/info',{withCredentials:true})
    // .then((resolve) => {
    //   // console.log("数据输出11111")
    //   // console.log(resolve.data)
    //   // let data = resolve.data.bigTasks.samllTasks;
    //   // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)

    //   this.props.handleSetPeopleInfo(resolve.data)

    // })
    // .catch((error) => {
    //   message.error('获取小组信息失败！')
    // })
  }



  getTeacherTimeItem(){
    let result = [];
    // console.log("********")
    // console.log(this.props.teacherNotice)
    if(this.props.teacherNotice.notices){
      if(this.props.teacherNotice.notices.size!==0){
        this.props.teacherNotice.notices.map((value,index) => {
          result.push(
                <Timeline.Item key = {value.time} className="teacher-notice-top">
                  <p><a>老师</a>&nbsp;&nbsp;to&nbsp;&nbsp;<a>{value.receiverName}</a>&nbsp;&nbsp;<a>全体成员</a> {value.time.slice(11,19)} </p>
                  <a onClick={this.deleteNotice.bind(this,value.id)} style={{float:'right'}}>删除</a>
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
    axios.post(localStorage.api+'teacher/deleteNotice',qs.stringify({
      noticeId:id,
    }),{withCredentials:true}
    )
    .then(function(response){
      message.success('删除成功！')
      axios.get(localStorage.api+'teacher/findNotice',{withCredentials:true})
      .then((resolve) => {
  
        // console.log("数据输出11111")
        // console.log(resolve.data)
        // let data = resolve.data.bigTasks.samllTasks;
        // this.props.handleSetTaskData(resolve.data.bigTasks[0].smallTasks)
  
        that.props.handleSetTeacherNotice(resolve.data)
  
      })
      .catch((error) => {
        message.error('获取通知失败！')
      })

    })
    .catch(function(err){
      message.error('删除失败！')

    })


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
          <Button onClick={this.newNotice.bind(this)} className="teacher-notice-new">新建通知</Button>
          </Col>
        </Row>
        <Row>
          <Col className="teacher-notice-subTitle" span={12}>
          <h1>老师通知</h1>
            {this.getTeacherTimeItem()}
          </Col>
        </Row>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          visible={this.props.teacherNewNotice}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        />
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => {
  return ({
    // taskData:state.getIn(['taskData']),
    // peopleInfo:state.getIn(['peopleInfo']),

    teacherNotice:state.getIn(['teacherNotice']),
    teacherNewNotice:state.getIn(['teacherNewNotice'])
    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetTeacherNotice(key){
      const action = actionCreator.setTeacherNotice(key);
      dispatch(action);
    },

    handleSetNewNotice(key){
      if(key === false){
        hasFu = false;
      }  
      const action = actionCreator.setTeacherNewNotice(key);
      dispatch(action);
    },

    // handleSetTaskData(key){
    //   const action = actionCreator.setTaskData(key);
    //   dispatch(action);
    // },
    // handleSetPeopleInfo(key){
    //   const action = actionCreator.setPeopleInfo(key);
    //   dispatch(action);
    // },

    // handleSetPeopleInfo(key){
    //   const action = actionCreator.setPeopleInfo(key);
    //   dispatch(action);
    // },
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

export default connect(mapStateToProps,mapDispatchToProps)(TeacherNotice)