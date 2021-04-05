import {
    getCurrentUserUrl,
    getStatUrl,
    getSubmitUrl,
    getLogUrl,
} from '../paths/api';
import {doGet, doPost} from "./base-service";
import {
    Stat,
} from '../transport/user';

export const getCurrentUser = async () => {

    const response = await doGet(getCurrentUserUrl());

    if (!response.ok) {
        console.log("Error fetching current user");
        return null;
    }

    let json = await response.json();
    return json.user;
};

export const getStat = async(): Promise<Stat | null> => {

    const response = await doGet(getStatUrl());

    if (!response.ok) {
        console.log("Error fetching stat data");
        return null;
    }

    let json: Stat = await response.json() ;
    return json;
}

// Needs to be typed
export const submitCode = async(file: File): Promise<any> => {

    // May need to be changed
    const response = await doPost(getSubmitUrl(), file);

    if (!response.ok) {
        console.log("Error submitting code");
        return null;
    }

    let json = await response.json() ;
    return json;
}

// Needs to be typed
export const getLog = async(): Promise<any> => {

    const response = await doGet(getLogUrl());

    if (!response.ok) {
        console.log("Error fetching log data");
        return null;
    }

    let json = await response.json() ;
    return json;
}