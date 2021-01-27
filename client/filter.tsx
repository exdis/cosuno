import React, { useState, useEffect } from 'react';
import Loading from './loading';
import List from './list';
import type { Company } from './app';
import './filter.css';

interface FilterProps {
    loading: boolean
    companies: Company[]
}

interface FilterState {
    filterString: string
    filtered: Company[]
    specialities: { name: string, checked: boolean }[]
}

export default ({ loading, companies }: FilterProps) => {
    const [{ filterString, filtered, specialities }, setState] = useState<FilterState>({
        filterString: '',
        filtered: companies,
        specialities: []
    });

    useEffect(() => {
        setState({
            filterString: '',
            filtered: companies,
            specialities: companies.map(company => ({
                name: company.speciality,
                checked: false
            }))
        });
    }, [companies])

    const filter = () => {
        const checkedSpecs = specialities.filter(spec => spec.checked).map(spec => spec.name);
        return companies.filter(
            company => new RegExp(filterString, 'i').test(company.name.toLowerCase()) &&
            (
                !checkedSpecs.length || checkedSpecs.includes(company.speciality)
            )
        );
    }

    useEffect(() => {
        setState({
            filterString,
            filtered: filter(),
            specialities
        })
    }, [filterString, specialities])

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            filterString: evt.target.value,
            filtered,
            specialities
        });
    }

    const handleSpecChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            filterString,
            filtered,
            specialities: specialities.map(spec => ({
                name: spec.name,
                checked: spec.name === evt.target.name ? evt.target.checked : spec.checked
            }))
        })
    }

    return (
        <div className="filter">
            <input type="text" placeholder='Company name...' onChange={handleInputChange} />
            {specialities.map(speciality => 
                <label>
                    <input type='checkbox' name={speciality.name} onChange={handleSpecChange} />{speciality.name}
                    <span className="checkmark"></span>
                </label>
            )}
            {loading ? <Loading /> : <List companies={filtered} />}
        </div>
    );
}