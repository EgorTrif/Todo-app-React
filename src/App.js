import React, {useEffect} from 'react';
import TodoList from './to-do/to-doList';
import Context from './context'
import Loader from './loader'
import Modal from './modal/modal';

const AddTodo = React.lazy(() => import('./to-do/AddTo-do'))

function App() { 

  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => setTimeout(() => {
      setTodos(todos)
      setLoading(false)
    }, 2000))
  }, [])


  function toggleTodo(id) {
    setTodos(
    todos.map(todo => {
      if (todo.id === id) {
        todo.complited = !todo.complited
      }
      return todo
    }))
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      complited: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
    <div className="wrapper">
      <h1>React App</h1>
      <Modal/>
      <React.Suspense fallback={<p>loading</p>}>
      <AddTodo onCreate={addTodo}></AddTodo></React.Suspense>
      {loading && <Loader />}
      {todos.length ? (
      <TodoList todos={todos} onToggle={toggleTodo}/>
      ) : loading ? null : (
      <p>No todos!</p>
      )}
    </div>
    </Context.Provider>
  );
}

export default App;
