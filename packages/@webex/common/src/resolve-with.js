/*!
 * Copyright (c) 2015-2020 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Sugar method for returning the desired object at the end of a promise chain
 * @param {any} object the item with which to resolve the promise chain
 * @returns {function}
 * @example
 * var item = {
 *   prop: 2
 * };
 * Promise
 *  .resolve(item.prop)
 *  .then(resolveWith(item))
 *  .then(function(res) {
 *    require('assert').deepEqual(res, {prop:2});
 *    return 'success'
 *  })
 *  // => success
 *
 */
export default function resolveWith(object) {
  return function resolver() {
    return Promise.resolve(object);
  };
}
