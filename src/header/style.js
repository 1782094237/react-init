import styled from 'styled-components';
// import logoPic from '../../static/logo.png';
//一定要这样引入图片，在下面字符串中引入不行
//import引入webpack会将图片打包进来
//直接用url会被当成字符串

export const Nav= styled.div`
width:960px;
padding-right:70px;
box-sizing:border-box;
height:100%;
margin:0 auto;
color:red;
`