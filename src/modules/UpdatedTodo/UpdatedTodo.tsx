import { useState, KeyboardEvent } from "react";
import { todoI } from "../interfaces/todoI";
import styles from './UpdatedTodo.module.scss'

const UpdatedTodo: React.FC<todoI> = ({ todo, id, setTodos, setMutation }) => {

    const [mutationTodo, setMutationTodo] = useState(todo)
    console.log(11);

    const updateTodo = (id: number): void => {
        if (setTodos && setMutation) {
            setTodos(prev => {
                const updatedTodos = prev.map(todo =>
                    id === todo?.id ? { ...todo, todo: mutationTodo } : todo
                );
                return updatedTodos;
            });

            setMutation(prev => !prev);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && mutationTodo.trim()) {
            updateTodo(id);
        }
    };


    return (
        <div className={styles.mainConteiner}>
            <input
                type="text"
                value={mutationTodo}
                onChange={(e) => setMutationTodo(e.target.value)}
                onKeyDown={handleKeyDown} />
            <div className={styles.updateTodo} onClick={() => updateTodo(id)}>UPDATE</div>

        </div>
    );
};

export default UpdatedTodo;