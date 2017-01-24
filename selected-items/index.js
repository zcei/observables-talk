import { Observable } from 'rxjs/Observable'
import { from } from 'rxjs/observable/from'
import { scan } from 'rxjs/operator/scan'
import { map } from 'rxjs/operator/map'
import inquirer from 'inquirer'
import selectShell from 'select-shell'

import { cartText, collectSelections } from './helpers'

function observableShell () {
  return new Observable(function (observer) {
    const list = selectShell()
      .option('Raspberry Pi (36,50€)', 3650)
      .option('Contentful Small (Free)', 0)
      .option('JavaScript - The Good Parts (19,95€)', 1995)
      .list()

    list.on('change', (value) => observer.next(value))
    list.on('rendered', () => observer.next(null))
    list.on('select', () => observer.complete())

    return () => list.removeAllListeners()
  })
}

const selection = Observable
  ::from(observableShell())
  ::scan(collectSelections, [])
  ::map(cartText)

const ui = new inquirer.ui.BottomBar()

selection.subscribe({
  next (value) { ui.updateBottomBar(value) },
  error (err) { console.error(err) },
  complete () { process.exit(0) }
})
