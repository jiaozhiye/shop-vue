/*
 * @Author: 焦质晔
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-04-10 14:30:59
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 会员查询
export const getCustomerList = params => axios.post(`${SERVER.USER}/getCustomerList`, params);

// 会员修改
export const updateCustomerInfo = params => axios.post(`${SERVER.USER}/updateCustomerInfo`, params);

// 删除注册用户
export const delCustomerRecord = params => axios.get(`${SERVER.USER}/delCustomerRecord`, { params });
