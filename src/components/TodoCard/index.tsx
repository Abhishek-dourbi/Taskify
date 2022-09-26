import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from '@hello-pangea/dnd';
import './styles.css';

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoCard: React.FC<Props> = ({
    index,
    todo,
    todos,
    setTodos
}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus(); 
    }, [edit]);

    const handleEdit = () => {
        if(!edit && !todo.isDone) {
            setEdit(!edit);
        }
    }

    const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTodo(e.target.value)
    }

    const handleEditSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo } : todo));
        setEdit(false);
    }

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo ))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided, snapshot) => (
                    <form 
                        className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`} 
                        onSubmit={(e) => handleEditSubmit(e, todo.id)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {
                            edit ? <input ref={inputRef} value={editTodo} onChange={onEditChange} className="todos__single--text" /> : (
                                todo.isDone ? 
                                <s className="todos__single--text">
                                    {todo.todo}
                                </s> : 
                                <span className="todos__single--text">
                                    {todo.todo}
                                </span>
                            )
                        }

                        <div>
                            <span className="icon" onClick={handleEdit}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={() => handleDone(todo.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default TodoCard;