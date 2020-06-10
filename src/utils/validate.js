/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = [
    'dingsun',
    'reviewer1',
    'reviewer2',
    'reviewer3',
    'reviewer4',
    'leader',
    'director'
  ]
  return valid_map.indexOf(str.trim()) >= 0
}
