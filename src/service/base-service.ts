export const doGet = (url: RequestInfo) => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const doDelete = (url: RequestInfo, body: any) => {
    return doFetch('DELETE', url, body);
}

export const doPost = (url: RequestInfo, body: any, unencode: boolean = false) => {
    return doFetch('POST', url, body, unencode);
}

export const doPut = (url: RequestInfo, body: any) => {
    return doFetch('PUT', url, body);
}

const doFetch = (method: string, url: RequestInfo, body: any, unencode: boolean = false) => {
    return fetch(url, {
        method: method,
        credentials: 'include',
        headers: unencode?{}:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: unencode?body:JSON.stringify(body)
    });
}