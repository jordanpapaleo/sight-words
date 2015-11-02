import AppDispatcher from '../dispatchers/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import _ from 'lodash'

var assign = require('react/lib/Object.assign')
var EventEmitter = require('events').EventEmitter

const CHANGE_EVENT = 'change'
const _allSets = [
  {
    setId: 0,
    level: 1,
    words: ['A', 'All', 'Day']
    // words: ['the', 'you', 'on', 'I', 'of', 'that', 'are', 'at', 'and', 'it', 'as', 'be', 'to', 'he', 'with', 'this', 'in', 'was', 'his', 'have', 'is', 'for', 'they', 'from']
  },
  {
    setId: 1,
    level: 2,
    words: ['or', 'not', 'your', 'each', 'one', 'what', 'can', 'which', 'had', 'all', 'said', 'she', 'by', 'were', 'there', 'do', 'word', 'we', 'use', 'how', 'buy', 'when', 'an', 'their']
  }
]

var AppStore = assign(EventEmitter.prototype, {
  emitChange () {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  getWord (set, i) {
    console.log('i', i)
    // Advance set
    if (i === _allSets[set].words.length) {
      if (set < _allSets.length - 1) {
        set++
        i = 0
      }
    }

    // Go back set


    return {
      i: i,
      set: set,
      word: _allSets[set].words[i]
    }
  },
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action

    switch (action.actionType) {
      case AppConstants.CHANGE_SET:
        _getSet(payload.action.level)
        break
      case AppConstants.NEXT_WORD:
        _nextWord(payload.action.index)
        break
      case AppConstants.PREVIOUS_WORD:
        _previousWord(payload.action.index)
        break
    }

    AppStore.emitChange()
    return true
  })
})

export default AppStore
