import React, { useState } from 'react';
import axios from 'axios';

function LoginUser() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const login = async () => {
      if (!username || !password) {
         setError("Username and password are required");
         return;
      }

      const payload = {
         username,
         password_hash: password
      };

      try {
         const response = await axios.post('http://localhost:5678/api/user/login', payload);

         if (response.data.success) {
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            setSuccess("Login successful!");
            setError("");
            // Clear inputs or redirect user if needed
            setUsername("");
            setPassword("");
         } else {
            setError("Error while logging in");
         }
      } catch (error) {
         console.error("Login failed:", error);
         setError("An error occurred while logging in");
      }
   };

   return (
      <div>
         <h1>Login User</h1>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {success && <p style={{ color: 'green' }}>{success}</p>}
         <label htmlFor="username">Username</label>
         <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
         />
         <br />
         <label htmlFor="password">Password</label>
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
         />
         <br />
         <button onClick={login}>Login</button>
      </div>
   );
}

export default LoginUser;
