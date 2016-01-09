import { Dispatcher } from 'flux';
import assign from 'react/lib/Object.assign';

const AppDispatcher = assign(new Dispatcher(), {
  handleViewAction(action) {
    this.dispatch({
      action,
      source: 'VIEW_ACTION'
    });
  }
})

module.exports = AppDispatcher;
