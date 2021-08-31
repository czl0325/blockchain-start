const crypto = require('crypto')

const initBlock = {
  index: 0,
  prevHash: "0",
  data: ["welcome to blockchain"],
  timestamp: 1624449478823,
  nonce: 0,
  hash: "55f5f781a6dcc7715a1106957b35dda58fe0fb7f7fd5b1378e2515fdb104c8d2"
}

class Blockchain {
  constructor() {
    this.blockchain = [initBlock]
    this.data = []
    this.difficulty = 4
  }
  // 挖矿
  mine() {
    if (!this.verifyBlockchain()) {
      console.log('区块链不合法')
      return null;
    }
    const newBlock = this.generateNewBlock()
    if (!this.verifyBlock(newBlock)) {
      console.log('区块不合法')
      return null;
    }
    this.blockchain.push(newBlock)
    return newBlock
  }
  // 转账
  transfer(from, to, amount) {

  }
  // 生成新区块
  generateNewBlock() {
    const index = this.blockchain.length
    const prevBlock = this.blockchain[this.blockchain.length-1]
    const prevHash = prevBlock.hash
    const data = this.data
    let timestamp = new Date().getTime()
    let nonce = 0
    let hash = this.sha256Hash(index + prevHash + JSON.stringify(data) + timestamp + nonce)
    while (hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      nonce = nonce + 1
      timestamp = new Date().getTime()
      hash = this.sha256Hash(index + prevHash + JSON.stringify(data) + timestamp + nonce)
    }
    return {
      index,
      prevHash,
      hash,
      timestamp,
      data,
      nonce
    }
  }
  // 校验区块
  verifyBlock(block) {
    if (block.index > 0) {
      const prevBlock = this.blockchain[this.blockchain.length-1]
      if (block.index !== prevBlock.index + 1) {
        return false
      }
      if (block.prevHash !== prevBlock.hash) {
        return false
      }
      if (block.timestamp < prevBlock.timestamp) {
        return false
      }
      const tempHash = this.sha256Hash(block.index + block.prevHash + JSON.stringify(block.data) + block.timestamp + block.nonce)
      if (tempHash !== block.hash) {
        return false
      }
    }
    return true
  }
  // 校验区块链
  verifyBlockchain(blockchain = this.blockchain) {
    for (let i = blockchain.length - 1;i>1;i--) {
      const block = blockchain[i]
      if (!this.verifyBlock(block)) {
        return false
      }
    }
    return true
  }
  sha256Hash(value) {
    return crypto.createHash('sha256').update(String(value)).digest('hex')
  }
}

module.exports = Blockchain
