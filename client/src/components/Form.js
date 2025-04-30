import React from "react";

export const Form = () => {
    return (
        <div className="form-block margin-big">
            <div className="container">
                <form className="form col-12 col-md-9 col-lg-9 col-xl-7 mx-auto">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control outline-lighter"
                            placeholder="Add your task"
                            aria-label="Add your task"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn btn-outline-secondary bg-info text-black hover-opacity-75 btn-clicked"
                            type="button"
                            id="button-addon2"
                            title="Add"
                        >
                            <i className="bi bi-plus fs-3"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
