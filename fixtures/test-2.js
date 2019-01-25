import schedule from '../src/'

export default function callSchedule (calls) {
  schedule({
    measure: () => calls.push('measure-2'),
    update: () => calls.push('update-2')
  })
}
