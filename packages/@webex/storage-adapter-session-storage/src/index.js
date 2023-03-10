/*!
 * Copyright (c) 2015-2020 Cisco Systems, Inc. See LICENSE file.
 */

/* eslint-env browser */

import {NotFoundError} from '@webex/webex-core';

const namespaces = new WeakMap();
const loggers = new WeakMap();

/**
 * sessionStorage adapter for webex-core storage layer
 */
export default class StorageAdapterSessionStorage {
  /**
   * @constructs {StorageAdapterSessionStorage}
   * @param {string} basekey sessionStorage key underwhich all namespaces will be
   * stored
   */
  constructor(basekey) {
    /**
     * sessionStorage binding
     */
    this.Bound = class {
      /**
       * @constructs {Bound}
       * @param {string} namespace
       * @param {Object} options
       */
      constructor(namespace, options) {
        namespaces.set(this, namespace);
        loggers.set(this, options.logger);
      }

      /**
       * @private
       * @returns {rawData}
       */
      _getRawData() {
        const rawData = sessionStorage.getItem(basekey);

        return rawData ? JSON.parse(rawData) : {};
      }

      /**
       * @private
       * @returns {mixed}
       */
      _load() {
        const allData = this._getRawData();

        return allData[namespaces.get(this)] || {};
      }

      /**
       * @param {Object} data
       * @private
       * @returns {undefined}
       */
      _save(data) {
        const allData = this._getRawData();

        allData[namespaces.get(this)] = data;

        sessionStorage.setItem(basekey, JSON.stringify(allData));
      }

      /**
       * Clears the sessionStorage
       * @param {string} key
       * @returns {Promise}
       */
      clear() {
        loggers.get(this).info('session-storage-store-adapter: clearing sessionStorage');

        return Promise.resolve(sessionStorage.removeItem(basekey));
      }

      /**
       * Removes the specified key
       * @param {string} key
       * @returns {Promise}
       */
      del(key) {
        return new Promise((resolve) => {
          loggers.get(this).info(`session-storage-store-adapter: deleting \`${key}\``);
          const data = this._load();

          Reflect.deleteProperty(data, key);
          this._save(data);
          resolve();
        });
      }

      /**
       * Retrieves the data at the specified key
       * @param {string} key
       * @returns {Promise<mixed>}
       */
      get(key) {
        return new Promise((resolve, reject) => {
          loggers.get(this).info(`session-storage-store-adapter: reading \`${key}\``);
          const data = this._load();
          const value = data[key];

          if (typeof value !== 'undefined') {
            return resolve(value);
          }

          return reject(new NotFoundError(`No value found for ${key}`));
        });
      }

      /**
       * Stores the specified value at the specified key
       * @param {string} key
       * @param {mixed} value
       * @returns {Promise}
       */
      put(key, value) {
        return new Promise((resolve) => {
          loggers.get(this).info(`session-storage-store-adapter: writing \`${key}\``);
          const data = this._load();

          data[key] = value;
          this._save(data);
          resolve();
        });
      }
    };
  }

  /**
   * Returns an adapter bound to the specified namespace
   * @param {string} namespace
   * @param {Object} options
   * @returns {Promise<Bound>}
   */
  bind(namespace, options) {
    options = options || {};
    if (!namespace) {
      return Promise.reject(new Error('`namespace` is required'));
    }

    if (!options.logger) {
      return Promise.reject(new Error('`options.logger` is required'));
    }

    options.logger.info('session-storage-store-adapter: returning binding');

    return Promise.resolve(new this.Bound(namespace, options));
  }
}
