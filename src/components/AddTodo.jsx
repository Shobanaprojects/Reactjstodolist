import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import CustomButton from "./CustomButton";
import TodoList from "./TodoList";

const AddTodo = () => {

    const [task, setTask] = useState('')
    const [todolist, setTodolist] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }, [todolist]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todolist'));
        setTodolist(storedTodos);
    }, []);

    const addTask = () => {
        if (task !== '') {
            if (isEditing) {
                const updatedTodolist = [...todolist];
                updatedTodolist[editIndex] = task;
                setTodolist(updatedTodolist);
                setIsEditing(false);
                setEditIndex(null);
            } else {
               
                setTodolist([...todolist, task]);
                
            }
            setTask('');
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter your task!!!');
        }
    }

    const handleEditTask = (index) => {
        setTask(todolist[index]); 
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleRemovetodolist = (index) => {
        const deleteTodolist = todolist.filter((_, i) => i !== index);
        setTodolist(deleteTodolist);
    };



    return (
        <Fragment>
            <div className="row d-flex justify-content-center align-items-center" style={{ minHeight: '300px', overflowY: 'auto' }}>
                <div className="col-md-6 col-8 task-container p-4">
                    <div className="mb-3">
                        <h2 className="text-start">To Do List <FontAwesomeIcon icon={faListCheck} /></h2>
                    </div>
                    <div className="input-group mb-2">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)}/>
                        <CustomButton className="addbutton" title={isEditing ? 'Update' : 'Add'} btnOnclick={addTask} />

                    </div>
                    {errorMessage && <div className="errormsgsize text-danger">{errorMessage}</div>}
                    <TodoList todolist={todolist} onDeletetask={handleRemovetodolist} onEdittask={handleEditTask}/>
                </div>
            </div>
        </Fragment>
    )
}
export default AddTodo;