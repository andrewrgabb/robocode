import {
    getLeaderboardUrl,
} from '../paths/api';
import {doGet} from "./base-service";

export const getLeaderboard = async() => {

    let response = await doGet(getLeaderboardUrl());

    if (!response.ok) {
        return null;
    }

    let json = await response.json();

    return json;
}