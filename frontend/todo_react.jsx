var TodoList = require("./components/todo_list.jsx"),
    React = require('react'),
    ReactDOM = require('react-dom');

    // window.TodoStore = require("./stores/todo_store");
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <TodoList/>,
    document.getElementById('root')
  );
});
