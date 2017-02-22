import { topic } from "./topics/topic"
import { leader } from "./tabs/leader"
import { Observable } from "rx"

function start(f: () => void = () => {}) {
  leader(f)
}

const t = topic("Example")

start( () => {
  console.log("Ahora el líder soy yo")

  t.observable.subscribe( e => console.log( e ) )
} )

Observable.interval(1000).subscribe( e => {
  t.send({ e })
} )

export { start }
export { topic }
