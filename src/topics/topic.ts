import { Observable, Subject } from 'rx';
import * as Either from "data.either"
import * as R from "ramda"

export interface TopicOptions {
  fromBeginning: boolean
}

export interface Message<T> {
  id: string,
  timestamp: number,
  message: T
}

export interface Topic<T> {

  send(message: T): Either<Error, Message<T>>

  observable(options: TopicOptions): Observable<Message<T>>

  ack(message: Message<T>): void

}

export function topic(globalContext: any): [ Topic<string>, (string) => Topic<string> ] {

  type TopicInfo = [ string, Message<any> ]

  const everyTopicSubject = new Subject<TopicInfo>()

  const everyTopic: Observable<TopicInfo> =
    Observable.fromEvent<StorageEvent>(globalContext, 'storage')
      .filter( e => 
        e.key.indexOf("kafkaesque-ui") == 0 && 
        e.oldValue == null && 
        e.newValue != null
      )
      .map( e => {

        const m: Message<any> = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          message: JSON.parse( e.newValue )
        }

        return <TopicInfo> [ e.key, m ]
      } )
      .merge( everyTopicSubject );

  let garbageTopic: Topic<string>

  class TopicImplementation<T> implements Topic<T> {

    private obs: Observable<Message<T>>

    constructor(public name: string) {
      this.name = name
      this.obs = everyTopic
        .flatMap( x => {
          const [ key, m ] = x

          if ( key.indexOf(`kafkaesque-ui.${this.name}`) == 0 ) {
            return Observable.just<Message<T>>( m )
          } else {
            return Observable.empty<Message<T>>()
          }
        } )
    }

    send( message: T ): Either<Error, Message<T>> {
      try {
        const m: Message<T> = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          message: message
        }
        const key = `kafkaesque-ui.${this.name}.${m.timestamp}.${m.id}`;
        const value = JSON.stringify( m.message );
        globalContext.localStorage.setItem( key, value );

        everyTopicSubject.onNext( [ key, m ] )

        return new Either.Right( m )
      } catch ( e ) {
        return new Either.Left( e )
      }
    }

    observable( options: TopicOptions = { fromBeginning: false } ): Observable<Message<T>> {
      if (options.fromBeginning) {
        const messages = R.range(0, localStorage.length)
          .map( ( i: number ) => localStorage.key( i ) )
          .reduce( ( items: Array<Message<T>>, k: string ) => {
          
            if ( k.indexOf( `kafkaesque-ui.${this.name}` ) == 0 ) {
              const m: T = JSON.parse( localStorage.getItem( k ) )
              const keyMeta = k.split(".")
              return items.concat( {
                id: R.nth( -1, keyMeta ),
                timestamp: Number( R.nth( -2, keyMeta ) ),
                message: m
              } )
            } else {
              return items
            }

          }, [] )

        return Observable.from( messages ).concat( this.obs )
      } else {
        return this.obs
      }
    }

    ack(message: Message<T>) {
      garbageTopic.send(`kafkaesque-ui.${this.name}.${message.timestamp}.${message.id}`)
    }
  }

  function topicImpl <T> (name: string) {
    return <Topic<T>> new TopicImplementation<T>(name)
  }

  garbageTopic = topicImpl<string>("kui.garbage")

  return [ garbageTopic, topicImpl ]
}

export { Either }
