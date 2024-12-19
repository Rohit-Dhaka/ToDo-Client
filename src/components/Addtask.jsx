import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Addtask = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/Task/createtask', { task, description,completed});
            setMessage(response.data.msg);
            setTask('');
            setDescription('');
            tasksfetch();
            setCompleted(false);
        } catch (error) {
            console.error(error);
            setMessage('Error: Failed to create task');
        }

    };

    const tasksfetch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/Task/taskall');
            setTasks(response.data.alltask);
        } catch (error) {
            console.error(error);
            setMessage("Some error");
        }
    };

    useEffect(() => {
        tasksfetch();
    }, []);

    const removetask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/Task/taskremove/${id}`);
            setMessage(response.data.msg);
            tasksfetch();
        } catch (error) {
            console.error(error);
        }
    };

    const updatetask = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/Task/taskupdate/${id}`);
            setMessage(response.data.msg);
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Add a New Task</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="completed" className="text-gray-600">Completed</label>
                        <input
                            type="checkbox"
                            id="completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="ml-2"
                        />
                    </div>

                    {message && <p className="text-red-500 text-center">{message}</p>}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Add task
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
                {tasks.length > 0 ? (
                    <ul className="space-y-4">
                        {tasks.map((task) => (
                            <li key={task._id} className="bg-gray-50 p-4 rounded-lg shadow-sm border flex items-center justify-between">
                                <div className="">
                                    <h3 className="font-semibold text-lg text-gray-800">{task.task}</h3>
                                    <p className="text-gray-600">{task.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="bg-blue-600 text-white rounded-md py-1 px-2"
                                        onClick={() => updatetask(task._id)}

                                    >Update Task</button>

                                    <button
                                        className="bg-red-600 text-white rounded-md py-1 px-2"
                                        onClick={() => removetask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No tasks yet</p>
                )}
            </div>
        </section>
    );
};

export default Addtask;
