import { useState } from "react";
 

function Apiform(){
    const[username, setUsername]=useState("")
    const[email, setEmail]=useState("")
    const[password, setPassword]=useState("")
    const[userdata, setUserdata]=useState(null);

    async function handleClick(e){
        e.preventDefault();

        const newUser={
            username:username,
            email:email,
            password:password,
        };
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/users",
       {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(newUser),
       }
    );
    if(!response.ok){
        throw new error("Something went wrong");
    }

    const data=await response.json();

    setUserdata(data);
    }catch(error){
        console.log(error.message);
    }
 }
    
    return(
        <>
        <form onSubmit={handleClick} >

        <h2>User Form</h2>

        <label htmlFor="Username">Username</label><br />
        <input type="text" value={username} placeholder="Enter username here" onChange={(e)=>setUsername(e.target.value)} /> <br />

         <label htmlFor="Email">Email</label><br />
        <input type="text" value={email} placeholder="Enter email here" onChange={(e)=>setEmail(e.target.value)} /> <br />

          <label htmlFor="password">password</label><br />
        <input type="text" value={password} placeholder="Enter password......." onChange={(e)=>setPassword(e.target.value)} /> <br />

        <button type="Submit">Submit</button>
        </form>


        {userdata && (
            <div>
                <h1>User Data</h1>
                <h2>Username:{userdata.username}</h2>
                <p>Email:{userdata.email}</p>
                <p>Password:{userdata.password}</p>
            </div>
        )}
      
        </>
    );
}
export default Apiform;