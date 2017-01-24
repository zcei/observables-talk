const Rx = require('rxjs/Rx')
const fetch = require('./fetch-listings')

function logResult ({ listing, promoted }) {
  const prefix = promoted ? '*' : ' '
  console.log(`${prefix} ${listing}`)
}

function asyncListObservable (asyncList, ...args) {
  return Rx.Observable
    .from(asyncList(...args))
    .mergeMap((list) => Rx.Observable.of(...list))
}

const promoted = asyncListObservable(fetch, 'promoted')
const normal = asyncListObservable(fetch)

const realEstateFeed = Rx.Observable.concat(promoted, normal)

realEstateFeed.subscribe(logResult)
