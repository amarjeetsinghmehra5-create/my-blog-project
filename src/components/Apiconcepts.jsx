import { useEffect, useState } from "react";


function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(()=>{
            fetch('https://jsonplaceholder.typicode.com/users')

                .then((response) => {
                    if (!response.ok) {
                        throw new error("Something went wrong.....");
                    }
                    return response.json();
                })
                .then((data) => {
                    setUsers(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message)
                    setLoading(false);
                });
            },2000)
            }, []);
    if (loading) {
        return <h1>Loading.....</h1>;
    }
    if (error) {
        return <h1>Error:{error}</h1>
    }
    return (
        <>
            <h1>Users Data</h1>

                   {users.map((users)=>(
                    <div key={users.name}>
                        <h2>Username:{users.username}</h2>
                        <h2>Email:{users.email}</h2>
                        <h2>Phone:{users.phone}</h2>
                </div>
                   ))}
        </>
    );
}

export default User;