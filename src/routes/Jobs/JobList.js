import React, { useState, useEffect} from "react";
import JobCard from "./JobCard";
import JoblyApi from "../../api";

const JobList = ({ jobs }) => {
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search.trim().length > 0) {
            try {
                const filteredJobs = await JoblyApi.getFilteredJobs(search);
                setFilteredJobs(filteredJobs);
            } catch (error) {
                console.error("Error filtering jobs:", error);
            }
        } else {
            // If search input is empty, reset to display all jobs
            setFilteredJobs(jobs);
        }
    };

    useEffect(() => {
        // Initialize filtered jobs with all jobs when component mounts
        setFilteredJobs(jobs);
    }, [jobs]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Jobs</h1>
            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={search}
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
            <div className="row">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="col-md-6">
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
