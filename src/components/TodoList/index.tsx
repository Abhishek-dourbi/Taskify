import React from 'react';
import { Todo } from '../../model';
import TodoCard from '../TodoCard';
import './styles.css';
import { Droppable } from '@hello-pangea/dnd';

interface Props {
   todos: Todo[];
   completedTodos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos
}) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided) => (
                        <div 
                            className="todos" 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Active Todos
                            </span>
                            {
                                todos.map((todo, index) => (
                                    <TodoCard 
                                        key={todo.id}
                                        index={index}
                                        todo={todo} 
                                        todos={todos} 
                                        setTodos={setTodos}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {
                    (provided) => (
                        <div 
                            className="todos remove"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className="todos__heading">
                                Completed Todos
                            </span>
                            {
                                completedTodos.map((todo, index) => (
                                    <TodoCard 
                                        key={todo.id}
                                        index={index}
                                        todo={todo} 
                                        todos={completedTodos} 
                                        setTodos={setCompletedTodos}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default TodoList;