import {
    getCurrentUserUrl,
    getDetailsUrl,
    getEditDetailsUrl,
    getStatUrl,
    getSubmitUrl,
} from '../paths/api';
import { doGet, doPost } from "./base-service";
import {
    Stat, TeamDetails,
} from '../transport/user';

export const getCurrentUser = async () => {

    const response = await doGet(getCurrentUserUrl());

    if (!response.ok) {
        console.log("Error fetching current user");
        return null;
    }

    let json = await response.json();

    const username = json.username;

    return username;
};

export const getStat = async (): Promise<Stat | null> => {

    const response = await doGet(getStatUrl());

    if (!response.ok) {
        console.log("Error fetching stat data");
        return null;
    }

    let json: Stat = await response.json();
    return json;
}

export const submitCode = async (file: File): Promise<any> => {

    // May need to be changed
    const formData = new FormData();

    formData.append('submission', file);
    try {
        const response = await doPost(getSubmitUrl(), formData, true);
        /*
        // I use status codes quite liberally. code != 200 doesn't mean failure
        if (!response.ok) {
            console.log("Error submitting code");
            console.log(response);
            return null;
        }
        */
        const json = await response.json();
        console.log(json);
        return json;
    } catch (e) {
        return {
            "ok": false,
            "message": "File upload failed! If you edited your file on disk, you'll need to drop it again."
        };
    }
}

export const getTeamDetails = async (): Promise<TeamDetails | null> => {

    const response = await doGet(getDetailsUrl());

    if (!response.ok) {
        console.log("Error fetching team details data");
        return null;
    }

    const json: TeamDetails = await response.json();

    console.log({json});
    return json;
}

export const updateTeamDetails = async (teamDetails: TeamDetails | undefined): Promise<any> => {
    if (teamDetails) {
        const response = await doPost(getEditDetailsUrl(), teamDetails);
        return response;
    }
    return;
}


