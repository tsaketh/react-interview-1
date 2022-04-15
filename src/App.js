import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => alert(err));
  };
  const selectUser = (event) => {
    setSelectedUser(event.target.value);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const userElement = users.map(({ id, name }) => (
    <option id={id} value={id}>
      {name}
    </option>
  ));
  const userDetails = users
    .filter(({ id }) => id == selectedUser)
    .map(({ name, username, email, phone, website, address, company }) => {
      return (
        <table>
          <tr>
            <th>Name:</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>Username:</th>
            <td>{username}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>{phone}</td>
          </tr>
          <tr>
            <th>Website:</th>
            <td>{website}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}, Coordinates: {${address.geo.lat}, ${address.geo.lng}}`}</td>
          </tr>
          <tr>
            <th>Company:</th>
            <td>{company.name}</td>
          </tr>
        </table>
      );
    });
  return (
    <div>
      <select onChange={selectUser}>{userElement}</select>
      <h1>User selected: </h1>
      {userDetails}
    </div>
  );
}
