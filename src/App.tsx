import { useState } from 'react'
import './App.css'


interface todoItem {
 id: string
 texto: string
 completado: boolean
}

function App() {
  const [todos, setTodos] = useState<todoItem[]>([])
  const [newTodo, setNewTodo] = useState<string>("")

  const AdicionarTarefa = () => {
    if(newTodo !== "") {
      const newId = crypto.randomUUID()
      const newTodoItem: todoItem = {
        id: newId,
        texto: newTodo,
        completado: false
      }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }
  }

  const removerTarefa = (id: string) => {
    const tarefasAtualizadas = todos.filter((todo) => todo.id !== id)
    setTodos(tarefasAtualizadas)
  } 

  const marcarCompleto = (id: string) => {
    const todosAtualizados = todos.map((todo) => {
      if(todo.id === id) {
        return { ...todo, completado: !todo.completado}
      }
      return todo
    })
    setTodos(todosAtualizados)
  }

  return (
    <div className='app'>
        <div className="container">
          <h1>Lista de tarefas</h1>
          <div className='input-container'>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={AdicionarTarefa}>Adicionar tarefa</button>
          </div>
          <ol>
            {
              todos.map((todo) => (
                 <li key={todo.id}>
                  <input type="checkbox" checked={todo.completado} onChange={() => marcarCompleto(todo.id)} />
                  <span style={{textDecoration: todo.completado ? 'line-through' : 'none'}}>{todo.texto}</span>
                  <button onClick={() => removerTarefa(todo.id)}>Remover</button>
                 </li>
                 
              ))
               
              
            }
          </ol>
        </div>
    </div>
  )
}

export default App
