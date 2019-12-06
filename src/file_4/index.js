import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import qs from 'qs';
import {fromJS, toJS, getIn} from 'immutable';

import './style.css';

import { actionCreator } from '../store';



import {  Button, Icon, Row, Col, Upload, message, Modal, Input,Popconfirm } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
const FileSaver = require('file-saver');
moment.locale('zh-cn');
const { confirm } = Modal;

var download2 = require('../static/download2.js')
let nowFileId = 0;
let idStack = [['0',"所有文件"]];
Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
      if (this[i] === obj) {
          return true;
      }
  }
  return false;
}
class File extends Component{

  resetFile(){
    let nowFile = this.props.file;
    // console.log("____________________")
    // console.log(nowFile.toJS())
    for(let i = 1; i < idStack.length; i++ ){
      for(let j = 0; j < nowFile.size; j++){
        if(idStack[i][0] == nowFile.getIn([j,"id"])){
          nowFile = nowFile.getIn([j,"files"]);
        }
      }
    }
    this.props.handleSetShowFile(fromJS(nowFile))
  }

  getFile(){
    // console.log("先执行")
    if(nowFileId == this.props.fileId){
      const that = this;
      axios.post(localStorage.api+'files/allFiles',qs.stringify({
        item: that.props.fileId,
      }),{withCredentials:true})
        .then(function(response){
          // console.log("获取文件成功77777")
          // console.log(response.data)
          that.props.handleSetFile(fromJS(response.data))
          that.resetFile()
        })
        .catch(function(err){
          // console.log("获取文件失败")
          // console.log(err)
          message.error('获取文件信息失败！')
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
          // console.log("获取文件成功7777")
          // console.log(response.data)
          that.props.handleSetFile(fromJS(response.data))
          that.resetFile()
        })
        .catch(function(err){
          // console.log(err)
          message.error('获取文件信息失败！')
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
    // console.log("开始下载")
    // var a = document.createElement('a');
    // a.href = src;
    // a.download = name;
    // a.click();



  //   axios({
  //     method: 'get',
  //     url: src,
  //     // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
  //     responseType: 'blob',
  //   }).then((res) => {
  //     if (!res) {
  //         return
  //     }
  //     // 将lob对象转换为域名结合式的url
  //     let blobUrl = window.URL.createObjectURL(res.data)
  //     download2(blobUrl);
  // })

  
      axios({
        method: 'GET',
        url: src,
        responseType: 'blob'
    }).then(res=>{
        download2(res.data,name);
        // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
        // let url = window.URL.createObjectURL(blob);
        // window.location.href = url;
    }).catch(err=>{
        message.error("下载文件失败！")
    })




  // fetch(src).then(res => res.blob()).then(blob => {
  //   const a = document.createElement('a');
  //   document.body.appendChild(a)
  //   a.style.display = 'none'
  //   // 使用获取到的blob对象创建的url
  //   const url = window.URL.createObjectURL(blob);
  //   a.href = url;
  //   // 指定下载的文件名
  //   a.download = name;
  //   a.click();
  //   document.body.removeChild(a)
  //   // 移除blob对象的url
  //   window.URL.revokeObjectURL(url);
  // });

  // FileSaver.saveAs(src, name);


//   axios({
//     method: 'post',
//     url:src,
//     // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
//     responseType: 'blob',
// }).then((res) => {
//     if (!res) {
//         return
//     }
//     console.log(res.data)
//     FileSaver.saveAs(res.data, name);
// })

// download2(src,name,'text/plain')

// axios({
//   method: 'get',
//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
//   responseType: 'arraybuffer',
//   url:src,
//   responseType: 'blob',
// }).then((res) => {
//     // 创建隐藏的可下载链接
//     var eleLink = document.createElement('a');
//     eleLink.download = name;
//     eleLink.style.display = 'none';
//     // 字符内容转变成blob地址
//     eleLink.href = URL.createObjectURL(res.data);
//     // 触发点击
//     document.body.appendChild(eleLink);
//     eleLink.click();
//     // 然后移除
//     document.body.removeChild(eleLink);
//   })
// download2(src)


    // axios.get(src,{withCredentials:true})
    //   .then((response) => {
    //     console.log(response)
    //     // FileSaver.saveAs(response.data, name)
    //     download2(response.data)
        
    //   })




  }

  view(src){
    // console.log("执行这里啊11111111111111111---------------------")
    // console.log(src)
    // console.log(encodeURIComponent('http://27y6v05022.wicp.vip:40292/stuFiles/team1/item1/7701665774a64df7b914cbcdd3ffd1e1_Emmet语法.doc'))
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

  getEye(name){
    let getAfter = name.split('.').length;
    let afterWord = name.split('.')[getAfter-1]
    const files = ['doc','docx','xls','xlsx','ppt','pptx','pdf','txt','gif','jpg','png','psd','mp3','avi','wmv','mov','mp4']
    for(let i = 0; i < files.length; i++){
      if(files[i] == afterWord){
        return true
      }
    }
    return false;
  }

  getDown(name){
    let getAfter = name.split('.').length;
    let afterWord = name.split('.')[getAfter-1]
    const files = ['gif','jpg','png','psd','mp3','avi','wmv','mov','mp4']
    
    for(let i = 0; i < files.length; i++){
      if(files[i] == afterWord){
        return false
      }
    }
    return true;
  }

  getIcon(name,type){
    if(type == '文件夹'){
      // console.log("执行")
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
        case 'xlsx':
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
        case 'mp4':
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
    // console.log("进入")
    let array = this.props.showFile;
    for(let i = 0; i< array.size; i++){
      if(id == array.getIn([i,'id'])){
        
        if(array.getIn([i,'type']) == '文件夹'){
//点击文件夹  进入
          this.props.handleSetShowFile(array.getIn([i,'files']))
          idStack.push([array.getIn([i,'id']),array.getIn([i,'name'])])
        }else{
//点击文件  view
          // this.view(array.getIn([i,'src']))
        }
      }
    }
  }

  getDelete(creatorId,fileId,type){
    // console.log("删除id"+creatorId)
    if(this.props.personal.identity.contains("组长") || creatorId == this.props.personal.id){
      console.log(type)
      console.log(creatorId)
      console.log(this.props.personal.id)

      if(type == "文件夹"){
        return (  
          <Popconfirm title="是否删除文件夹内所有文件？" okText="Yes" cancelText="No" onConfirm={this.deleteFile.bind(this,fileId,type)}>
            <a>删除</a>
          </Popconfirm>
        )   
      }else{
        return (
          <Popconfirm title="是否删除文件？" okText="Yes" cancelText="No" onConfirm={this.deleteFile.bind(this,fileId,type)}>
            <a>删除</a>
          </Popconfirm>
        )
      }

      // <a onClick={this.deleteFile.bind(this,fileId,type)}>删除</a>
    }
  }

  deleteFile(fileId,type,e){
    const that = this;

      axios.post(localStorage.api+'files/deleteFile',qs.stringify({
        fileId:fileId
      }),{withCredentials:true}
      )
      .then(function(response){
        message.success('删除成功！')
        that.getFile()
        
      })
      .catch(function(err){
        message.error('删除失败！')
        // console.log("失败")
        // console.log(err)
      })
  }

  getClick(array,name){

    let getAfter = name.split('.').length;
    let afterWord = name.split('.')[getAfter-1]
    const files = ['doc','docx','xls','xlsx','ppt','pptx']

    if(files.contains(afterWord)){
      return this.view.bind(this,array.getIn(['pdfSrc']))
    }else{
      return this.view.bind(this,array.getIn(['src']))
    }
  }

  getData(){
    let array = this.props.showFile;
    // console.log("测试array");
    // console.log(array)
    // console.log(array.toJS())
    let result = [];
    for(let i = 0; i< array.size; i++){
      // console.log("$$$$$$$$$$")
      // console.log(array.getIn([i,'type']))
      result.push( 
        // 
        <Row  key = { array.getIn([i,'id']) } className="file-sub">
          <Col onClick={this.inFloder.bind(this,array.getIn([i,'id']))} className="file-item" span={6}>
              {
                this.getIcon(array.getIn([i,'name']),array.getIn([i,'type']))
              }
              <p>{array.getIn([i,'name'])}</p>
          </Col>

          <Col span={3}> 
            <Icon style={{lineHeight:'2.2rem',
            display:(array.getIn([i,'type']) !== "文件夹" && this.getEye(array.getIn([i,'name']))) ? '':'none'
            }} type="eye" onClick={
              this.getClick.call(this,array.getIn([i]),array.getIn([i,'name']))
              // this.view.bind(this,array.getIn([i,'pdfSrc']))
              } />
          </Col>
          <Col span={3}>
            <Icon style={{lineHeight:'2.2rem',
            
            display:array.getIn([i,'type']) !== "文件夹"  ? '':'none'
            
            }} onClick={this.download.bind(this,array.getIn([i,'src']),array.getIn([i,'name']))} type="arrow-down" /> 
          </Col>
          <Col className="file-item" span={3}>
            {array.getIn([i,'creator'])}
          </Col>
          <Col className="file-item" span={3}>
            {this.getDelete(array.getIn([i,'creatorId']),array.getIn([i,'id']),array.getIn([i,'type']))}
          </Col>
          <Col className="file-item" span={6}>{ array.getIn([i,'date']).slice(0,10)+' '+array.getIn([i,'date']).slice(11,19) }</Col>

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
      // console.log("执行xxxxxxxxxxxxxxxxxx")
      // console.log(idStack[idStack.length-1][0])
      if(document.getElementById('floder').value == ""){
        message.error('文件夹名不能为空!')
      }else{
        axios.post(localStorage.api+'files/newFolder',qs.stringify({
          item: that.props.fileId,
          fatherId:idStack[idStack.length-1][0],
          folderName:document.getElementById('floder').value
        }),{withCredentials:true})
        .then((response) => {
          message.success('新建文件夹成功！')
          that.getFile()
          // console.log(response)
        })
        .catch((err) => {
          message.error('新建文件夹失败！')
  
          // console.log(err)
        })
      }

    },
    onCancel() {},
  });
 }

 getBack(id){
  //  console.log("开始返回")
  //  console.log(id)
  let nowFile = this.props.file;
  if( id !== 0 ){
  bott:
  for(let i = 1; i < idStack.length; i++ ){
    for(let j = 0; j < nowFile.size; j++){
      if(idStack[i][0] == nowFile.getIn([j,"id"])){
        nowFile = nowFile.getIn([j,"files"]);
        if(id == idStack[i][0]){
          break bott;
        }
      }
    }
  }
}else{
}
  // console.log(nowFile.toJS())
  
  this.props.handleSetShowFile(fromJS(nowFile));
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
    // console.log(this.props.fileId)
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
          // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
          // console.log(info.file)
          // console.log(info.fileList);
        }
        if (info.file.status === 'done') {


          if(info.file.response.key != 1){
            if(info.file.response.mes == '文件名重复'){
              message.error(`${info.file.name} 文件名重复.`);
            }else if(info.file.response.mes=='文件过大,文件大小不得超过10mb'){
              message.error(`${info.file.name} 文件过大,文件大小不得超过10mb.`);
            }else{
              message.error(`${info.file.name} 上传失败.`);
            }
          }else{
            // console.log("完成")
            message.success(`${info.file.name} file uploaded successfully`);
            that.getFile()
          }


        } else if (info.file.status === 'error') {
          // console.log("失败")
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
            <Col span={6}>名称</Col>
            <Col span={3}>预览</Col>
            <Col span={3}>下载</Col>
            <Col span={3}>创建者</Col>
            <Col span={3}>编辑</Col>
            <Col span={6}>更新日期</Col>
            
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
    showFile:state.getIn(['showFile']),
    personal:state.getIn(['personal'])
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