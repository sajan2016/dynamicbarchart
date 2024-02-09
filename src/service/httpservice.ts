import axios from 'axios';


function defaultHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

function request(method:string, url:string, customHeaders = {}) {
    const headers = { ...defaultHeaders(), ...customHeaders };
    const source = axios.CancelToken.source();

    const config:any= {
        method,
        url,
        headers,
        cancelToken: source.token
    };

    return {
        config,
        cancel: source.cancel
    };
}

export const HTTP= {
        get:async (url:string, customHeaders = {})=>{
            const {config}= request('get', url,customHeaders);
            return await axios.get(url,config)
        },
        post: async(url:string, data:any, customHeaders = {})=>{
            const {config}= request('post', url, customHeaders);
            return await axios.post(url,data,config)
        }
    }

