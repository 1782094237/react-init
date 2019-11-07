import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import './style.css';
import axios from 'axios';
import { actionCreator } from '../layout/store';
import './style.css';
import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message } from 'antd';
import {fromJS, toJS, getIn} from 'immutable';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');

let fatherId =0;
class File extends Component{
  componentDidMount(){
    const that = this;
    axios.get('/mock.json')
    .then(function(response){
      console.log(response.data.file[0].file)
      that.props.handleSetFile(fromJS(response.data.file))
      that.props.handleSetShowFile(fromJS(response.data.file))
    })
    .catch(function(err){
      console.log(err)
    })
  }

  download(){
    //下载文件
    console.log("开始下载")
    var a = document.createElement('a');
    a.href = 'url';
    a.download = 'filename';
    a.click();
  }

  getIcon(name,type){
    if(type == '文件夹'){
      console.log("执行")
      return (
        <svg className="file-icon" aria-hidden="true">
          <use xlinkHref="#icon-folder__easyi"></use>
        </svg>
      )
    }else{
      let getAfter = name.split('.').length;
      switch(name.split('.')[getAfter-1]){
        case 'doc':
        case 'docx':
          return (
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_word_office"></use>
            </svg>
          )

        case 'xls':
          return(
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_excel_office"></use>
            </svg>
          )

        case 'ppt':
          return(
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_ppt_office"></use>
            </svg>
          )

        case 'pdf':
          return(
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_pdf"></use>
            </svg>
          )

        case 'txt':
          return(
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_txt"></use>
            </svg>
          )

        case 'zip':
        case 'rar':
          return(
            <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_zip"></use>
            </svg>
          )

        case 'gif':
        case 'jpg':
        case 'png':
        case 'psd':
        case 'swf':
        case 'bmp':
        case 'emf':
          return(
            <svg className="file-icon" aria-hidden="true">
            <use xlinkHref="#icon-file_pic"></use>
            </svg>
          )

        case 'midi':
        case 'mp3':
        case 'mp3':
        case 'wma':
        case 'wave':
        case 'rm':
            return(
              <svg className="file-icon" aria-hidden="true">
              <use xlinkHref="#icon-file_music"></use>
              </svg>
            )

        case 'avi':
        case 'wmv':
        case 'mpeg':
        case 'dv':
        case 'rm':
        case 'rmvb':
        case 'mov':
          return(
            <svg className="file-icon" aria-hidden="true">
            <use xlinkHref="#icon-file_video"></use>
            </svg>
          )

      default:
        return(
          <svg className="file-icon" aria-hidden="true">
          <use xlinkHref="#icon-file_unknown"></use>
          </svg>
        )
      }
    }

  }
  getData(){
    let array = this.props.showFile;
    console.log(array.size);
    let result = [];
    for(let i = 0; i< array.size; i++){
      result.push( 
      <Row onClick={this.inFloder.bind(this,array.getIn([i,'id']))} key = { array.getIn([i,'id']) } className="file-sub">
        <Col className="file-item" span={3}>
            {
              this.getIcon(array.getIn([i,'name']),array.getIn([i,'type']))
            }
            {/* <svg className="file-icon" aria-hidden="true">
                <use xlinkHref="#icon-folder__easyi"></use>
            </svg> */}

            <div onClick={this.download.bind(this)} className="file-text">{array.getIn([i,'name'])}</div>
        </Col>

        <Col span={3}></Col>
        <Col span={3}></Col>
        <Col span={3}> </Col>
        <Col span={3}> </Col>
        <Col span={3}> </Col>
        <Col className="file-item" span={3}>{array.getIn([i,'creator'])}</Col>
        <Col className="file-item" span={3}>{array.getIn([i,'date'])}</Col>
      </Row>
      )
    }
    return result;
  }

  inFloder(id){
    let array = this.props.file;
    for(let i = 0; i< array.size; i++){
      if(id == array.getIn([i,'id'])){
        if(array.getIn([i,'type']) == '文件夹'){
//点击文件夹
          this.props.handleSetShowFile(array.getIn([i,'file']))
        }else{
//点击文件

        }
      }
    }
  }



  render() {
    //后端 文件上传接口
    console.log(this.props.fileId)
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      withCredentials:'true',
      data:{
        itemId:this.props.fileId,
        fatherId:''
      },
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          console.log("完成")
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return(
      
      <Fragment>
      <div className="file-button">
        <Row>
          <Col span="12">
            <Upload  {...props}>
              <Button style={{display:'inline'}} className="up-file" type="primary">上传文件</Button>
            </Upload>
          </Col>
          <Col span="12"><Button  className="up-file">新建文件夹</Button></Col>
        </Row>
      </div>
      <div className="file-name">
        <Row style={{marginLeft:'1rem'}}>
            <Col span={3}>名称</Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}>创建者</Col>
            <Col span={3}>更新日期</Col>
        </Row>
      </div>
      <div className="file-content">
        {this.getData()}
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    file:state.getIn(['header','file']),
    showFile:state.getIn(['header','showFile'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    handleSetFile(key){
          const action = actionCreator.setFile(key);
          dispatch(action);
      },
    handleSetShowFile(key){
        const action = actionCreator.setShowFile(key);
        dispatch(action);
    },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(File)