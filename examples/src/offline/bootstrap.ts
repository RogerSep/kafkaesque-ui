import * as Kui from "kafkaesque-ui"
import { Observable } from "rx"
import * as RxDom from "rx-dom"

function bootstrap() {

  Kui.start( () => {

    const requestsTopic = Kui.topic( "user.requests" )

    const userRequests = requestsTopic
      .observable( { fromBeginning: true } )
      .controlled()

    userRequests
      .flatMap( e => {

        return RxDom.DOM.post( "/api/save", {
          e
        } ).map( _ => e ).retryWhen( errors => {

          // Exponential backoff capped at 25s
          return ( Observable.interval( 100 )
            .zip( errors, ( i, _ ) => Math.min( i, 5 ) )
            .flatMap( t => {
              console.log( `retrying in ${ t * t }s` )
              return Observable.timer( t * t * 1000 ) 
            } ) )
          
        } )

      } )
      .subscribe( e => {
        requestsTopic.ack( e )
        userRequests.request( 1 )
      } )

    userRequests.request( 1 )

  } )

}

export { bootstrap }