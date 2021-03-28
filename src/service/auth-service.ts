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

//import Cookies from 'js-cookie'; ? ever required ?

export const login = async(loginRequest: LoginUserRequest) => {

    const encryptedPassword: number = cyrb53(loginRequest.password);
    loginRequest.password = encryptedPassword.toString();

    let response = await doPost(getLoginUrl(), loginRequest);

    if (!response.ok) {
        console.log(response.statusText)
    }

    return response;
}

export const register = async(registrationRequest: RegisterUserRequest) => {

    const encryptedPassword: number = cyrb53(registrationRequest.password);
    registrationRequest.password = encryptedPassword.toString();

    let response = await doPost(getRegisterUrl(), registrationRequest);

    if (!response.ok) {
        return null;
    }
    
    return response;
}