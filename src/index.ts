import { topic } from "./topics/topic"
import { leader } from "./tabs/leader"
import { Observable } from "rx"

const g = leader(Observable.interval(1000))
function start(f: () => void = () => {}): void {
  g(f)
}

export { start }
export { topic }
