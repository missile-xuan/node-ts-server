import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyWowsService {
  private readonly proxyWowsData: {
    [key: string]: { timestamp: number; active: boolean; data: any };
  } = {};

  /**
   * get请求转发
   * @param url 转发地址
   * @returns
   */
  async proxyGet(url: string) {
    // 拆分url 提取转发内容
    const urlParts = url.split('/proxyWows')[1];
    // 如果缓存中有数据，且未过期，且未被占用，则直接返回数据
    if (
      this.proxyWowsData[urlParts] &&
      this.proxyWowsData[urlParts].timestamp + 1000 * 60 * 60 * 6 >
        Date.now() &&
      !this.proxyWowsData[urlParts].active
    ) {
      return this.proxyWowsData[urlParts].data;
    }
    // 如果缓存中没有数据，先创建基础结构
    if (!this.proxyWowsData[urlParts]) {
      this.proxyWowsData[urlParts] = {
        timestamp: Date.now(),
        active: false,
        data: null,
      };
    }
    if (this.proxyWowsData[urlParts].active) {
      // 如果缓存中有数据，但已被占用，则等待数据返回
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (!this.proxyWowsData[urlParts].active) {
            if (this.proxyWowsData[urlParts].data.length > 10) {
              clearInterval(interval);
              resolve(this.proxyWowsData[urlParts].data);
            } else {
              clearInterval(interval);
              reject('error');
            }
          }
        }, 1000);
      });
    } else {
      // 未被占用则发起请求
      this.proxyWowsData[urlParts].active = true;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.PROXY_SHINOAKI + urlParts)
          .then((res) => {
            this.proxyWowsData[urlParts].data = res.data;
            this.proxyWowsData[urlParts].timestamp = Date.now();
            this.proxyWowsData[urlParts].active = false;
            resolve(res.data);
          })
          .catch((err) => {
            this.proxyWowsData[urlParts].active = false;
            Logger.error(err);
            reject(err);
          })
          .finally(() => {
            reject('finally error');
          });
      });
    }
  }

  /**
   * post请求转发
   * @param req
   * @returns
   */
  async proxyPost(req: any) {
    // 拆分url 提取转发内容
    const urlParts = req.url.split('/proxyWows')[1];
    // 如果缓存中有数据，且未过期，且未被占用，则直接返回数据
    if (
      this.proxyWowsData[urlParts] &&
      this.proxyWowsData[urlParts].timestamp + 1000 * 60 * 60 * 6 >
        Date.now() &&
      !this.proxyWowsData[urlParts].active
    ) {
      return this.proxyWowsData[urlParts].data;
    }
    // 如果缓存中没有数据，先创建基础结构
    if (!this.proxyWowsData[urlParts]) {
      this.proxyWowsData[urlParts] = {
        timestamp: Date.now(),
        active: false,
        data: null,
      };
    }
    if (this.proxyWowsData[urlParts].active) {
      // 如果缓存中有数据，但已被占用，则等待数据返回
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (!this.proxyWowsData[urlParts].active) {
            if (this.proxyWowsData[urlParts].data.length > 10) {
              clearInterval(interval);
              resolve(this.proxyWowsData[urlParts].data);
            } else {
              clearInterval(interval);
              reject('error');
            }
          }
        }, 1000);
      });
    } else {
      // 未被占用则发起请求
      this.proxyWowsData[urlParts].active = true;
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          // headers: req.headers,
          data: req.body,
          url: process.env.PROXY_SHINOAKI + urlParts,
        })
          .then((res) => {
            this.proxyWowsData[urlParts].data = res.data;
            this.proxyWowsData[urlParts].timestamp = Date.now();
            this.proxyWowsData[urlParts].active = false;
            resolve(res.data);
          })
          .catch((err) => {
            this.proxyWowsData[urlParts].active = false;
            Logger.error(err);
            reject(err);
          })
          .finally(() => {
            reject('finally error');
          });
      });
    }
  }

  getProxyWowsData() {
    const keys = Object.keys(this.proxyWowsData);
    return keys;
  }
}
