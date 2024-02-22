import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../../api";

const CompanyList = ({ companies }) => {
    const [search, setSearch] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search.trim().length > 0) {
            try {
                const filteredCompanies = await JoblyApi.getFilteredCompanies(search);
                setFilteredCompanies(filteredCompanies);
            } catch (error) {
                console.error("Error filtering companies:", error);
            }
        } else {
            // If search input is empty, reset to display all companies
            setFilteredCompanies(companies);
        }
    };

    useEffect(() => {
        // Initialize filtered companies with all companies when component mounts
        setFilteredCompanies(companies);
    }, [companies]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Companies</h1>
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
                {filteredCompanies.map((company) => (
                    <div key={company.id} className="col-md-4 mb-3">
                        <CompanyCard company={company} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyList;