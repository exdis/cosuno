import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Filter from './filter';
import './app.css';

export type Company = {
    name: string
    logo: string
    speciality: string
    city: string
}

interface AppState {
    loading: boolean
    companies: Company[]
}

const fetchCompanies = async (): Promise<Company[]> => {
    return (await fetch('/api/companies')).json()
}

const initialState: AppState = {
    loading: true,
    companies: []
}

const App = () => {
    const [{ loading, companies }, setState] = useState<AppState>(initialState);

    useEffect(() => {
        fetchCompanies()
            .then(companies => {
                setState({ loading: false, companies })
            });
    }, []);

    return (
        <div>
            <Filter loading={loading} companies={companies} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
