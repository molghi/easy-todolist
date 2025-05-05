import React, { useState } from "react";
import axios from "axios";
import getAllFromDB from "../utils/getAllFromDB";

export const Form = ({
    setTasks,
    setLoading,
    userId,
    completedShown,
    setCompletedShown,
    uncompletedShown,
    setUncompletedShown,
}) => {
    const [formInput, setFormInput] = useState(""); // 'add your task' input

    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await axios.post("http://localhost:5000/todos", { todoName: formInput, userId }); // post new to established backend route
            setLoading(false);
            if (res.status.toString().startsWith(2)) {
                getAllFromDB(setTasks, setLoading, userId); // check if all good, fetch all from db
                setFormInput("");
            }
        } catch (error) {
            console.error(`💥💥💥`, error);
        }
    };

    return (
        <div className="form-block margin-medium">
            <div className="container">
                <form className="form col-12 col-md-9 col-lg-9 col-xl-7 mx-auto" onSubmit={formSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="form-input"
                            className="form-control outline-lighter"
                            placeholder="Add your task"
                            aria-label="Add your task"
                            aria-describedby="button-addon2"
                            value={formInput}
                            onChange={(e) => setFormInput(e.target.value)}
                            autoFocus
                            autoComplete="off"
                        />
                        <button
                            className="btn btn-outline-secondary bg-info text-black hover-opacity-75 btn-clicked"
                            type="submit"
                            id="button-addon2"
                            title="Add"
                        >
                            <i className="bi bi-plus fs-3"></i>
                        </button>
                    </div>
                    <div className="checks d-flex gap-4">
                        <span className="text-white fw-bold">View Mode:</span>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkDefault"
                                checked={completedShown}
                                onChange={() => setCompletedShown((prev) => !prev)}
                            />
                            <label
                                className="form-check-label text-white"
                                htmlFor="checkDefault"
                                title="View completed tasks"
                                style={{ cursor: "pointer" }}
                            >
                                Completed
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkChecked"
                                checked={uncompletedShown}
                                onChange={() => setUncompletedShown((prev) => !prev)}
                            />
                            <label
                                className="form-check-label text-white"
                                htmlFor="checkChecked"
                                title="View uncompleted tasks"
                                style={{ cursor: "pointer" }}
                            >
                                Uncompleted
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
