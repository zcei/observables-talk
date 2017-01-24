const promoted = [
  { listing: '10qm in Prenzelberg', promoted: true },
  { listing: 'Luxury Apartment in Mitte', promoted: true }
]

const normal = [
  { listing: 'Right in the nature, Grunewald' }
]

module.exports = fetch
function fetch (modifier) {
  const listings = modifier === 'promoted' ? promoted : normal
  return Promise.resolve(listings)
}
