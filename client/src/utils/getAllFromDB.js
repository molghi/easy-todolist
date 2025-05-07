import axios from "axios";

const getAllFromDB = async (setTasks, setLoading, userId, baseUrl) => {
    try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/todos/${userId}`); // hit the established route on the back-end, fetch all
        setLoading(false);
        setTasks(res.data); // change react state
    } catch (err) {
        console.error("💥💥💥", err);
    }
};

export default getAllFromDB;
