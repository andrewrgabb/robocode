import {
    getStatUrl,
} from '../paths/api';
import {doGet} from "./base-service";

export const getStat = async() => {

    const response = await doGet(getStatUrl());

    console.log(response)

    if (!response.ok) {
        return null;
    }

    let json = await response.json() ;

    console.log(json)

    return json;
}