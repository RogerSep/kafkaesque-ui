import { topic } from "./topics/topic"
import { leader } from "./tabs/leader"

function start(f: () => void = () => {}) {
  leader(f)
}

export { start }
export { topic }
