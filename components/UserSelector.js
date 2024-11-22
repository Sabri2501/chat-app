import React from "react";

export default function UserSelector({ users, setSelectedUser }) {
  return (
    <div className="user-selector">
      <h3>Sélectionnez un utilisateur</h3>
      <select
        onChange={(e) => setSelectedUser(users[e.target.value])}
        className="user-selector__dropdown"
      >
        {users.map((user, index) => (
          <option key={user.id} value={index}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
