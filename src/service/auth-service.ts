import {
    getLoginUrl,
    getRegisterUrl,
} from '../paths/api';
import {
    LoginUserRequest,
    RegisterUserRequest,
} from "../transport/auth";
import {doPost} from "./base-service";
import {cyrb53} from '../util/encryption';

import Cookies from 'js-cookie';

export const login = async(loginRequest: LoginUserRequest) => {

    const encryptedPassword: number = cyrb53(loginRequest.password);
    loginRequest.password = encryptedPassword.toString();

    let response = await fetch(getLoginUrl(), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(loginRequest),
    });

    

    if (!response.ok) {
        console.log(response.statusText)
    }

    let json = await response;

    console.log(json)

    return json;


    /*
    

    let json = await response.json();
    console.log(json)*/
}

export const register = async(registrationRequest: RegisterUserRequest) => {

    let response = await doPost(getRegisterUrl(), registrationRequest);

    if (!response.ok) {
        return null;
    }

    let json = await response.json();
    console.log(json)
}