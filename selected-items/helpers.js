export function cartText (items) {
  const price = items.reduce((sum, { value }) => sum + value, 0)

  return `${items.length} items selected. Total: ${price / 100}€`
}

export function collectSelections (selectedItems, item) {
  if (!item) {
    return selectedItems
  }

  if (item.unchecked) {
    const index = selectedItems.findIndex((selected) => selected.text === item.text)
    return [
      ...selectedItems.slice(0, index),
      ...selectedItems.slice(index + 1)
    ]
  }

  return [...selectedItems, item]
}
