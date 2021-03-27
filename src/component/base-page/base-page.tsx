import React, {useEffect} from 'react';
import './App.css';
import {getLeaderboard} from '../../service/comp-service';
import {login} from '../../service/auth-service';
import {getStat} from '../../service/user-service';
import {
    LoginUserRequest,
    //RegisterUserRequest,
} from '../../transport/auth';

const BasePage = () => {

    useEffect(() => {
        fetchLeaderboard();
        loginUser();
    }, []);

    const fetchLeaderboard = async() => {
        const leaderboard = await getLeaderboard();

        console.log(leaderboard);
    }

    const fetchStat = async() => {

        console.log(document.cookie)

        await getStat();
    }


    const loginUser = async() => {

        const loginRequest = new LoginUserRequest('a', 'a');

        const response = await login(loginRequest);

        console.log(response);
    }

    return (
        <div className="App">
            <header className="App-header">
                <p onClick={() => fetchStat()}>
                    Welcome to the website!
                </p>
            </header>
        </div>
    );
}

export default BasePage;
