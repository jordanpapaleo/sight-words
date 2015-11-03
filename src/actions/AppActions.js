var AppConstants = require('../constants/AppConstants')
var AppDispatcher = require('../dispatchers/AppDispatcher')

var AppActions = {
  nextWord (set, index) {
    AppDispatcher.handleViewAction({
      set,
      index,
      type: AppConstants.NEXT_WORD
    })
  },
  previousWord (set, index) {
    AppDispatcher.handleViewAction({
      set,
      index,
      type: AppConstants.PREVIOUS_WORD
    })
  }
}

export default AppActions
