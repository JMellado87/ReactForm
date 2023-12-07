import { useState } from 'react'

export default function SignUpForm({setToken}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState( null )


    async function handleSubmit(event) {
        event.preventDefault()

try {
    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
        }) 
    const result = await response.json()
    setToken(result.token)
        } catch (error) {
        setError(error.message);
        }
    }    
    return <>
            <div>
            <h2>Sign Up!</h2>  
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>  
            <label> Username: <input value={username} onChange={(event) => setUserName(event.target.value)} /> </label>
                <br/>
            <label> Password: <input type='password' value={password} onChange={(event) =>setPassword(event.target.value)}></input> </label>
            <br/>
            <button disabled={(username.length < 3 || password.length < 8) ? true : false}>Submit</button>
            </form>
            </div>
            </>
}