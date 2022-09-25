import React, { Dispatch } from 'react';
import './styles.css';

interface Props {
    todo: string;
    setTodo: Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({
    todo,
    setTodo,
    handleAdd
}) => {
    return (
        <form className="input" onSubmit={handleAdd}>
            <input 
                type="input" 
                placeholder="Enter a text" 
                className="input__box" 
                value={todo} 
                onChange={(e) => setTodo(e.target.value)} 
            />
            <button className="input_submit" type="submit">Go</button>
        </form>
    )
}

export default InputField;