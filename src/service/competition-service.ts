import {
    getCompetitionInfoUrl,
} from '../paths/api';
import {
    Competition,
} from "../transport/competition";
import {doGet} from "./base-service";

export const getCompetitionInfo = async(): Promise<Competition | null> => {

    const response = await doGet(getCompetitionInfoUrl());

    if (!response.ok) {
        return null;
    }

    const json = await response.json();
    
    const competitionInfo: Competition = json;
    console.log(competitionInfo);

    return competitionInfo;
};