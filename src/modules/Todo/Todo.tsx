import React, { useState } from 'react';
import { todoI } from '../interfaces/todoI';
import styles from './Todo.module.scss'
import basket from '../../assets/basket.png'
import update from '../../assets/update.png'
import UpdatedTodo from '../UpdatedTodo/UpdatedTodo';

const Todo: React.FC<todoI> = ({ todo, id, isСompleted, onChangeTodo, removeTodo, setTodos }) => {

    const [mutation, setMutation] = useState(false)

    return (
        !mutation ?
            <div className={styles.mainContainer}>
                <div className={styles.todoContainer}>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            onChange={(e) => onChangeTodo?.(e, id)}
                            checked={isСompleted}
                        />
                        <span className={styles.customCheckbox}></span> {/* Кастомный элемент для чекбокса */}
                        <div className={isСompleted ? styles.todoWithLineThrough : styles.todo}>
                            {todo}
                        </div>

                    </label>
                </div>

                <div className={styles.updateTodo}>
                    <img src={update} alt="Update" onClick={() => setMutation?.(prev => !prev)} />
                </div>

                <div className={styles.remove}>
                    <img src={basket} alt="basket icon" onClick={() => removeTodo?.(id)} />
                </div>
            </div>

            :

            <UpdatedTodo todo={todo} id={id} setTodos={setTodos} setMutation={setMutation} />

    );
};

export default React.memo(Todo);