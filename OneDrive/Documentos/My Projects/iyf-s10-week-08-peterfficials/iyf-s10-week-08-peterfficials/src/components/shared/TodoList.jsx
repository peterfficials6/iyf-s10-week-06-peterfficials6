import { useState } from 'react';

function TodoList() {
    // Array of todo objects
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a project', completed: false }
    ]);
    
    // Input field state
    const [inputValue, setInputValue] = useState('');
    
    // Add new todo
    const addTodo = () => {
        if (!inputValue.trim()) return; // Don't add empty
        
        const newTodo = {
            id: Date.now(), // Simple unique ID
            text: inputValue,
            completed: false
        };
        
        // Create NEW array with spread (never mutate!)
        setTodos([...todos, newTodo]);
        setInputValue(''); // Clear input
    };
    
    // Toggle complete/incomplete
    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };
    
    // Delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    
    return (
        <div className="todo-list">
            <h3>My Todos</h3>
            
            <div className="todo-input">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add a new todo..."
                />
                <button onClick={addTodo}>Add</button>
            </div>
            
            <ul>
                {todos.map(todo => (
                    <li 
                        key={todo.id}
                        className={todo.completed ? 'completed' : ''}
                    >
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.completed ? '✅' : '⬜'} {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;