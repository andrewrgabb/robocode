import {
    getLeaderboardUrl,
} from '../paths/api';
import {
    Ranking,
} from "../transport/comp";
import {doGet} from "./base-service";

export const getLeaderboard = async(): Promise<Ranking[] | null> => {

    const response = await doGet(getLeaderboardUrl());

    if (!response.ok) {
        return null;
    }

    const json = await response.json();
    
    const rankings: Ranking[] = json.rankings;
    console.log(rankings);

    return rankings;
};