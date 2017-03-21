import * as React from "react"
import * as ReactDOM from "react-dom"
import { Observable } from "rx"
import { takeLast } from "ramda"

import { MainUi } from "./components/MainUi"
import { bootstrap } from "./Main"

const tabId = takeLast( 6, Date.now().toString( 16 ) )
bootstrap( tabId )

const appNode = document.createElement( "div" )
document.body.appendChild( appNode )

ReactDOM.render(
  <MainUi tabId={ tabId } />,
  appNode
)