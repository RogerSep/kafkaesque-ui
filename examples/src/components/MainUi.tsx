import * as React from "react"
import * as Kui from "kafkaesque-ui"
import { Observable } from "rx"
import * as R from "ramda"

import { Guest, Coordinate } from "../model/Adt"

interface State {
  guests: Array<Guest>
}

interface Props {
  tabId: string
}

export class MainUi extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { 
      guests: []
    }
  }

  componentWillMount() {
    const guests = R.range(0, localStorage.length).map( ( i: number ) => localStorage.key( i ) )
      .reduce( ( items: Array<Guest>, k: string ) => {
      
        const g: Guest = JSON.parse( localStorage.getItem( k ) )
        if ( k.indexOf("guests.joined") > 0 ) {
          return items.concat( g )
        } else if ( k.indexOf("guests.left") > 0 ) {
          return items.filter( i => i.id != g.id )
        } else {
          return items
        }

      }, [] )


    Observable.from( guests )
      .concat( Kui.topic("guests.joined").observable.flatMap( ( e: any ) => {
          if ( e.newValue ) {
            const g: Guest = JSON.parse( e.newValue )
            return Observable.just( g )
          } else {
            return Observable.empty()
          }
        } ) )
      .subscribe( ( e: Guest ) => {
          this.setState( old => ( {
            guests: old.guests.concat( e )
          } ) )
        } )

    Kui.topic("guests.left").observable.subscribe( ( e: any ) => {
      const guest: Guest = JSON.parse( e.newValue )

      this.setState( ( old: State ) => ( {
        guests: old.guests.filter( s => s.id != guest.id )
      } ) )
    } )

    Kui.topic("guests.update").observable.subscribe( ( e: any ) => {
      const guest: Guest = JSON.parse( e.newValue )

      this.setState( ( old: State ) => ( {
        guests: old.guests.map( g => {
          if ( g.id == guest.id ) {
            return guest
          } else {
            return g
          }
        } )
      } ) )
    } )

  }

  updateGuest = ( g: Guest ) => {
    const sign = () => ( Math.round( Math.random() * 2 ) - 1 )
    const randomInt = ( min: number, max: number ) =>
      Math.round( Math.random() * ( Math.floor( max ) - Math.ceil( min ) ) + Math.ceil( min ) )

    const addRandom = ( p: number ): number => {
      const r = Math.abs( p + sign() * randomInt( 50, 400 ) ) % 400
      if ( Math.abs( r - p ) < 50 ) {
        return addRandom( p )
      } else {
        return r
      }
    }

    Kui.topic("guests.update").send(
      R.evolve( {
        location: {
          x: addRandom,
          y: addRandom
        }
      } )( g )
    )
  }

  render() {
    return (
      <div>
        <a href="/" target="_blank">Add more!</a>
        <div style={ { 
            position: 'relative'
          } }>
          { this.state.guests.map( g => ( 
            <div key={ g.id }
              onMouseEnter={ _ => this.updateGuest( g ) }
              style={ {
                backgroundColor: `#${ g.id }`,
                width: '50px',
                height: '50px',
                borderRadius: '100%',
                top: g.location.x,
                left: g.location.y,
                position: 'absolute',
                transition: 'top ease 0.5s 0.3s, left ease 0.3s 0.5s'
              } } >
            </div> ) ) }
        </div>
      </div>
    );
  }
}