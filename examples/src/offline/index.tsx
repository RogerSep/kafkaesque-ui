import * as React from "react"
import * as ReactDOM from "react-dom"

import Main from "./components/Main"
import { bootstrap } from "./bootstrap"

import "github-markdown-css"

bootstrap()

const appNode = document.createElement( "div" )
document.body.appendChild( appNode )

ReactDOM.render(
  <Main />,
  appNode
)