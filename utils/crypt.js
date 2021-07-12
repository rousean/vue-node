/**
 * crypto.createCipheriv(algorithm, key, iv[, options])
 * algorithm: aes-128-cbc/aes-256-cbc
 * encoding: base64|hex
 * 在使用加密算法的时候,给定的密钥长度是有要求的,否则会爆出this[kHandle].initiv(cipher,credential,iv,      authTagLength);Error:Invalid key length...的错误
 * 以aes-256-cbc算法为例,需要256bits=32bytes大小的密钥.同样地,AES的IV也是有要求的,需要128bits=16bytes
 */

let crypto = require('crypto')

// 默认key
const Key = '01234567899876543210012345678998'
const Iv = '0123456789987654'
const algorithm = 'aes-256-cbc'

/**
 * 加密函数
 * @param {string} content 加密内容
 * @param {string|Buffer} key lgorithm使用的原始密钥
 * @param {string|Buffer} iv 初始化向量
 * @returns
 */
function aesEncrypt(content, key = Key, iv = Iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let crypted = cipher.update(content, 'utf8', 'hex')
  crypted = cipher.final('hex')
  return crypted
}
/**
 * 解密函数
 * @param {string} content 解密内容
 * @param {string|Buffer} key lgorithm使用的原始密钥
 * @param {string|Buffer*} iv 初始化向量
 * @returns
 */
function aesDecrypt(content, key = Key, iv = Iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(content, 'hex', 'utf8')
  decrypted = decipher.final('utf8')
  return decrypted
}

// 自定义规则生成新密码
function encrypt(pwd) {
  return md5(md5(pwd).substr(2, 7) + md5(pwd))
}

// 创建md5算法
function md5(pwd) {
  return crypto.createHash('md5').update(pwd).digest('base64')
}

module.exports = {
  aesEncrypt,
  aesDecrypt,
  encrypt,
}
