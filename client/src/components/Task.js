import { useState } from "react";
import axios from "axios";
import getAllFromDB from "../utils/getAllFromDB";

export const Task = ({ task, setTasks, setLoading, userId, completedShown, uncompletedShown, baseUrl }) => {
    const [input, setInput] = useState(task.todoName || ""); // todo name
    let showFlag = false;
    if (!completedShown && !uncompletedShown) showFlag = true;
    if (completedShown && task.isCompleted) showFlag = true;
    if (uncompletedShown && !task.isCompleted) showFlag = true;

    const formatDateString = (dateStr) => {
        return new Intl.DateTimeFormat("en-UK", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(new Date(dateStr)); // format date string
    };

    const deleteOne = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`${baseUrl}/todos`, { data: { id: task._id } }, { withCredentials: true });
            setLoading(false);
            if (res.status.toString().startsWith(2)) {
                getAllFromDB(setTasks, setLoading, userId, baseUrl); // check if all good, fetch all from db
            }
        } catch (err) {
            console.error(`💥💥💥 deleteOne`, err);
        }
    };

    const editOne = async () => {
        try {
            setLoading(true);
            const res = await axios.patch(`${baseUrl}/todos/${task._id}`, { todoName: input }, { withCredentials: true }); // edit only todo name
            setLoading(false);
            if (res.status.toString().startsWith(2)) {
                getAllFromDB(setTasks, setLoading, userId, baseUrl); // check if all good, fetch all from db
            }
        } catch (err) {
            console.error(`💥💥💥 editOne`, err);
        }
    };

    const toggleCompleted = async () => {
        try {
            const dateCompleted = task.dateCompleted === null ? new Date().toISOString() : null; // either when or null
            const isCompleted = task.isCompleted ? false : true; // either true or false
            setLoading(true);
            const res = await axios.patch(
                `${baseUrl}/todos/${task._id}`,
                { dateCompleted, isCompleted },
                { withCredentials: true }
            ); // toggle completed of one todo
            setLoading(false);
            if (res.status.toString().startsWith(2)) {
                getAllFromDB(setTasks, setLoading, userId, baseUrl); // check if all good, fetch all from db
            }
        } catch (err) {
            console.error(`💥💥💥 toggleCompleted`, err);
        }
    };

    const taskMarkup = (
        <div className="task mb-3">
            <div className="input-group mb-1">
                <input
                    type="text"
                    className={`form-control outline-lighter ${
                        task.isCompleted ? "text-decoration-line-through text-secondary fst-italic" : ""
                    }`}
                    disabled={task.isCompleted}
                    placeholder="Add your task"
                    aria-label="Add your task"
                    aria-describedby="button-addon2"
                    title={!task.isCompleted ? `Click to edit` : "Uncomplete to edit"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={editOne}
                />
                <button
                    className="btn btn-outline-secondary bg-success text-white hover-opacity-75 btn-clicked"
                    style={{ minWidth: "53px" }}
                    type="button"
                    id="button-addon2"
                    title={task.isCompleted ? `Uncomplete` : "Complete"}
                    onClick={toggleCompleted}
                >
                    <i className="bi bi-check fs-3"></i>
                </button>
                <button
                    className="btn btn-outline-secondary bg-danger text-white hover-opacity-75 btn-clicked"
                    style={{ minWidth: "53px" }}
                    type="button"
                    id="button-addon2"
                    title="Delete"
                    onClick={deleteOne}
                >
                    <i className="bi bi-trash fs-5"></i>
                </button>
            </div>
            <div className="d-flex flex-wrap gap-5 gap-sm">
                <small className="form-text text-white-50 ms-1">Created: {formatDateString(task.dateCreated)}</small>
                {task.isCompleted && (
                    <small className="form-text text-white-50 ms-1">Completed: {formatDateString(task.dateCompleted)}</small>
                )}
            </div>
        </div>
    );

    return showFlag && taskMarkup;
};
