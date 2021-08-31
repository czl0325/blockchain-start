const Blockchain = require('./blockchain.js')
const { beautifulLog } = require('./utils.js')

const blockchain = new Blockchain()
blockchain.generateNewBlock()


function actions(vorpal) {
  vorpal
    .use(mineCommand).use(blockchainCommand)
    .delimiter('区块链 => ')
    .show()
}

function mineCommand(vorpal) {
  vorpal.command('mine', '开始挖矿')
    .action(function (args, callback) {
      try {
        const block = blockchain.mine()
        if (block) {
          beautifulLog(block)
        }
      } catch (e) {
        console.log(e)
      } finally {
        callback()
      }
    })
}

function blockchainCommand(vorpal) {
  vorpal.command('blockchain', '查看整条区块链[bc]')
    .alias('bc')
    .action(function (args, callback) {
      beautifulLog(blockchain.blockchain)
      callback()
    })
}

function transferCommand(vorpal) {
  vorpal.command('trans <to> <amount>', '给他人转账')
    .action(function (args, callback) {
      try {

      } catch (e) {
        console.log(e)
      } finally {
        callback()
      }
    })
}

module.exports = actions
