const db = require('../models/db');
const uuid = require('uuid');
const debug = require('debug')('debug:log');

const utils = require('../utils');

const getCustomerList = async (ctx, next) => {
  // console.log(ctx.request.body)
  let { currentPage, pageSize, name } = ctx.request.body;

  // 分页
  const pagination = utils.createPagination(currentPage, pageSize);

  // 查询参数 - 标题
  const title = name ? ` AND t1.name LIKE ${db.escape(`%${name}%`)}` : '';

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t1.account,
            t1.name,
            t1.phone,
            t1.address,
            t1.is_vip,
            t1.integral,
            ${utils.formatDateTime('t1.create_on')} AS create_on
        FROM
            customer t1
        WHERE
            t1.deleted = ? ${title}
        ${pagination}
      `,
      [0]
    );

    const [{ total }] = await db.query(
      `
        SELECT
            COUNT(*) AS total
        FROM
            customer t1
        WHERE
            t1.deleted = ? ${title}
      `,
      [0]
    );

    // 返回数据
    ctx.body = {
      code: 200,
      data: {
        records: rows,
        total
      },
      msg: ''
    };
  } catch (e) {
    console.error(e);
  }
};

const updateCustomerInfo = async (ctx, next) => {
  let { id, is_vip, integral } = ctx.request.body;

  try {
    const rows = await db.query(
      `
        UPDATE
            customer t1
        SET
            t1.is_vip = ?,
            t1.integral = ?
        WHERE
            t1.id = ?
      `,
      [is_vip, integral, id]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const delCustomerRecord = async (ctx, next) => {
  const { ids } = ctx.query;

  try {
    const rows = await db.query(
      `
        UPDATE
            customer t1
        SET
            t1.deleted = ?
        WHERE
            t1.id IN (${db.escape(ids.split(','))})
      `,
      [1]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const getGoodsList = async (ctx, next) => {
  let { currentPage, pageSize, title } = ctx.request.body;

  // 分页
  const pagination = utils.createPagination(currentPage, pageSize);

  // 查询参数 - 标题
  const titleWhere = title ? ` AND t1.title LIKE ${db.escape(`%${title}%`)}` : '';

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t1.title,
            t1.description,
            t1.type,
            t1.img_path,
            t1.price,
            t1.vprice,
            t1.inventory,
            ${utils.formatDateTime('t1.create_on')} AS create_on
        FROM
            goods t1
        WHERE
            t1.deleted = ? ${titleWhere}
        ORDER BY
            t1.create_on DESC
        ${pagination}
      `,
      [0]
    );

    const [{ total }] = await db.query(
      `
        SELECT
            COUNT(*) AS total
        FROM
            goods t1
        WHERE
            t1.deleted = ? ${titleWhere}
      `,
      [0]
    );

    // 返回数据
    ctx.body = {
      code: 200,
      data: {
        records: rows,
        total
      },
      msg: ''
    };
  } catch (e) {
    console.error(e);
  }
};

const addGoddsRecord = async (ctx, next) => {
  let { title, description, type, img_path, price, vprice, inventory } = ctx.request.body;

  try {
    const rows = await db.query(
      `
        INSERT INTO goods (id, title, description, type, img_path, price, vprice, inventory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [uuid(), title, description, type, img_path, price, vprice, inventory]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const updateGoodsInfo = async (ctx, next) => {
  let { id, title, description, type, img_path, price, vprice, inventory } = ctx.request.body;

  try {
    const rows = await db.query(
      `
        UPDATE
            goods t1
        SET
            t1.title = ?,
            t1.description = ?,
            t1.type = ?,
            t1.img_path = ?,
            t1.price = ?,
            t1.vprice = ?,
            t1.inventory = ?
        WHERE
            t1.id = ?
     `,
      [title, description, type, img_path, price, vprice, inventory, id]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const delGoodsRecord = async (ctx, next) => {
  const { ids } = ctx.query;

  try {
    const rows = await db.query(
      `
        UPDATE
            goods t1
        SET
            t1.deleted = ?
        WHERE
            t1.id IN (${db.escape(ids.split(','))})
      `,
      [1]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const getOrderList = async (ctx, next) => {
  let { currentPage, pageSize, id } = ctx.request.body;

  // 分页
  const pagination = utils.createPagination(currentPage, pageSize);

  // 查询参数 - 标题
  const idWhere = id ? ` AND t1.id LIKE ${db.escape(`%${id}%`)}` : '';

  try {
    // 数据库 I/O
    const rows = await db.query(
      `
        SELECT
            t1.id,
            t2.name,
            t2.phone,
            t2.address,
            t1.type,
            ${utils.formatDateTime('t1.create_on')} AS create_on
        FROM
            orders t1, customer t2
        WHERE
            t1.customer_id = t2.id AND t1.deleted = ? ${idWhere}
        ORDER BY
            t1.create_on DESC
        ${pagination}
      `,
      [0]
    );

    const [{ total }] = await db.query(
      `
        SELECT
            COUNT(*) AS total
        FROM
          orders t1
        WHERE
            t1.deleted = ? ${idWhere}
      `,
      [0]
    );

    // 返回数据
    ctx.body = {
      code: 200,
      data: {
        records: rows,
        total
      },
      msg: ''
    };
  } catch (e) {
    console.error(e);
  }
};

const delOrderRecord = async (ctx, next) => {
  const { ids } = ctx.query;

  try {
    const rows = await db.query(
      `
        UPDATE
            orders t1
        SET
            t1.deleted = ?
        WHERE
            t1.id IN (${db.escape(ids.split(','))})
      `,
      [1]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const updateOrderType = async (ctx, next) => {
  const { id, type } = ctx.query;

  try {
    const rows = await db.query(
      `
        UPDATE
            orders t1
        SET
            t1.type = ?
        WHERE
            t1.id = ?
      `,
      [type, id]
    );

    if (rows.affectedRows) {
      // 返回数据
      ctx.body = {
        code: 200,
        data: null,
        msg: ''
      };
    }
  } catch (e) {
    console.error(e);
  }
};

const getOrderById = async (ctx, next) => {
  const { id } = ctx.query;

  try {
    const [row] = await db.query(
      `
        SELECT
            t1.id,
            t1.type
        FROM
            orders t1
        WHERE
            t1.id=? AND t1.deleted=?
      `,
      [id, 0]
    );

    let goods = await db.query(
      `
        SELECT
          t1.goods_id AS id,
          t1.buyNumber,
          t1.price,
          t2.title,
          t2.img_path
        FROM
          order_middles t1
        LEFT JOIN
          goods t2
        ON
          t1.goods_id = t2.id
        WHERE
          t1.order_id=?
        AND
          t1.deleted=?
      `,
      [row.id, 0]
    );

    row.list = goods;

    // 返回数据
    ctx.body = {
      code: 200,
      data: row,
      msg: ''
    };
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getCustomerList,
  updateCustomerInfo,
  delCustomerRecord,
  getGoodsList,
  addGoddsRecord,
  updateGoodsInfo,
  delGoodsRecord,
  getOrderList,
  delOrderRecord,
  updateOrderType,
  getOrderById
};
