import React,{ Component, Fragment } from "react";
import { connect } from "react-redux";
import { actionCreator } from './store';
import { Nav } from './style'

class Header extends Component{
  render(){
    return (
      <Fragment>
        <Nav>{ this.props.personInfo }</Nav>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    personInfo:state.getIn(['header','personInfo'])
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({

  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)