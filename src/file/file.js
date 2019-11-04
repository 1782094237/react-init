import React,{ Component, Fragment } from 'react';
import { connect } from "react-redux";
import './style.css';
import { actionCreator } from '../layout/store';
import './style.css';
import { Layout, Menu, Button, Dropdown, Icon, Row, Col } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');


class File extends Component{

  render() {
    return(
      <Fragment>
      <div className="file-button">
        <Button className="up-file" type="primary">上传文件</Button>
        <Button className="up-file">新建文件夹</Button>
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
        <Row style={{marginLeft:'1rem'}}>
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-wenjianjia"></use>
                </svg>
                <div className="file-text">文件夹一</div>
            </Col>

            <Col span={3}></Col>
            <Col span={3}></Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col span={3}> </Col>
            <Col className="file-item" span={3}>巴方硕</Col>
            <Col className="file-item" span={3}>2019-01-06 &nbsp;&nbsp; 20:24:59</Col>
        </Row>
        <Row style={{marginLeft:'1rem'}}>
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-jpg"></use>
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
        <Row style={{marginLeft:'1rem'}}>
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-pdf"></use>
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
        <Row style={{marginLeft:'1rem'}}>
            <Col className="file-item" span={3}>
                <svg className="file-icon" aria-hidden="true">
                    <use xlinkHref="#icon-video"></use>
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