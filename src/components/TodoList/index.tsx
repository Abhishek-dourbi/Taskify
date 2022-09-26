import React from 'react';
import { Todo } from '../../model';
import TodoCard from '../TodoCard';
import './styles.css';

interface Props {
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
    todos,
    setTodos
}) => {
    return (
        <div className="container">
            <div className="todos">
                <span className="todos__heading">
                    Active Todos
                </span>
                {
                    todos.map((todo) => (
                        <TodoCard 
                            key={todo.id}
                            todo={todo} 
                            todos={todos} 
                            setTodos={setTodos}
                        />
                    ))
                }
            </div>
            <div className="todos remove">
                <span className="todos__heading">
                    Completed Todos
                </span>
                {
                    todos.map((todo) => (
                        <TodoCard 
                            key={todo.id}
                            todo={todo} 
                            todos={todos} 
                            setTodos={setTodos}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TodoList;