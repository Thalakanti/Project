import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersItem from "./UsersItem";


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5678/api/user/Allusers");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Password</th>
                {/* <th>Edit</th>
                <th>Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UsersItem
                  key={user.id} // Add unique key prop
                  user={user}
                  setUsers={setUsers}
                  users={users}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
