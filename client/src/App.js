import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";

function App() {
    return (
        <>
            <Header />
            <Form />
            <Tasks />
        </>
    );
}

export default App;
