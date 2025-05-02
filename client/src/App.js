import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(tasks);

    return (
        <>
            <Header />
            <Form setTasks={setTasks} setLoading={setLoading} />
            <Tasks tasks={tasks} setTasks={setTasks} loading={loading} setLoading={setLoading} />
        </>
    );
}

export default App;
