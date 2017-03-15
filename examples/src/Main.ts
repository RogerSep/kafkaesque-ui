import { Observable } from "rx"
import * as Kui from "kafkaesque-ui"
import { takeLast } from "ramda"

function bootstrap(tabId: string): void {

  Observable.fromEvent( window, 'unload' ).subscribe( () => {
    Kui.topic("guests.left").send( {
      id: tabId
    } )
  } )

  Kui.topic("guests.joined").send( {
    id: tabId,
    location: {
      x: 0,
      y: 0
    }
  } )

}

export { bootstrap }