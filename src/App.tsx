import { useEffect, useState } from "react";
import {useTheme} from './ThemeContext.tsx'
import "./App.css";

interface todoItem {
  id: string;
  texto: string;
  completado: boolean;
}

function App() {
  const chaveTarefaMemoria = "tarefas"

  const {theme, toggleTheme} = useTheme();
  const [todos, setTodos] = useState<todoItem[]>([]);
  const [novoTodo, setNovoTodo] = useState<string>("");
  const [estaCarregado, setEstaCarregado] = useState<boolean>(false);

  const AdicionarTarefa = (): void => {
    if (novoTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: todoItem = {
        id: newId,
        texto: novoTodo,
        completado: false,
      };
      setTodos([...todos, newTodoItem]);
      setNovoTodo("");
    }
  };

  const removerTarefa = (id: string): void => {
    const tarefasAtualizadas = todos.filter((todo) => todo.id !== id);
    setTodos(tarefasAtualizadas);
  };

  const marcarCompleto = (id: string): void => {
    const todosAtualizados = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completado: !todo.completado };
      }
      return todo;
    });
    setTodos(todosAtualizados);
  };

  const obterTarefasCompletas = (): todoItem[] => {
    return todos.filter((todo) => todo.completado);
  };

  useEffect(() => {
    if (estaCarregado) {
      localStorage.setItem(chaveTarefaMemoria, JSON.stringify(todos));
    }
  }, [todos, estaCarregado]);

  useEffect(() => {
    const tarefasDaMemoria = localStorage.getItem("tarefas");
    if (tarefasDaMemoria) setTodos(JSON.parse(tarefasDaMemoria))

      setEstaCarregado(true)
  }, [])

  return (
    <div className={`app ${theme}`}>
      <div className={`container ${theme}`}>
        <h1>
          Lista de tarefas - {obterTarefasCompletas().length} / {todos.length}
        </h1>
        <div className="input-container">
          <input
            type="text"
            value={novoTodo}
            onChange={(e) => setNovoTodo(e.target.value)}
          />
          <button onClick={AdicionarTarefa}>Adicionar tarefa</button>
        </div>
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completado}
                onChange={() => marcarCompleto(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completado ? "line-through" : "none",
                }}
              >
                {todo.texto}
              </span>
              <button onClick={() => removerTarefa(todo.id)}>Remover</button>
            </li>
          ))}
        </ol>
        <button onClick={toggleTheme}>
          Alterar para o tema {theme === 'light' ? 'Escuro': 'Claro'} </button>
      </div>
    </div>
  );
}

export default App;
