import React, {useEffect} from 'react';
import './App.css';
import {getLeaderboardUrl} from '../../paths/api';

const BasePage = () => {

    const getLeaderboard = async() => {

        let response = await fetch(getLeaderboardUrl(), {
            method: 'GET',
            /*credentials: 'include',*/ // Likely needs the user to be logged in
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            return null;
        }

        let json = await response.json();

        console.log(json)
    }

    useEffect(() => {
        getLeaderboard()
    });

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Welcome to the website!
                </p>
            </header>
        </div>
    );
}

export default BasePage;
