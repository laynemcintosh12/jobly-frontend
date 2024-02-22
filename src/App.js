import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import JoblyAPI from './api';
import NavBar from './NavBar';
import SignUpForm from './routes/SignUpForm';
import LoginForm from './routes/LoginForm';
import Profile from './routes/Profile';
import CompanyList from './routes/Companies/CompanyList';
import CompanyDetail from './routes/Companies/CompanyDetail';
import JobList from './routes/Jobs/JobList';
import Home from './routes/Home';


function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getCompaniesAndJobs() {
      const companies = await JoblyAPI.getAllCompanies();
      const jobs = await JoblyAPI.getAllJobs();
      setCompanies(companies);
      setJobs(jobs);
    }

    getCompaniesAndJobs();
  }, [setUser]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded.username);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem('token');
        setUser('');
      }
    }
  }, [setUser]); 

  async function logout() {
    setUser('');
    localStorage.removeItem('token');
    await JoblyAPI.logout();
    return <Navigate to="/" />
  }

  async function login(data) {
    let res = await JoblyAPI.login(data);
    let decoded = jwtDecode(res);
    setUser(decoded.username);
    localStorage.setItem('token', res);
  }

  async function signUp(data) {
    let res = await JoblyAPI.signup(data);
    login(res);
  }

  async function editUser(data) {
    let res = await JoblyAPI.editUser(data);
    setUser(res.username);  
  }

  // Function to check if token is present
  const isAuthenticated = () => {
    let token = localStorage.getItem('token');
    return !!token;
  };

  // function to route to not found page
  const goNotFound = () => {
    return <Navigate to="/*" />
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} user={user} setUser={setUser} />
        <Routes>
          <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/profile" element={<Profile user={user} editUser={editUser} />} />
          <Route
            path="/companies"
            element={isAuthenticated() ? <CompanyList companies={companies} /> : goNotFound()}
          />
          <Route
            path="/companies/:company_handle"
            element={isAuthenticated() ? <CompanyDetail /> : goNotFound()}
          />
          <Route
            path="/jobs"
            element={isAuthenticated() ? <JobList jobs={jobs} /> : goNotFound()}
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
