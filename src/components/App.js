import React, { Component, PropTypes } from 'react'
import AppStore from '../stores/AppStore.js'
import SpeakService from '../SpeakService.js'

class App extends Component {
  static get displayName () {
    return ''
  }

  static get propTypes () {
    return {}
  }

  static get defaultProps () {
    return {}
  }

  constructor (props) {
    super(props)

    this.state = {}
    this.previousWord = this.previousWord.bind(this)
    this.nextWord = this.nextWord.bind(this)
    this.say = this.say.bind(this)
  }

  componentWillMount () {
    const i = 0
    const set = 0

    const wordConfig = AppStore.getWord(set, i)

    this.setState({
      i: wordConfig.i,
      set: wordConfig.set,
      word: wordConfig.word
    })
  }

  previousWord () {
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

  nextWord () {
    // Move to Flux
    let i = this.state.i + 1
    let set = this.state.set

    const wordConfig = AppStore.getWord(set, i)

actions    this.setState({
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
        <h1 className='text-center' onClick={this.say} style={{lineHeight: size, fontSize: size}}>{this.state.word}</h1>
    </div>
    )
  }
}

export default App
