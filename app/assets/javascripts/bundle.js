/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	TodoStore = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var _todos = [],
	    _callbacks = [];
	
	var TodoStore = {
	
	  addChangeHandler: function (cb) {
	    _callbacks.push(cb);
	  },
	
	  removeChangeHandler: function (cb) {
	    var index = _callbacks.indexOf(cb);
	
	    if (index === -1) {
	      return;
	    }
	
	    _callbacks.splice(index, 1);
	  },
	
	  changed: function () {
	    _callbacks.forEach(function (cb) {
	      cb();
	    });
	  },
	
	  all: function () {
	    return _todos.slice();
	  },
	
	  fetch: function () {
	    $.get('api/todos', {}, function (todos) {
	      _todos = todos;
	      TodoStore.changed();
	    });
	  },
	
	  create: function (todo) {
	    // do we need reference to todo in our anonymous function
	    $.post('api/todos', { todos: todo }, function () {
	      _todos.push(todo);
	      TodoStore.changed();
	    });
	  },
	
	  destroy: function (id) {
	    var deleteItemIdx = this.find(id);
	
	    if (deleteItemIdx !== -1) {
	      $.ajax({
	        url: "/api/todos/" + id,
	        type: 'DELETE',
	        success: function () {
	          _todos.splice(deleteItemIdx, 1);
	          TodoStore.changed();
	        }
	      });
	    }
	  },
	
	  find: function (id) {
	    for (var i = 0; i < _todos.length; i++) {
	      if (_todos[i].id === id) {
	        return i;
	      }
	    }
	  },
	
	  updateDone: function (id) {
	    var updateItemIdx = this.find(id);
	    var currentTodo = _todos[updateItemIdx];
	
	    if (updateItemIdx !== -1) {
	      $.ajax({
	        url: "/api/todos/" + id,
	        data: { todos: currentTodo },
	        type: "PATCH",
	        success: (function () {
	          this.toggleDone(updateItemIdx);
	          TodoStore.changed();
	        }).bind(this)
	      });
	    }
	  },
	
	  toggleDone: function (toggleIdx) {
	    if (_todos[toggleIdx].done === true) {
	      _todos[toggleIdx].done = false;
	    } else {
	      _todos[toggleIdx].done = true;
	    }
	  }
	};
	
	module.exports = TodoStore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map