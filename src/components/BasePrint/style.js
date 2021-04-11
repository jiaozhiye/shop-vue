/**
 * @Author: mashaoze
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-07-28 19:01:58
 **/
const styleText = `
  <style type="text/css">
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    table tr th,
    table tr td {
      padding: 4px 0 4px 4px;
    }
    .fs12, .fs12 * {
      font-size: 12px;
    }
    .fs14, .fs14 * {
      font-size: 14px;
    }
    .fs16, .fs16 * {
      font-size: 16px;
    }
    .tc {
      text-align: center;
    }
    .tr {
      text-align: right;
    }
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    /* 全边框 */
    .bor tr th,
    .bor tr td {
      border: 1px solid #000;
    }
    /* 水平边框 */
    .bor-hor tr th,
    .bor-hor tr td {
      border-top: 1px solid #000;
    }
    .bor-hor tr:last-of-type td {
      border-bottom: 1px solid #000;
    }
    /* 贯穿边框（水平边框 - 上下边框） */
    .bor-through tr th,
    .bor-through tr td {
      border-bottom: 1px solid #000;
    }
    .bor-through tr:last-of-type td {
      border-bottom: 0;
    }
    .no-bor {
      border: none !important;
    }
  </style>
`;

export default {
  style: styleText
};
