import React, { Component, PropTypes } from 'react'
import AppStore from '../stores/AppStore.js'
import AppActions from '../actions/AppActions.js'
import SpeakService from '../SpeakService.js'

class App extends Component {
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

  componentWillUnmount () {

  }

  previousWord () {
    AppActions.previousWord(this.state.set, this.state.index)
  }

  nextWord () {
    AppActions.nextWord(this.state.set, this.state.index)
  }

  previousWordOld () {
    // Move to Flux
    let i = this.state.i - 1
    let set = this.state.set
    if (i < 0) i = 0

    const wordConfig = AppStore.getWord(set, i)

    this.setState({
      i: wordConfig.i,
      set: wordConfig.set,
      word: wordConfig.word
    })
  }

  nextWordOld () {
    // Move to Flux
    let i = this.state.i + 1
    let set = this.state.set

    const wordConfig = AppStore.getWord(set, i)

    this.setState({
      i: wordConfig.i,
      set: wordConfig.set,
      word: wordConfig.word
    })
  }

  say () {
    SpeakService.say(this.state.word)
  }

  render () {
    let size = '150px'

    return (
      <div>
        <button onClick={this.previousWord} className='btn btn-primary pull-left' style={{lineHeight: size}}>previous</button>
        <button onClick={this.nextWord} className='btn btn-primary pull-right' style={{lineHeight: size}}>next</button>
        <h1 className='text-center' onClick={this.say} style={{lineHeight: size, fontSize: size}}>{this.state.currentWord}</h1>
    </div>
    )
  }
}

export default App
