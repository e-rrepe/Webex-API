/*!
 * Copyright (c) 2015-2020 Cisco Systems, Inc. See LICENSE file.
 */

/**
 * Check object for the specified keys
 * @param {Array<string>} keys
 * @param {Object} object
 * @returns {undefined}
 * @throws Error
 */
export default function checkRequired(keys, object) {
  keys.forEach((key) => {
    if (!object[key]) {
      throw new Error(`missing required property ${key} from ${object}`);
    }
  });
}
