import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../modules/TodoList/TodoList';

describe('TodoList Component', () => {
    it('renders without crashing', () => {
        render(<TodoList />);
        expect(screen.getByPlaceholderText('Add todo...')).toBeInTheDocument();
    });

    it('adds a new todo item', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add todo...');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(screen.getByText('ADD TODO'));
        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    it('filters active todos', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add todo...');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(screen.getByText('ADD TODO'));

        fireEvent.click(screen.getByText('Active'));
        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    it('marks all todos as completed', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add todo...');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(screen.getByText('ADD TODO'));

        const completeAllCheckbox = screen.getByLabelText('Completed all');
        fireEvent.click(completeAllCheckbox);
        expect(completeAllCheckbox).toBeChecked();
    });

    it('clears completed todos', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add todo...');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(screen.getByText('ADD TODO'));

        const completeAllCheckbox = screen.getByLabelText('Completed all');
        fireEvent.click(completeAllCheckbox);

        fireEvent.click(screen.getByText('clear Completed'));
        expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
    });
});
