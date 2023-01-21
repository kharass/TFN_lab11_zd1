import './style.css';
import React, {useState, useEffect} from "react";

import Person from "./components/Person";

function App() {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPerson() {
        fetch("https://randomuser.me/api/")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(person => setPerson(person))
            .catch(error => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchPerson();
    }, []);

    if (loading) return <h1>loading...</h1>;
    if (error) return <pre>{JSON.stringify(error)}</pre>;

    return (
        <>
            <Person person={person}/>
            <button onClick={() => fetchPerson()}>Generate new person</button>
        </>
    );
}

export default App;
