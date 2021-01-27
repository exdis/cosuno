import React from 'react';
import type { Company } from './app';
import './list.css';

interface ListProps {
    companies: Company[]
}

export default ({ companies }: ListProps) => {
    return (
        <div className="list">
            {companies.length ?
                <ul>
                    {companies.map(company =>
                        <li>
                            <img src={company.logo} />
                            <div className='name'>{company.name}</div>
                            <div className='speciality'>{company.speciality}</div>
                            <div className='city'>{company.city}</div>
                        </li>
                    )}
                </ul> : <div className="not-found">No companies found</div>}
        </div>
    )
};
