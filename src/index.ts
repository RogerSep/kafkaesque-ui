import { topic as t } from "./topics/topic"
import { leader } from "./tabs/leader"
import { Observable } from "rx"

const g = leader(Observable.interval(1000))
function s(f: () => void = () => {}): void {
  g(f)
}

namespace Kui {
  
  export function start(f: () => void = () => {}): void {
    return s(f)
  }

  export function topic(name: string) {
    return t(name)
  }

}

export { s as start }
export { t as topic }
export default Kui
