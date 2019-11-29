import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';

import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message, Modal, Input } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');
const { confirm } = Modal;


let nowFileId = 0;
let idStack = [['0',"所有文件"]];
class File_4 extends Component{

  resetFile(){
    let nowFile = this.props.file;
    console.log("____________________")
    console.log(nowFile.toJS())
    for(let i = 1; i < idStack.length; i++ ){
      for(let j = 0; j < nowFile.size; j++){
        if(idStack[i][0] == nowFile.getIn([j,"id"])){
          nowFile = nowFile.getIn([j,"file"]);
        }
      }
    }
    this.props.handleSetShowFile(nowFile)
  }

  getFile(){
    if(nowFileId == this.props.fileId){
      const that = this;
      axios.post(localStorage.api+'files/allFiles',qs.stringify({
        item: that.props.fileId,
      }),{withCredentials:true})
        .then(function(response){
          console.log("获取文件成功111111")
          console.log(response.data.file)
          that.props.handleSetFile(fromJS(response.data.file))
          that.resetFile()
        })
        .catch(function(err){
          console.log(err)
        })
    }else{
      nowFileId = this.props.fileId;
      idStack=[[0,"所有文件"]];
      this.getStack();
      const that = this;
      axios.post(localStorage.api+'files/allFiles',qs.stringify({
        item: that.props.fileId,
      }),{withCredentials:true})
        .then(function(response){
          console.log("获取文件成功111111")
          console.log(response.data.file)
          that.props.handleSetFile(fromJS(response.data.file))
          that.resetFile()
        })
        .catch(function(err){
          console.log(err)
        })
    }


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

  componentDidMount(){
    this.getFile()
    // fatherId = 0;
    // const that = this;
    // axios.post(localStorage.api+'files/allFiles',qs.stringify({
    //   item: that.props.fileId,
    // }),
    // {withCredentials:true}
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

  download(src,name){
    //下载文件
    console.log("开始下载")
    var a = document.createElement('a');
    a.href = src;
    a.download = name;
    a.click();
  }

  view(src){
    console.log("执行这里啊11111111111111111---------------------")
    console.log(src)
    console.log(encodeURIComponent('http://27y6v05022.wicp.vip:40292/stuFiles/team1/item1/7701665774a64df7b914cbcdd3ffd1e1_Emmet语法.doc'))
    // let url = 'https://view.officeapps.live.com/op/view.aspx?src=./test.docx';
    // window.open(url,'_blank');
    
// var word = new ActiveXObject("Word.Application");
// word.Visible = true;
// word.Documents.Open(src);
    window.open(src)
    // return(<iframe style="width: 100%;min-height: 600px;" src={'https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2F27y6v05022.wicp.vip%3A40292%2FstuFiles%2Fteam1%2Fitem1%2F7701665774a64df7b914cbcdd3ffd1e1_Emmet%E8%AF%AD%E6%B3%95.doc'+encodeURIComponent('http://27y6v05022.wicp.vip:40292/stuFiles/team1/item1/7701665774a64df7b914cbcdd3ffd1e1_Emmet语法.doc')} width='100%' height='100%' frameborder='1' />)
  }

  // getView(type){
  //   if(type == "文件"){
  //     return (
  //       <Fragment>

  //       </Fragment>
  //     )
  //   }else{
  //     return null;
  //   }
  // }

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
        case 'pptx':
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

  inFloder(id){
    console.log("进入")
    let array = this.props.showFile;
    for(let i = 0; i< array.size; i++){
      if(id == array.getIn([i,'id'])){
        
        if(array.getIn([i,'type']) == '文件夹'){
//点击文件夹  进入
          this.props.handleSetShowFile(array.getIn([i,'file']))
          idStack.push([array.getIn([i,'id']),array.getIn([i,'name'])])
        }else{
//点击文件  view
          // this.view(array.getIn([i,'src']))
        }
      }
    }
  }

  getData(){
    let array = this.props.showFile;
    console.log("@@@@@@@");
    console.log(array.toJS())
    let result = [];
    for(let i = 0; i< array.size; i++){
      console.log("$$$$$$$$$$")
      console.log(array.getIn([i,'type']))
      result.push( 
        // 
        <Row onClick={this.inFloder.bind(this,array.getIn([i,'id']))} key = { array.getIn([i,'id']) } className="file-sub">
          <Col className="file-item" span={3}>
              {
                this.getIcon(array.getIn([i,'name']),array.getIn([i,'type']))
              }
              <div className="file-text">{array.getIn([i,'name'])}</div>
          </Col>

          <Col span={3}></Col>
          <Col span={3}></Col>
          <Col span={3}> 
            <Icon style={{lineHeight:'2.2rem',display:array.getIn([i,'type']) == "文件夹" ? 'none':''}} type="eye" onClick={this.view.bind(this,array.getIn([i,'src']))} />
          </Col>
          <Col span={3}>
            <Icon style={{lineHeight:'2.2rem',display:array.getIn([i,'type']) == "文件夹" ? 'none':''}} onClick={this.download.bind(this,array.getIn([i,'src']),array.getIn([i,'name']))} type="arrow-down" /> 
          </Col>
          <Col className="file-item" span={3}>
            {array.getIn([i,'creator'])}
          </Col>
          {/* {this.getView(array.getIn([i,'type']))} */}
          <Col className="file-item" span={3}>{ array.getIn([i,'date']).slice(0,10)+' '+array.getIn([i,'date']).slice(11,19) }</Col>
          <Col span={3}> </Col>
        </Row>
      )
    }
    return result;
  }



 newFloder(){
   let that = this;
  confirm({
    title: '请输入文件夹名称',
    content: <div><br/><Input id="floder" placeholder="Basic usage" /></div>,
    onOk() {
      console.log("执行xxxxxxxxxxxxxxxxxx")
      console.log(idStack[idStack.length-1][0])
      axios.post(localStorage.api+'files/newFolder',qs.stringify({
        item: that.props.fileId,
        fatherId:idStack[idStack.length-1][0],
        folderName:document.getElementById('floder').value
      }),{withCredentials:true})
      .then((response) => {
        that.getFile()
        console.log(response)
      })
      .catch((err) => {

        console.log(err)
      })
    },
    onCancel() {},
  });
 }

 getBack(id){
   console.log("开始返回")
   console.log(id)
  let nowFile = this.props.file;
  if( id !== 0 ){
  bott:
  for(let i = 1; i < idStack.length; i++ ){
    for(let j = 0; j < nowFile.size; j++){
      if(idStack[i][0] == nowFile.getIn([j,"id"])){
        nowFile = nowFile.getIn([j,"file"]);
        if(id == idStack[i][0]){
          break bott;
        }
      }
    }
  }
}else{
}
  console.log(nowFile.toJS())
  
  this.props.handleSetShowFile(nowFile);
  for(let k = 0; k < idStack.length; k++){
    if(idStack[k][0] == id){
      idStack.length = k+1;
      break;
    }
  }
  this.getStack();
 }

 getStack(){
   const result = [];
   for(let i = 0; i < idStack.length; i++){
    if( i !== 0 ){
      result.push(" < ") 
    }
    result.push(<a onClick={this.getBack.bind(this,idStack[i][0])} key = {idStack[i][0]} className="file-back">{idStack[i][1]}</a>); 
   }
   return (
      result
   )
 }


  render() {
    //后端 文件上传接口
    console.log(this.props.fileId)
    const that = this;
    const props = {
      name: 'upload',
      action: localStorage.api+'files/upload',
      withCredentials:'true',
      showUploadList:{ showPreviewIcon: false, showRemoveIcon: false, showDownloadIcon: false },
      data:{
        itemId:this.props.fileId,
        fatherId:idStack[idStack.length-1][0] 
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
          that.getFile()
        } else if (info.file.status === 'error') {
          console.log("失败")
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return(
      
      <Fragment>
      <div className="file-button">
        <Row>

          <Col span="12"><Button onClick={this.newFloder.bind(this)}  className="up-file">新建文件夹</Button></Col>
          <Col span="12">
            <Upload  {...props}>
              <Button style={{display:'inline'}} className="up-file" type="primary">上传文件</Button>
            </Upload>
          </Col>
        </Row>
      </div>

      <div style={{overflow:'hidden',width:'100%'}}>
      <div className="file-stack">{this.getStack()}</div>

      <div className="file-name web-font">
        <Row style={{marginLeft:'1rem'}}>
            <Col span={3}>名称</Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}>预览</Col>
            <Col span={3}>下载</Col>
            <Col span={3}>创建者</Col>
            <Col span={3}>更新日期</Col>
            <Col span={3}></Col>
        </Row>
      </div>
      <div className="file-content">
        {this.getData()}
      </div>
      </div>

      {/* <iframe style={{width: '100%',minHeight: '600px'}} src={'https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent('http://27y6v05022.wicp.vip:40292/stuFiles/team1/item1/7701665774a64df7b914cbcdd3ffd1e1_Emmet语法.doc')}   /> */}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    file:state.getIn(['file']),
    showFile:state.getIn(['showFile'])
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

export default connect(mapStateToProps,mapDispatchToProps)(File_4)