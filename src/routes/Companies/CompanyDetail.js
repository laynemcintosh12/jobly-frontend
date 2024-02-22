import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyAPI from "../../api";
import CompanyCard from "./CompanyCard";
import JobCard from "../Jobs/JobCard";

// Shows details of a single company 

const CompanyDetail = () => {
    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    const { company_handle } = useParams();

    useEffect(() => {
        async function getCompanyAndJobs() {
            const company = await JoblyAPI.getCompany(company_handle);
            const jobs = await JoblyAPI.getCompanyJobs(company_handle);
            setCompany(company);
            setJobs(jobs);
        }

        getCompanyAndJobs();
    }, [company_handle]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col text-center mt-3">
                    <CompanyCard company={company} />
                </div>
            </div>
            <div className="mt-4">
                <h1>Jobs</h1>
                <ul className="list-group">
                    {jobs.map((job) => (
                        <li key={job.id} className="list-group-item">
                            <JobCard job={job} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CompanyDetail;
