/*
 * @Author: 焦质晔
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-04-10 11:17:56
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 会员查询
export const getCustomerList = params => axios.post(`${SERVER.USER}/getCustomerList`, params);
