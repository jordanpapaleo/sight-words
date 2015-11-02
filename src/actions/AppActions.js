var AppConstants = require('../constants/AppConstants')
var AppDispatcher = require('../dispatchers/AppDispatcher')

var AppActions = {
  changeSet (level) {
    AppDispatcher.handleViewAction({
      level,
      actionType: AppConstants.CHANGE_SET
    })
  },
  nextWord (index) {
    AppDispatcher.handleViewAction({
      index,
      actionType: AppConstants.NEXT_WORD
    })
  },
  previousWord (index) {
    AppDispatcher.handleViewAction({
      index,
      actionType: AppConstants.PREVIOUS_WORD
    })
  }
}

export default AppActions
