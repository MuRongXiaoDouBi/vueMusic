/*
 * @Author: MuRong
 * @Date: 2019-07-20 08:51:26
 * @LastEditors: MuRong
 * @LastEditTime: 2019-07-20 19:45:51
 * @Description: axios二次封装
 */

import axios from 'axios'
import QS from 'qs'

const ERR_OK = 200 // 成功状态码

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://123.207.138.75:4000';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'http://123.207.138.75:4000';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://123.207.138.75:4000';
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url, 
            method: 'get',
            params
        }).then(res => {
            if (res.data && res.status === ERR_OK) {
                resolve(res.data);
            }
        }).catch(err => {
            reject(err.data)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                if (res.data && res.status === ERR_OK) {
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err.data)
            })
    });
}