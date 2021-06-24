const Blockchain = require('./blockchain.js')

const blockchain = new Blockchain()
blockchain.generateNewBlock()


function actions(vorpal) {
  vorpal.use(mineCommand).delimiter('blockchain => ')
    .show()
}

function mineCommand(vorpal) {
  vorpal.command('mine', '开始挖矿')
    .action(function (args, callback) {
      try {
        const block = blockchain.mine()
        if (block) {
          console.log(block)
        }
      } catch (e) {

      } finally {
        callback()
      }
    })
}

module.exports = actions
