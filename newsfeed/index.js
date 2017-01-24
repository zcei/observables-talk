const Rx = require('rxjs/Rx')
const loremIpsum = require('lorem-ipsum')

function logResult ({ source, message }) {
  console.log(`${source}: ${message}`)
}

function randomMessage (source) {
  return {
    source,
    message: loremIpsum({ count: 10, units: 'words' })
  }
}

function feed (source, frequency) {
  return new Rx.Observable(function (observer) {
    const interval = setInterval(() => {
      observer.next(randomMessage(source))
    }, frequency)

    return () => clearInterval(interval)
  })
}

const twitterFeed = feed('Twitter', 200)
const hnFeed = feed('Hacker News', 500)

const newsfeed = Rx.Observable.merge(twitterFeed, hnFeed)
newsfeed.subscribe(logResult)
