const Table = require('cli-table')

function beautifulLog(data) {
  if (!Array.isArray(data)) {
    data = [data]
  }
  if (data.length === 0) {
    return null
  }
  const first = data[0]
  const headers = Object.keys(first)
  const res = data.map(v=>{
    return headers.map(h=>JSON.stringify(v[h], null, 1)||'')
  })
  const table = new Table({
    head: headers,
    colWidths: new Array(headers.length).fill(16)
  })
  table.push(...res)
  console.log(table.toString())
}

module.exports = { beautifulLog }
