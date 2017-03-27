import * as React from "react"
import { topic } from "kafkaesque-ui"
import { Observable } from "rx"
import * as R from "ramda"

import { Guest, Coordinate } from "../model/Adt"

interface State {
  guests: Array<Guest>
}

interface Props {
  tabId: string
}

export default class GuestsBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      guests: []
    }
  }

  componentWillMount() {

    topic("guests.joined")
      .observable( { fromBeginning: true } )
      .map( g => g.message )
      .subscribe( ( e: Guest ) => {
          this.setState( old => ( {
            guests: old.guests.concat( e )
          } ) )
        } )

    topic("guests.left")
      .observable( { fromBeginning: true } )
      .subscribe( ( e: any ) => {
        this.setState( ( old: State ) => ( {
          guests: old.guests.filter( s => s.id != e.message.id )
        } ) )
      } )

    topic("guests.updated")
      .observable({ fromBeginning: true })
      .subscribe( ( e: any ) => {
        this.setState( ( old: State ) => ( {
          guests: old.guests.map( g => {
            if ( g.id == e.message.id ) {
              return e.message
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

    topic("guests.updated").send(
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
        <div style={ { 
            position: "relative",
            width: "400px",
            height: "400px"
          } }>
          { this.state.guests.map( g => ( 
            <div key={ g.id }
              onMouseEnter={ _ => this.updateGuest( g ) }
              className="circle"
              style={ {
                backgroundColor: `#${ g.id }`,
                top: g.location.x,
                left: g.location.y,

                width: "50px",
                height: "50px",
                borderRadius: "100%",
                position: "absolute",
                transition: "top ease 0.5s 0s, left ease 0.3s 0.5s",
                boxShadow: "0 7px 14px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
              } } >
            </div> ) ) }
        </div>
      </div>
    );
  }
}