import React, {Component, Fragment} from 'react'
import {remove, sample} from 'lodash-es'
import logo from './logo.svg';
import './App.css';
import immer from 'immer'
const person = [
  '张昊','曾娅萱','申鑫','邓晓峰','胡飞','张可人','龙涛','胡如康'
]
export default class Home extends Component {
  state = {
    prizePool: person,
    result: person.map(i => ({
      name: i,
      gift: null
    }))
  }
  getGift = name => () => {
    const {prizePool} = this.state
    const gift = sample(prizePool.filter(i => i !== name))
    this.setState(
      immer(state => {
        remove(state.prizePool, i => i === gift)
        state.result.find(i => i.name === name).gift = gift
      })
    )

  }
  reset = () => {
    this.setState({
      prizePool: person,
      result: person.map(i => ({
        name: i,
        gift: null
      }))
    })
  }
  render() {
    const {result} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to silvia</h2>
        </div>
        <div className="App-intro">
        {
          result.map(i => (<div key={i.name}>
            <span>{i.name}</span>
            {i.gift ? <span>奖品: {i.gift}</span>
            : <button onClick={this.getGift(i.name)}>抽奖</button>}
          </div>))
        }
        <button onClick={this.reset}>重置结果</button>
      </div>
      </div>

    )
  }

}
