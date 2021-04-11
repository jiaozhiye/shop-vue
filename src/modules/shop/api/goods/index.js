/*
 * @Author: mashaoze
 * @Date: 2020-08-21 08:15:29
 * @Last Modified by: mashaoze
 * @Last Modified time: 2021-04-10 16:29:29
 */
import axios from '@/api/fetch';
import SERVER from '../server';

// 商品查询
export const getGoodsList = params => axios.post(`${SERVER.GOODS}/getGoodsList`, params);

// 新增商品
export const addGoddsRecord = params => axios.post(`${SERVER.GOODS}/addGoddsRecord`, params);

// 会员商品
export const updateGoodsInfo = params => axios.post(`${SERVER.GOODS}/updateGoodsInfo`, params);

// 删除商品
export const delGoodsRecord = params => axios.get(`${SERVER.GOODS}/delGoodsRecord`, { params });
