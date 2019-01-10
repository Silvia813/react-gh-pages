import React, {Component} from 'react'
import {remove, sample} from 'lodash-es'
import './App.css';
import immer from 'immer'
import cls from 'classnames'
import logo from './logo.svg'
import zh from './zh.jpg'
import zyx from './zyx.jpg'
import sx from './sx.jpg'
import dxf from './dxf.jpg'
import hf from './hf.jpg'
import zkr from './zkr.jpg'
import lt from './lt.jpg'
// import hrk from './hrk.jpg'
import lqy from './lqy.jpg'
import zsq from './zsq.jpg'
import yy from './yy.jpg'
// import zqx from './zqx.jpg'
// import cjw from './cjw.jpg'
// import czl from './czl.jpg'
// import zwq from './zwq.jpg'
const allPerson = [
  '张昊','曾娅萱','申鑫','邓晓峰','胡飞','张可人','龙涛','胡如康','李峤雨','朱诗琦','袁野','张启祥','陈婧雯','陈张雷','朱晚秋','A','B'
]
function getPic (gift) {
  let src
  switch (gift) {
    case '张昊':
    src = zh
      break;
    case '曾娅萱':
    src = zyx
      break;
    case '申鑫':
    src = sx
      break;
    case '邓晓峰':
    src = dxf
      break;
    case '胡飞':
    src = hf
      break;
    case '张可人':
    src = zkr
      break;
    case '龙涛':
    src = lt
      break;
    // case '胡如康':
    // src = hrk
    //   break;
    case '李峤雨':
    src = lqy
      break;
    case '朱诗琦':
      src = zsq
        break;
    case '袁野':
      src = yy
        break;
    default:
    src = logo
      break;
  }
  return src
}

export default class Home extends Component {
  state = {
    prizePool: allPerson.filter((i,idx) => idx <= 14),
    result: [],
    initialPerson: [],
    showPic: false,
    currentGift: null,
  }
  clearPic = () => {
    this.setState({
      showPic: false,
      currentGift: null,
    })
  }
  getGift = name => () => {
    const {prizePool} = this.state
    const gift = sample(prizePool.filter(i => i !== name))
    this.setState(
      immer(state => {
        state.currentGift = gift
        remove(state.prizePool, i => i === gift)
        state.result.find(i => i.name === name).gift = gift
        state.showPic = true
      })
    )
    setTimeout(this.clearPic, 2000)
  }
  reset = () => {
    const {initialPerson} = this.state
    this.setState({
      prizePool: initialPerson,
      result: initialPerson.map(i => ({
        name: i,
        gift: null
      }))
    })
  }
  handlePersonChange = name => (e) => {
    const { prizePool } = this.state
    if (e.target.checked){
      if (!prizePool.includes(name)){
        this.setState(immer(
          state => {
            state.prizePool.push(name)
          }
        ))
      }
    } else {
      this.setState(immer(
        state => {
          remove(state.prizePool, i => i === name)
        }
      ))
    }
  }
  confirmPerson =() => {
    const {prizePool} = this.state
    this.setState({
      result: prizePool.map(i => ({
        name: i,
        gift: null
      })),
      initialPerson: prizePool,
    })

  }
  toggleAll = (e) => {
    const value = e.target.checked
    if (value) {
      this.setState({
        prizePool: allPerson
      })
    } else {
      this.setState({
        prizePool: []
      })
    }
  }
  render() {
    const { result, prizePool, showPic, currentGift } = this.state
    return (
      <div className="my-bg">
      <h2 className='my-h2'>张可乐娱乐文化公司年会活动</h2>
      {
        result.length
        ? <div>
            {
              result.map(i => (<div className='my-get-gift' key={i.name}><span>{i.name}</span>
              {
                i.gift
                ? <span>奖品: {i.gift}</span>
                : <button onClick={this.getGift(i.name)}>抽奖</button>
              }
            </div>))
            }
          <button onClick={this.reset}>重置结果</button>
        </div>
        : <div className=''>
            <div className='my-radio'>
              <input type="checkbox" id={'all'} name={'全选'} onChange={this.toggleAll} checked={prizePool.length === allPerson.length}/>
              <label for='all'>全选</label>
            </div>
            {
              allPerson.map(i => <div className='my-radio' key={i}>
                <input
                  type="checkbox"
                  id={i}
                  name={i}
                  onChange={this.handlePersonChange(i)}
                  checked={prizePool.includes(i)}
                />
                <label for={i}>{i}</label>
              </div>)
          }
            <div>参与人数为:{prizePool.toString()}共{prizePool.length}人</div>
            <button onClick={this.confirmPerson}>确定</button>
          </div>
      }
      <div className={cls('my-dialog-layer', showPic ? "my-img--show" : 'my-img--hide')}>
        {currentGift && <img src={getPic(currentGift)}
          className="my-img" alt="logo" />}
        </div>
      </div>
      )
  }
}

