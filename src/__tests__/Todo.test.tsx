import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../modules/Todo/Todo';

describe('Todo Component', () => {
    const mockTodo = {
        id: 1,
        todo: 'Test Todo',
        isСompleted: false,
        onChangeTodo: jest.fn(),
        removeTodo: jest.fn(),
        setTodos: jest.fn(),
    };

    test('should toggle todo completion status', () => {
        render(<Todo {...mockTodo} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockTodo.onChangeTodo).toHaveBeenCalledWith(expect.anything(), mockTodo.id);
    });

    test('should call removeTodo when the remove button is clicked', () => {
        render(<Todo {...mockTodo} />);

        const removeButton = screen.getByAltText('basket icon');
        fireEvent.click(removeButton);

        expect(mockTodo.removeTodo).toHaveBeenCalledWith(mockTodo.id);
    });

    test('should toggle edit mode when the update button is clicked', () => {
        render(<Todo {...mockTodo} />);

        const updateButton = screen.getByAltText('Update');
        fireEvent.click(updateButton);

        expect(screen.getByDisplayValue(mockTodo.todo)).toBeInTheDocument();
    });
});

