export class LoginUserRequest {

    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class RegisterUserRequest {

    username: string;
    password: string;
    email: string;

    constructor(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

export class RegisterUserTempRequest {

    username: string;
    password: string;
    password2: string;
    email: string;

    constructor(username: string, password: string, password2: string, email: string) {
        this.username = username;
        this.password = password;
        this.password2 = password2;
        this.email = email;
    }
}