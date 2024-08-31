import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdatedTodo from '../modules/UpdatedTodo/UpdatedTodo';

describe('UpdatedTodo Component', () => {
    const mockSetTodos = jest.fn();
    const mockSetMutation = jest.fn();

    const mockTodo = {
        id: 1,
        todo: 'Test Todo',
        isСompleted: false,
        onChangeTodo: jest.fn(),
        removeTodo: jest.fn(),
        setTodos: mockSetTodos,
    };

    test('should update todo when the UPDATE button is clicked', () => {
        render(<UpdatedTodo {...mockTodo} setTodos={mockSetTodos} setMutation={mockSetMutation} />);

        const input = screen.getByDisplayValue('Test Todo');
        fireEvent.change(input, { target: { value: 'Updated Todo' } });

        const updateButton = screen.getByText('UPDATE');
        fireEvent.click(updateButton);

        expect(mockSetTodos).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetMutation).toHaveBeenCalled();
    });
});
