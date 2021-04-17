const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{7,}$/;

export const isUsernameValid = (username) => {
    return !!username && username.length > 0;
}

export const isEmailValid = (email) => {
    return EMAIL_REGEX.test(email.toLowerCase());
}

export const isPasswordValid = (password) => {
    return PASSWORD_REGEX.test(password);
}