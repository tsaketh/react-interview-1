import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => alert(err));
  };
  const selectUser = (event) => {
    setSelectedUser(event?.target?.value || event);
    setSearchKey('');
  };
  const search = (event) => {
    setSearchKey(event.target.value);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const userElement = users.map(({ id, name }) => (
    <option id={id} value={id}>
      {name}
    </option>
  ));
  const userSpan = searchKey.length > 0 && (
    <ul
      style={{
        listStyle: 'none',
        marginTop: '0%',
        padding: '1%',
        border: '2px solid blue',
        width: '100%',
      }}
      className="center-h"
    >
      {users
        .filter(({ name }) =>
          name.toLowerCase().includes(searchKey.toLowerCase())
        )
        .map(({ id, name }) => (
          <li
            className="dropdown-value"
            key={id}
            onClick={() => selectUser(id.toString())}
          >
            {name}
          </li>
        ))}
    </ul>
  );
  const userDetails = users
    .filter(({ id }) => id == selectedUser)
    .map(({ name, username, email, phone, website, address, company }) => {
      return (
        <table
          style={{
            marginTop: '5%',
            borderSpacing: '0',
          }}
          className="center-h"
        >
          <tbody>
            <tr>
              <th>Name</th>
              <th>:</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Username</th>
              <th>:</th>
              <td>{username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <th>:</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <th>:</th>
              <td>{phone}</td>
            </tr>
            <tr>
              <th>Website</th>
              <th>:</th>
              <td>
                <a href={`https://${website}`}>{website}</a>
              </td>
            </tr>
            <tr>
              <th>Address</th>
              <th>:</th>
              <td>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}, Coordinates: {${address.geo.lat}, ${address.geo.lng}}`}</td>
            </tr>
            <tr>
              <th>Company</th>
              <th>:</th>
              <td>{`${company.name} - "${company.catchPhrase}-${company.bs}"`}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  return (
    <div>
      <div className="center-h">
        <h2>Demo application</h2>
        <select className="center-h drop-down" onChange={selectUser}>
          {userElement}
        </select>
        {/* <input
          type="text"
          className="center-h user-input"
          style={{ marginTop: '5%', width: '100%' }}
          onChange={search}
        ></input>
        {userSpan} */}
      </div>
      {userDetails}
    </div>
  );
}
