import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import Todo from '../Todo/Todo';
import { todoI } from '../interfaces/todoI';
import styles from './TodoList.module.scss'


const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<todoI[]>([]);
    const [completedTodos, setCompletedTodos] = useState<number>(0)
    const [newTodo, setNewTodo] = useState<string>('');
    const [todoId, setTodoId] = useState(1)
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [isAllCompleted, setIsAllCompleted] = useState(false);

    const onChangeTodo = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const updatedTodos = todos.map((todo) => {
            return todo?.id === id ? { ...todo, isСompleted: e.target.checked } : todo
        }
        );
        setTodos(updatedTodos);
    };

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTodo();
        }
    }

    const addTodo = () => {
        setTodoId(prev => prev += 1);
        setTodos([{ todo: newTodo, isСompleted: false, id: todoId }, ...todos]);
        setNewTodo(''); // очищаем input после добавления
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTodo.trim()) {
            addTodo();
            e.preventDefault(); // предотвращает отправку формы при нажатии Enter
        }
    }


    const filteredTodo = todos.filter((todo) => {
        if (filter === 'completed') {
            return todo.isСompleted;
        } else if (filter === 'active') {
            return !todo.isСompleted;
        } else {
            return true;
        }
    });

    const countComplitedTodo = todos.filter((todo) => todo.isСompleted).length

    const handleClearComplited = () => {
        const remainingTodos = todos.filter((todo) => !todo.isСompleted);
        const completedCount = todos.length - remainingTodos.length;

        setTodos(remainingTodos);
        setCompletedTodos(prev => prev + completedCount);
    };

    const handleAllCompleted = () => {
        setTodos((prev) => {
            return prev.map(todo => ({ ...todo, isСompleted: !isAllCompleted }));
        });
    }

    const removeTodo = (id: number) => {
        setTodos((prev) => {
            return prev.filter(todo => todo.id !== id)
        })

    }

    useEffect(() => {
        const allCompleted = todos.length > 0 && todos.every(todo => todo.isСompleted);
        setIsAllCompleted(allCompleted);
    }, [todos]);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>

                <div className={styles.formTodoContainer}>
                    <div className={styles.formContainer}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                className={styles.inputAddTodo}
                                type="text"
                                value={newTodo}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder='Add todo...'
                            />
                            <div className={styles.addTodo} onClick={handleAddTodo}>ADD TODO</div>
                        </form>
                    </div>

                    <div className={styles.completedAll}>
                        <label >
                            <input type="checkbox" checked={isAllCompleted} onChange={handleAllCompleted} /> <span>Completed all</span>
                        </label>

                    </div>

                    <div className={styles.todoContainer}>
                        {filteredTodo.map((todo) => {
                            return (
                                <div key={todo.id}>
                                    <Todo
                                        onChangeTodo={onChangeTodo}
                                        removeTodo={removeTodo}
                                        todo={todo.todo}
                                        id={todo.id}
                                        isСompleted={todo.isСompleted}
                                        setTodos={setTodos}
                                    />
                                </div>

                            )
                        })}
                    </div>
                </div>


                <div className={styles.footerContainer}>
                    <div className={styles.completedTodo}>
                        <div>completed: {countComplitedTodo}</div>
                        <div>{completedTodos} items left</div>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <div className={styles.allButton} onClick={() => setFilter('all')}>All</div>
                        <div className={styles.activeButton} onClick={() => setFilter('active')}>Active</div>
                        <div className={styles.completedButton} onClick={() => setFilter('completed')}>Completed</div>
                    </div>

                    <div className={styles.clearCompleted} onClick={handleClearComplited}>
                        clear Completed
                    </div>

                </div>
            </div>


        </div>
    );
};

export default TodoList;


