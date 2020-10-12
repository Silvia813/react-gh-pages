import React, {Component} from 'react'
import './App.css';
import immer from 'immer'
import img from './images/download.png'
import cls from 'classnames'

export default class Home extends Component {
  componentDidMount() {
    const OpenInstall = window.OpenInstall
    const data = OpenInstall.parseUrlParams()
    new OpenInstall({
      /*appKey必选参数，OpenInstall平台为每个应用分配的ID*/
      appKey : "ep0c2i",
      /*自定义遮罩的html*/
      //mask:function(){
      //  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
      //},
      /*OpenInstall初始化完成的回调函数，可选*/
      onready : function() {
        console.log('nihao')
          /*在app已安装的情况尝试拉起app*/
          this.schemeWakeup();
          console.log(this, 'this')

          /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
          var m = this, button = document.getElementById("downloadButton");
          button.style.visibility = "visible";
          button.onclick = function() {
            console.log('helo')
              m.wakeupOrInstall();
              return false;
          }
      }
  }, data)}

  render() {
    return <div className='container' >
      <img src={img} alt="" className='img'/>
      <button className='btn' id='downloadButton'>click me</button>
    </div>
  }
}

