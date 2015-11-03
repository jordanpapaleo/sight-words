import AppConstants from '../constants/AppConstants'
import Store from './Store.js'

class AppStore extends Store {
  constructor () {
    super()

    this.subscribe(() => this._registerToActions.bind(this))
    this.state = {
      _allSets: [
        {
          setId: 0,
          level: 1,
          words: ['A', 'All', 'At']
          // words: ['the', 'you', 'on', 'I', 'of', 'that', 'are', 'at', 'and', 'it', 'as', 'be', 'to', 'he', 'with', 'this', 'in', 'was', 'his', 'have', 'is', 'for', 'they', 'from']
        },
        {
          setId: 1,
          level: 2,
          words: ['B', 'Ball', 'Bat']
          // words: ['or', 'not', 'your', 'each', 'one', 'what', 'can', 'which', 'had', 'all', 'said', 'she', 'by', 'were', 'there', 'do', 'word', 'we', 'use', 'how', 'buy', 'when', 'an', 'their']
        }
      ]
    }

    this.getWord = this.getWord.bind(this)
  }

  getWord (set, i) {
    this.currentWord = this.state._allSets[set].words[i]
    return this.currentWord;
  }

  _registerToActions (dispatch) {
    let { set, index, type } = dispatch.action
    const { _allSets } = this.state

    switch (type) {
      case AppConstants.PREVIOUS_WORD:
        if (index > 0) {
          index--
        } else if (index === 0 && set !== 0) {
          set--
          index = _allSets[set].words.length - 1
        }
        break
      case AppConstants.NEXT_WORD:
        if (index === _allSets[set].words.length - 1) {
          if (set < _allSets.length - 1) {
            set++
            index = 0
          }
        } else {
          index++
        }
        break
      case AppConstants.CURRENT_WORD:
        // use the provided set and index
        break
      default:
        break
    }

    const activeWord = this.getWord(set, index)

    this.emitChange({set, index, activeWord})
  }
}

export default new AppStore()
