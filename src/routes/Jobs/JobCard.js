import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "../../api";

const JobCard = ({ job }) => {
    const [applied, setApplied] = useState("Apply")

    useEffect(() => {
        checkIfApplied(job);
    }, [job]);

    const checkIfApplied = async (job) => {
        // get user from local storage
        let token = localStorage.getItem('token');
        let decoded = jwtDecode(token);
        // get userData from JoblyAPI
        let userData = await JoblyApi.getUser(decoded.username);
        // check if job.id matches an id in userData.applications
        let applied = false;
        for (let i = 0; i < userData.applications.length; i++) {
            if (job.id === userData.applications[i]) {
                applied = true;
            }
        }
        setApplied(applied? "Applied" : "Apply");
        return applied;
    }

    const applyToJob = async () => {
        try {
            let token = localStorage.getItem('token');
            let decoded = jwtDecode(token);
            await JoblyApi.applyToJob(decoded.username, job.id);
            setApplied("Applied");
        } catch (error) {
            console.error("Error applying to job:", error);
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">Salary: {job.salary}</p>
                {job.equity && <p className="card-text">Equity: {job.equity}</p>}
                <button className="btn btn-primary" onClick={applyToJob}>{applied}</button>
            </div>
        </div>
    );
};

export default JobCard;
