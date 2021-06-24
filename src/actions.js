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
        console.log(block)
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

function blockchainCommand() {

}

module.exports = actions
