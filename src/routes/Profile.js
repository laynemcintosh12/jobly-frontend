import React, { useState, useEffect } from 'react';
import JoblyAPI from '../api';
import JobCard from './Jobs/JobCard';



/** NEED TO ADD JOBS, SOMETHING TO DO WITH THE API RESPONSE FOR JoblyAPI.getUser. THIS SHOULD BE RETURNING APPLICATIONS AS WELL */






function Profile({ user, editUser }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    applications: []
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserData(user);
  }, [user]);

  async function getUserData(username) {
    try {
      const userData = await JoblyAPI.getUser(username);
      setUserData(userData);
      let applications = [];
      for (let i = 0; i < userData.applications.length; i++) {
        const application = await JoblyAPI.getJob(userData.applications[i]);
        applications.push(application);
      }
      setUserData({...userData, applications });
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(userData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {user && (
        <div>
          <p>Username: {user}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          ) : (
            <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          )}

          <h3 className='mt-5 mb-3'>Applied Jobs:</h3>
          <div className="row">
            {userData.applications.map((job) => (
              <div key={job.id} className="col-md-6">
                <JobCard job={job}  />
              </div>
            ))}
          </div>
        
        </div>
      )}
    </div>
  );
}

export default Profile;
