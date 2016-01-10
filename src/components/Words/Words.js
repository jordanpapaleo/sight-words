import React, { Component, PropTypes } from 'react'
import AppStore from 'stores/AppStore.js'
import AppActions from 'actions/AppActions.js'
import SpeakService from 'SpeakService.js'

export default class Words extends Component {
  static get displayName () {
    return 'Words'
  }

  constructor (props) {
    super(props)

    this.state = {
      set: 0,
      index: 0,
      currentWord: AppStore.getWord(0, 0),
      nextWord: '',
      previousWord: ''
    }

    this.previousWord = this.previousWord.bind(this)
    this.nextWord = this.nextWord.bind(this)
    this.say = this.say.bind(this)
  }

  componentWillMount () {
    AppStore.addChangeListener((payload) => {
      console.log('Payload', payload)
      this.setState({
        currentWord: payload.activeWord,
        set: payload.set,
        index: payload.index
      })
    })
  }

  previousWord () {
    AppActions.previousWord(this.state.set, this.state.index)
  }

  nextWord () {
    AppActions.nextWord(this.state.set, this.state.index)
  }

  say () {
    SpeakService.say(this.state.currentWord)
  }

  render () {
    const size = '150px'

    return (
      <div>
        <button onClick={this.previousWord} className='btn btn-primary pull-left' style={{lineHeight: size}}>previous</button>
        <button onClick={this.nextWord} className='btn btn-primary pull-right' style={{lineHeight: size}}>next</button>
        <h1 className='text-center' onClick={this.say} style={{lineHeight: size, fontSize: size}}>{this.state.currentWord}</h1>
      </div>
    )
  }
}
