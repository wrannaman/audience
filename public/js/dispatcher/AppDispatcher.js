import Flux from 'flux';

export default new Flux.Dispatcher();


// import Flux from 'flux';
// import assign from 'react/lib/Object.assign';
//
// var AppDispatcher = assign(new Flux.Dispatcher(), {
//   handleViewAction: function(action) {
//     this.dispatch({
//       source: 'VIEW_ACTION',
//       action: action
//     })
//   }
// })
// export default AppDispatcher;
