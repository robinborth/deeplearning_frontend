import React from 'react'

export const modelUrl = 'https://servermnist.herokuapp.com/mnist/api/v1.0/model';
export const serverStatusUrl = 'https://servermnist.herokuapp.com/mnist/api/v1.0/status';

export const ImageGridContext = React.createContext([]);
export const ModelResponseStatusContext = React.createContext({});
export const ServerStatusContext = React.createContext({});


export async function postFetch ({url, body}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
    });
    return await response.json()
}

export const icons = {
    server: 'fas fa-server',
    undo: 'fas fa-undo',
    send: 'fas fa-eye',
}