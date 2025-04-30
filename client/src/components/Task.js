import React, { useState } from "react";

export const Task = ({ name }) => {
    const [input, setInput] = useState(name || "");
    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control outline-lighter"
                    placeholder="Add your task"
                    aria-label="Add your task"
                    aria-describedby="button-addon2"
                    title="Click to edit"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="btn btn-outline-secondary bg-success text-white hover-opacity-75 btn-clicked"
                    type="button"
                    id="button-addon2"
                    title="Complete"
                >
                    <i className="bi bi-check fs-3"></i>
                </button>
                <button
                    className="btn btn-outline-secondary bg-danger text-white hover-opacity-75 btn-clicked"
                    type="button"
                    id="button-addon2"
                    title="Delete"
                >
                    <i className="bi bi-trash fs-5"></i>
                </button>
            </div>
        </div>
    );
};
