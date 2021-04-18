/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-16 13:53:52
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 订单查询
export const getOrderList = params => axios.post(`${SERVER.ORDER}/getOrderList`, params);

// 删除订单
export const delOrderRecord = params => axios.get(`${SERVER.ORDER}/delOrderRecord`, { params });

// 修改订单状态
export const updateOrderType = params => axios.get(`${SERVER.ORDER}/updateOrderType`, { params });

// 获取订单信息
export const getOrderById = params => axios.get(`${SERVER.ORDER}/getOrderById`, { params });
