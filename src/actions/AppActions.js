const AppConstants = require('../constants/AppConstants');
const AppDispatcher = require('../dispatchers/AppDispatcher');

const AppActions = {
  nextWord(set, index) {
    AppDispatcher.handleViewAction({
      set,
      index,
      type: AppConstants.NEXT_WORD
    });
  },
  previousWord(set, index) {
    AppDispatcher.handleViewAction({
      set,
      index,
      type: AppConstants.PREVIOUS_WORD
    });
  }
}

export default AppActions;
