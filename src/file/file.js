import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import './style.css';
import axios from 'axios';
import { actionCreator } from '../layout/store';
import './style.css';
import { Layout, Menu, Button, Dropdown, Icon, Row, Col, Upload, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Axios from 'axios';
moment.locale('zh-cn');


class File extends Component{
  componentDidMount(){
    axios.post('',{

    })
    .then(function(response){
      console.log(response)
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



  render() {
    //后端 文件上传接口
    console.log(this.props.fileId)
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      withCredentials:'true',
      data:{
        itemId:this.props.fileId
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
        <Row className="file-sub">
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-folder__easyi"></use>
                </svg>
                <div onClick={this.download.bind(this)} className="file-text">文件夹一</div>
            </Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col className="file-item" span={3}>巴方硕</Col>
            <Col className="file-item" span={3}>2019-01-06 &nbsp;&nbsp; 20:24:59</Col>
        </Row>
        <Row className="file-sub">
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-file_excel_office"></use>
                </svg>
                <div className="file-text">文件一</div>
            </Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col className="file-item" span={3}>巴方硕</Col>
            <Col className="file-item" span={3}>2019-01-06 &nbsp;&nbsp; 20:24:59</Col>
        </Row>
        <Row className="file-sub">
            <Col className="file-item" span={3}>
                <svg className="file-icon" preserveAspectRatio="xMidYMid slice"  aria-hidden="true">
                    <use xlinkHref="#icon-file_zip"></use>
                </svg>
                <div className="file-text">文件一</div>
            </Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col className="file-item" span={3}>巴方硕</Col>
            <Col className="file-item" span={3}>2019-01-06 &nbsp;&nbsp; 20:24:59</Col>
        </Row>

        <Row className="file-sub">
            <Col className="file-item" span={3}>
                <svg className="file-icon"   aria-hidden="true">
                    <use xlinkHref="#icon-file_unknown"></use>
                </svg>
                <div className="file-text">文件一</div>
            </Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col className="file-item" span={3}>巴方硕</Col>
            <Col className="file-item" span={3}>2019-01-06 &nbsp;&nbsp; 20:24:59</Col>
        </Row>
       
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    // itemNumber:state.getIn(['header','itemNumber'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    // handleSelectItem(e){
    //   console.log(e)
    //       const action = actionCreator.setItemNumber(e.key);
    //       dispatch(action);
    //   },
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(File)