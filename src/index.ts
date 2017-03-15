import { topic as t, Topic } from './topics/topic'
import { leader } from './tabs/leader'
import { Observable } from 'rx'

const g = leader( Observable.interval(1000), localStorage )
function s(f: () => void = () => {}): void {
  g(f)
}
const h = t(window)

namespace Kui {
  
  export function start(f: () => void = () => {}): void {
    return s(f)
  }

  export function topic(name: string) {
    return h(name)
  }

}

export { s as start }
export { h as topic }
export { Topic }
export default Kui
