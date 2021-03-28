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

    const json: Ranking[] = await response.json();
    return json;
};