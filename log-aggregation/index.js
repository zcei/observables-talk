const fs = require('fs')
const path = require('path')
const split = require('split')
const streamToObservable = require('stream-to-observable')
const Rx = require('rxjs/Rx')

const LOG_FILE = path.resolve(__dirname, '.', 'server.jsonl')
const readStream = fs
  .createReadStream(LOG_FILE, { encoding: 'utf8' })
  .pipe(split('\n'))

function logResult ({ errors, warnings }) {
  console.log(`${errors} errors, ${warnings} warnings`)
}

function countByType (aggregation, logItem) {
  const logType = logItem.type
  const type = `${logType}s`
  const count = aggregation[type]

  return Object.assign(aggregation, { [type]: count + 1 })
}

const logAggregation = streamToObservable(readStream)
  .filter((line) => Boolean(line))
  .map((line) => JSON.parse(line))
  .reduce(countByType, { errors: 0, warnings: 0 })

logAggregation.subscribe(logResult)
