import React from "react";
import { useNavigate } from "react-router-dom";

// Shows simple info about a company
const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/companies/${company.handle}`);
    };

    return (
        <div className="card" style={{ cursor: "pointer" }} onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title">{company.name}</h5>
                <p className="card-text">{company.description}</p>
                <p className="card-text">Number of Employees: {company.numEmployees}</p>
            </div>
        </div>
    );
};

export default CompanyCard;
