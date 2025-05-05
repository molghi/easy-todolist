import { useEffect } from "react";
import { Task } from "./Task";
import getAllFromDB from "../utils/getAllFromDB";
import typewriterEffect from "../utils/typewriterEffect";

export const Tasks = ({ tasks, setTasks, loading, setLoading, userId }) => {
    let timer;
    useEffect(() => {
        if (userId) getAllFromDB(setTasks, setLoading, userId); // fetch all on component mount
    }, [userId, setTasks, setLoading]);

    useEffect(() => {
        if (loading) typewriterEffect(timer);
    }, [loading, timer]);

    return (
        <div className="tasks">
            <div className="container">
                <div className="tasks__wrapper col-12 col-md-9 col-lg-9 col-xl-7 mx-auto">
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="text-white-50 mb-3 lead">Tasks: {tasks.length}</div>
                        <div className="text-white-50 mb-3 lead">
                            {loading && (
                                <span className="loading" data-list="..." style={{ minWidth: "85px", display: "inline-block" }}>
                                    Loading
                                </span>
                            )}
                        </div>
                    </div>
                    {tasks &&
                        tasks.length > 0 &&
                        tasks.map((task) => (
                            <Task key={task._id} task={task} setTasks={setTasks} setLoading={setLoading} userId={userId} />
                        ))}
                </div>
            </div>
        </div>
    );
};
