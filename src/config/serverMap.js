/*
 * @Author: mashaoze
 * @Date: 2020-04-23 13:28:28
 * @Last Modified by: mashaoze
 * @Last Modified time: 2020-08-20 15:50:55
 */
const config = {
  dev: {
    host: '/'
  },
  tst: {
    host: '/'
  },
  uat: {
    host: '/'
  },
  pre: {
    host: '/'
  },
  prod: {
    host: '/'
  }
};

export default config[process.env.ENV_CONFIG] || config[`prod`];
