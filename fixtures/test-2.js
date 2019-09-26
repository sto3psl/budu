import schedule from '../src/index.js'

export default function callSchedule (calls) {
  schedule({
    measure: () => calls.push('measure-2'),
    update: () => calls.push('update-2')
  })
}
