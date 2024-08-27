import React, { useState } from "react";
import axios from "axios";

const UserItem = ({ user, setUsers, users }) => {
  const [getuser, setGetUser] = useState({
    _id: user ? user._id : "",
    username: user ? user.username : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
    password_hash: user ? user.password_hash : "", // Changed from `password` to `password_hash` for consistency
  });

  const [editMode, setEditMode] = useState(false);

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5678/api/user/update/${getuser._id}`,
        getuser
      );
      if (response.data.success) {
        setUsers(users.map((item) =>
          item._id === getuser._id ? getuser : item
        ));
        setEditMode(false);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      updateUser();
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5678/api/user/delete/${getuser._id}`
      );
      if (response.data.success) {
        setUsers(users.filter((item) => item._id !== getuser._id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setGetUser({ ...getuser, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-item">
      {editMode ? (
        <>
          <h3>Edit Mode</h3>
          <table>
            <tbody>
              <tr>
                <td>{getuser._id}</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={getuser.username}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={getuser.email}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="role"
                    value={getuser.role}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="password"
                    name="password_hash" // Changed from `password` to `password_hash`
                    value={getuser.password_hash}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.password_hash}</td> {/* Changed from `password` to `password_hash` */}
              </tr>
            </tbody>
          </table>
        </>
      )}
      <button onClick={handleSubmit}>{editMode ? "Submit" : "Edit"}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserItem;
