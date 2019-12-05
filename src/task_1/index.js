import React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Form,  Button,  Row, Col,  message, Modal, Input, Table, Tag, Collapse, DatePicker, Select } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');

var E = require('wangeditor')
const { Option } = Select;
let clearEdit;
let clearEdit_1;
let editor = false;
let editor_1 = false;
const { Panel } = Collapse;
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


Date.prototype.Format = function(fmt)   
{ 
//author:wangweizhen
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}; 

const getEndTime = (endTime) => {
  let date = new Date(endTime);
  return(
    <span>
    {
     date.Format("yyyy-MM-dd")
    }
  </span>
  )
}
const getEndTimeNumber = (endTime => {
  let date = new Date(endTime);
  // console.log("输出日期"+date)
  return(
     date.Format("yyyy-MM-dd")
  )
})
const columns = [
  {
    title: '设计名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '设计进度',
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
  {
    title: '截止时间',    
    dataIndex: 'endTime',
    key: 'endTime',
    render: endTime => (
      getEndTime(endTime)
    ),
  },
];

const setting = {
  hideOnSinglePage:true
}

let hasFu = false;
let hasFu_1 = false;

Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
      if (this[i] === obj) {
          return true;
      }
  }
  return false;
}


const CollectionCreateForm_1 = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    componentWillUnmount(){
      editor_1 = false;
    }

    getEditor(){

      if(editor_1){
        const { data } = this.props;
        // console.log("data输出+++++++++++++++++++++++++++++++")
        // console.log(data.remark)
        if(data.remark){
          editor_1.txt.html(data.remark)
        }else{
          editor_1.txt.html("")
        }
        editor_1.$textElem.attr('contenteditable', false)
        clearEdit_1=editor_1;
        hasFu_1 = true;
      }else{
        editor_1 = new E(ReactDOM.findDOMNode(this._div))
        editor_1.customConfig.onchange = (html) => {
          //将html值设为form表单的desc属性值
          this.props.form.setFieldsValue({
            'desc': html
          });
        }
        editor_1.customConfig.menus = [
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
        const { data } = this.props;
     
        editor_1.create()
        // console.log("data输出+++++++++++++++++++++++++++++++")
        // console.log(data.remark)
        editor_1.txt.html(data.remark)
        editor_1.$textElem.attr('contenteditable', false)
        clearEdit_1=editor_1;
        hasFu_1 = true;
      }
      



    }
    componentDidUpdate(){
      // console.log("执行刷新***************************************")
      // console.log(hasFu_1)
      if(this.props.visible && !hasFu_1){
        setTimeout(() => {
          this.getEditor()
        })
      }
    }

    getOption(){
      const result = [];
      if(this.props.peopleInfo){
        this.props.peopleInfo.studentsInfo.map((value,index) => {
          // console.log(value)
        })
      }
      // <Option value={this}>male</Option>
      return <Option value='1'>male</Option>;
    }

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }
    
    render() {
      const { visible, onCancel, onOk, form, option, data, personal } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          width='60%'
          title="任务详情"
          okText="确认修改"
          onCancel={onCancel}
          onOk={onOk}
        >

          <Form layout="vertical">
            <Row>
              <Col span = {16}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                    initialValue:data.name
                  })(<Input disabled  />)}
                </Form.Item>

                <Form.Item label="设计描述">
                  {getFieldDecorator('desc', {
                    rules: [{ message: 'Please input the title of collection!' }],
                  })(<div ref = { (ref) => this._div = ref }></div>)}
                </Form.Item>
              </Col>
              <Col style={{paddingLeft:'10%'}} span={8}>
              <Form.Item label="负责人">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                  initialValue:data.worker
                })(
                  <Select
                    disabled
                      // endTime: 1575201236000
                      // id: 2
                      // name: "分析2"
                      // remark: "设计阶段的任务1"
                      // status: "进行中"
                      // worker: "4"
                      // workerName: "测试"
                    // onChange={this.handleSelectChange}
                  >
                     {option} 
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="日期">
                {getFieldDecorator('date-picker', {rules: [{  required: true, message: 'Please select time!' }],
                initialValue:moment(getEndTimeNumber(data.endTime))
              })(
                  <DatePicker disabled />
                )}
              </Form.Item>

              <Form.Item label="任务状态">
                {getFieldDecorator('station', {
                  rules: [{ required: true, message: 'Please select your station!' }],
                  initialValue:data.status
                })(
                  <Select
                    // onChange={this.handleSelectChange}
                    disabled={ personal.identity.contains("组长") || personal.identity.contains("需求负责人") || (personal.id == data.worker) ? false : true}
                  >
                    <Option value="未开始">未开始</Option>
                    <Option value="进行中">进行中</Option>
                    <Option value="待审核">待审核</Option>
                    {
                      personal.identity.contains("组长") || personal.identity.contains("设计负责人") == true ?<Option value="已完成" >已完成</Option>:null
                    }
                    
                  </Select>,
                )}
              </Form.Item>

              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
);

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    componentWillUnmount(){
      editor = false;
    }

    getEditor(){
      if(editor){

      }else{
        editor = new E(ReactDOM.findDOMNode(this._div))
        editor.customConfig.onchange = (html) => {
          //将html值设为form表单的desc属性值
          // console.log("输出html***************************************************")
          // console.log(html)
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
      if(this.props.visible && !hasFu){
        setTimeout(() => {this.getEditor()})
      }
    }

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

    render() {
      
      const { visible, onCancel, onOk, form, option, data } = this.props;
      const { getFieldDecorator } = form;
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      // console.log(data)

      return (
        <Modal
          visible={visible}
          width='60%'
          title="创建设计"
          okText="Create"
          onCancel={onCancel}
          onOk={onOk}
        >
          <Form  layout="vertical">
            <Row>
              <Col span = {16}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(<Input  />)}
                </Form.Item>

                <Form.Item label="设计描述">
                  {getFieldDecorator('desc', {
                    rules: [{ message: 'Please input the title of collection!' }],
                  })(<div ref = { (ref) => this._div = ref }></div>)}
                </Form.Item>
              </Col>
              <Col style={{paddingLeft:'10%'}} span={8}>
              <Form.Item label="负责人">
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
              <Form.Item label="日期">
                {getFieldDecorator('date-picker', {rules: [{  required: true, message: 'Please select time!' }]})(
                  <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={this.disabledDate.bind(this)}
                  />
                  )}              
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
);


class Task_1 extends Component{

  componentDidMount(){
    // axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
    // .then((resolve) => {
    //   console.log("数据输出")
    //   console.log(resolve.data.bigTasks[0].smallTasks)
    //   // let data = resolve.data.bigTasks.samllTasks;
    //   this.props.handleSetTaskData(resolve.data)
    //   console.log("**************************")
    //   console.log(this.props.taskData.bigTasks[0].smallTasks)
    // })
    // .catch((error) => {

    // })
    this.resetTask();

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

        // axios.post(localStorage.api+'files/allFiles',qs.stringify({
    //   item: that.props.fileId,
    // }),{withCredentials:true}
    // )
    // .then(function(response){
    //   console.log(response.data.file[0].file)
    //   that.props.handleSetFile(fromJS(response.data.file))
    //   that.props.handleSetShowFile(fromJS(response.data.file))
    // })
    // .catch(function(err){
    //   console.log(err)
    // })




  }



  handleOk(){
    const that = this;
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
      // console.log('Received values of form: ', values);
      // {title: "213", desc: "<p>内从</p>", gender: "female", date-picker: Moment}
      // {userSex: "男", userClass: "zy1602", userCollege: "计算机科学与技术学院", userProfessional: "计算机科学与技术", userName: "陈小路"}
      // userClass: "zy1602"
      // userCollege: "计算机科学与技术"
      // userId: "1"
      // userName: "何金超"
      // userProfessional: "计算机科学与技术"
      // userSex: "男"
      // console.log("************************")
      // console.log(values['date-picker'])
      let d = new Date(values['date-picker']['_d'])
      var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
      // console.log(this.props.taskData.bigTasks[0].id)
      // console.log(this.props.taskData.getIn(['bigTasks',1,'id']))
      // {title: "223", desc: "<p>132</p>", gender: "0121610870807", date-picker: Moment}
      
        // workerId:values['gender'],
        // name:values['title'],
        // desc:values['desc'],
        // itemId:this.props.taskData.bigTasks[0].id,
        // endTime:datetime
      // console.log(datetime)
      
      axios.post(localStorage.api+'team/addSmallTask',qs.stringify({
        workerId:values['gender'],
        name:values['title'],
        desc:values['desc'],
        // itemId:this.props.taskData.bigTasks[0].id,
        itemId:this.props.taskData.getIn(['bigTasks',1,'id']),
        endTime:datetime,
      }),{withCredentials:true}
      )
      .then(function(response){
        message.success('分配成功！')
        // console.log("成功")
        // console.log(response.data)
        if(clearEdit){
          clearEdit.txt.clear();
        }

        that.resetTask();
      })
      .catch(function(err){
        message.error('分配失败！')
        // console.log("失败")
        // console.log(err)
      })

      // axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
      // .then((resolve) => {
      //   console.log("数据输出")
      //   console.log(resolve.data.bigTasks[0].smallTasks)
      //   // let data = resolve.data.bigTasks.samllTasks;
      //   this.props.handleSetTaskData(resolve.data)
      //   console.log("**************************")
      //   console.log(this.props.taskData.bigTasks[0].smallTasks)
      // })
      // .catch((error) => {
  
      // })

      form.resetFields();
      this.props.handleSetNewTask(false)
    });
   }

  handleCancel(){
    const { form } = this.formRef.props;

    this.props.handleSetNewTask(false);

  }

  handleOk_1(){
    const that = this;
    // console.log("%%%%%%%%%%%")
    const { form } = this.formRef_1.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log('Received values of form: ', values);
     
      // date-picker: Moment {_isAMomentObject: true, _i: 1574784000000, _f: "yyyy:mm:dd", _isUTC: false, _pf: {…}, …}
      // desc: "<p>content</p>"
      // gender: "4"
      // station: "进行中"
      // title: "2133"
      // let d = new Date(values['date-picker']['_d'])
      // var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); 
      // console.log(this.props.demandSmall.id)
      // console.log("++++++++++++++++++++++++++++++")
      // console.log(values['station'])
      axios.post(localStorage.api+'team/changeSmallTask',qs.stringify({
        id:this.props.demandSmall.id,
        status:values['station']
      }),{withCredentials:true}
      )
      .then(function(response){
        message.success('状态改变成功！')
        // console.log("成功")
        // console.log(response.data)
        if(clearEdit_1){
          clearEdit_1.txt.clear();
        }
        that.resetTask();
      })
      .catch(function(err){
        message.error('状态改变失败！')
        // console.log("失败")
        // console.log(err)
      })




      form.resetFields();
      this.props.handleSetTaskStation(false)
    });
  }

  handleCancel_1(){
    const { form } = this.formRef_1.props;
    form.resetFields();
    this.props.handleSetTaskStation(false);
  }

  saveFormRef(formRef){
    this.formRef = formRef;
  };

  saveFormRef_1(formRef){
    this.formRef_1 = formRef;
  };

  newTask(){
    this.props.handleSetNewTask(true)
  }

  submitTask(){
    const that = this;
    let judge = this.props.taskData.getIn(['bigTasks',1,'smallTasks']).toJS().every((value,index) => {
      // console.log("判断完成")
      // console.log(value)
      return value.status == "已完成";
    })

    if(judge){

      if(this.props.taskData.getIn(['bigTasks',1,'status']) == '已完成'){
        message.error('请勿重复提交！')
      }else{

      
      axios.post(localStorage.api+'team/bigStatus',qs.stringify({
        taskId:2,
        status:'已完成'
      }),{withCredentials:true}
      )
      .then(function(response){
        message.success('提交成功！')
        // console.log("成功")
        // console.log(response.data)
      })
      .catch(function(err){
        message.error('提交失败！')
        // console.log("失败")
        // console.log(err)
      })

      axios.post(localStorage.api+'team/bigStatus',qs.stringify({
        taskId:3,
        status:'进行中'
      }),{withCredentials:true}
      )
      .then(function(response){

        // console.log("成功")
        // console.log(response.data)
        // console.log("执行到这里+++++++++++++++++++++++")
        that.resetTask();

      })
      .catch(function(err){
        // console.log("失败")
        // console.log(err)
        message.error('下一状态改变失败！')
      })
    }
      
    }else{
      message.error('任务未完成！')
    }

  }

  resetTask(){
    //获取所有任务，刷新任务
    axios.get(localStorage.api+'team/subjectInfo',{withCredentials:true})
    .then((resolve) => {

      // console.log("数据输出***************************")
      // console.log(resolve.data.bigTasks[0].smallTasks)
      // resolve.data.bigTasks[1].smallTasks.reverse();
      // let data = resolve.data.bigTasks.samllTasks;
      this.props.handleSetTaskData(fromJS(resolve.data));
      // console.log("**************************")
      // console.log(this.props.taskData.bigTasks[0].smallTasks)
      // console.log(this.props.taskData.getIn(['bigTasks',1,'smallTasks']))
    })
    .catch((error) => {
      message.error('获取任务信息失败！')
    })
  }

  selectTable(record,rowkey){
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@")
    // console.log(record);
    // console.log(rowkey);
    this.props.handleSetDemandSmall(record)
    this.props.handleSetTaskStation(true)
  }

  getOption(){
    const result = [];
    if(this.props.peopleInfo){
      // console.log("________________")
      if( this.props.peopleInfo.size !== 0){
        this.props.peopleInfo.studentsInfo.map((value,index) => {
        // console.log(value)
        result.push(
        <Option value={value.userId}>{value.userName}</Option>
        )
      })
      }
      // this.props.peopleInfo.studentsInfo.map((value,index) => {
      //   console.log("________________________")
      //   console.log(value)
      // })
    }
    // <Option value={this}>male</Option>
    return result;
  }

  render(){
    return(
      <Fragment>
        <Row>
          <Col className="task-title" span = {6}>
            <span>设计管理</span>
            {/* <span className="task-name"> — {this.props.taskData.bigTasks === undefined ? "未分配" : this.props.taskData.bigTasks[0].workerName}</span> */}
            <span className="task-name"> — { this.props.taskData.getIn(['bigTasks']) && this.props.taskData.getIn(['bigTasks',1,'workerName'])  ?  this.props.taskData.getIn(['bigTasks',1,'workerName']) : "未分配" }</span>
          </Col>
          <Col span = {6}></Col>
          <Col span = {6} style={{textAlign:'right'}}>

          </Col>
          <Col span = {6} style={{textAlign:'right'}}>
            {
                this.props.personal.identity.contains("组长") || this.props.personal.identity.contains("设计负责人") == true 
                ?<Button onClick={this.submitTask.bind(this)} className="task-new">提交任务</Button>
                :<Button onClick={this.submitTask.bind(this)} className="task-new" disabled>提交任务</Button>
            }

            {
                this.props.personal.identity.contains("组长") || this.props.personal.identity.contains("设计负责人") == true 
                ?<Button onClick={this.newTask.bind(this)} className="task-new">新建设计</Button>
                :<Button onClick={this.newTask.bind(this)} className="task-new" disabled>新建设计</Button> 
            }

          
          </Col>

        </Row>
        <Table className="task-table" columns={columns} dataSource = {this.props.taskData.getIn(['bigTasks']) == null ? null : this.props.taskData.getIn(['bigTasks',1,'smallTasks']).toJS() }  pagination={setting}         
           onRow={(record,rowkey)=>{
             return{
               onClick : this.selectTable.bind(this,record,rowkey)    //点击行 record 指的本行的数据内容，rowkey指的是本行的索引         
             }     
           }}
        />

        



        <CollectionCreateForm_1
          wrappedComponentRef={this.saveFormRef_1.bind(this)}
          visible={this.props.taskStation}
          onOk={this.handleOk_1.bind(this)}
          onCancel={this.handleCancel_1.bind(this)}
          option={this.getOption()}
          data={this.props.demandSmall}
          personal = {this.props.personal}
        />

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef.bind(this)}
          visible={this.props.newTask}
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
    // file:state.getIn(['file']),
    // showFile:state.getIn(['showFile'])
    newTask:state.getIn(['newTask']),
    taskStation:state.getIn(['taskStation']),
    taskData:state.getIn(['taskData']),
    peopleInfo:state.getIn(['peopleInfo']),
    demandSmall:state.getIn(['demandSmall']),
    personal: state.getIn(['personal'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetNewTask(key){
          if(key === false){
            hasFu = false;
          }  
          const action = actionCreator.setShowTask(key);
          dispatch(action);
    },
    handleSetTaskStation(key){
        if(key === false){
          hasFu_1 = false;
        }  
        const action = actionCreator.setTaskStation(key);
        dispatch(action);
    },
    handleSetTaskData(key){
      const action = actionCreator.setTaskData(key);
      dispatch(action);
    },
    handleSetPeopleInfo(key){
      const action = actionCreator.setPeopleInfo(key);
      dispatch(action);
    },
    handleSetDemandSmall(key){
      const action = actionCreator.setDemandSmall(key);
      dispatch(action);
    }
    // handleSetShowFile(key){
    //     const action = actionCreator.setShowFile(key);
    //     dispatch(action);
    // },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Task_1)



