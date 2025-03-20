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
        const storedTodos = JSON.parse(localStorage.getItem('todolist'));
        if (storedTodos) {
            setTodolist(storedTodos);
        }
    }, []);

    useEffect(() => {

        localStorage.setItem('todolist', JSON.stringify(todolist));

    }, [todolist]);



    const addTask = () => {
        if (task.trim() === "") {
            setErrorMessage("Please enter your task!!!");
            return;
        }

        if (!/^[a-zA-Z\s.,!?;:'"@#$%^&*()_+=\-[\]{}|\\<>/~`]+$/.test(task)) {
            setErrorMessage("Numbers are not allowed!");
            return;
        }

        if (isEditing) {
            const updatedTodolist = [...todolist];
            updatedTodolist[editIndex].text = task;
            setTodolist(updatedTodolist);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            const newTodolist = [...todolist, { text: task, checked: false }];
            setTodolist(newTodolist);
        }

        setTask("");
        setErrorMessage("");
    }

    const handleEditTask = (index) => {
        setTask(todolist[index].text);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleToggleCheck = (index) => {
        const updatedTodolist = todolist.map((item, i) =>
            i === index ? { ...item, checked: !item.checked } : item
        );

        setTodolist(updatedTodolist);
        localStorage.setItem("todolist", JSON.stringify(updatedTodolist)); // Ensure persistence
    };

    const handleRemovetodolist = (index) => {
        const deleteTodolist = todolist.filter((_, i) => i !== index);
        setTodolist(deleteTodolist);
        localStorage.setItem("todolist", JSON.stringify(deleteTodolist));

    };

    return (
        <Fragment>
            <div className="d-flex justify-content-center mt-5">
                <div className="bg-white todolister">
                    <div className="">
                        <h2 className="text-start">To Do List <FontAwesomeIcon icon={faListCheck} /></h2>
                    </div>
                    <div className="input-group input-focus-group">
                        <input type="text" className="form-control border-end-0" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") addTask();
                        }} />
                        <CustomButton className="addbutton" title={isEditing ? 'Update' : 'Add'} btnOnclick={addTask} />
                    </div>
                    {errorMessage && <div className="errormsgsize text-danger">{errorMessage}</div>}
                    <TodoList todolist={todolist} onDeletetask={handleRemovetodolist} onEdittask={handleEditTask} onToggleCheck={handleToggleCheck} />
                </div>
            </div>
        </Fragment>
    )
}
export default AddTodo;