import * as React from "react"
import * as R from "ramda"
import * as readme from "../README.md"
import * as styles from "./Main.scss"
import { topic } from "kafkaesque-ui"
import { DOM } from "rx-dom"
import { Observable } from "rx"

export interface State {
  serverUp: boolean
}

export default class Main extends React.Component<undefined, State> {

  constructor() {
    super()

    this.state = { serverUp: true }
  }

  submit = () => {
    topic( "user.requests" )
      .send( Math.random() * 100 )
  }

  killServer = () => {

    DOM.post( {
        url: "/api/toggle-state",
        responseType: "json"
      } )
      .subscribe( e => {
        this.setState( old => ( {
          ...old,
          serverUp: e.response.state
        } ) )
      } )

  }

  render() {
    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.ui }>
          <button onClick={ this.submit } >Submit</button>
          <button onClick={ this.killServer } >
            { this.state.serverUp ? "Kill" : "Recover" } server
          </button>
        </div>
        <div className="markdown-body"
          dangerouslySetInnerHTML={ { __html: readme } } />
        <div>
        </div>
      </div>
    )    
  }

}