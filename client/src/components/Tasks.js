import React from "react";
import { Task } from "./Task";

export const Tasks = () => {
    const tasks = [
        { id: 1, title: "Catch some Zs" },
        { id: 2, title: "Work out" },
        { id: 3, title: "Eat less" },
    ];
    return (
        <div className="tasks">
            <div className="container">
                <div className="tasks__wrapper col-12 col-md-9 col-lg-9 col-xl-7 mx-auto">
                    {tasks.map((task) => (
                        <Task key={task.id} name={task.title} />
                    ))}
                </div>
            </div>
        </div>
    );
};
