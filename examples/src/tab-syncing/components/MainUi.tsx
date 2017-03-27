import * as React from "react"
import GuestsBoard from "./GuestsBoard"
import * as readme from "../README.md"
import * as styles from "./MainUi.scss"

interface Props {
  tabId: string
}

export default class MainUi extends React.Component<Props, undefined> {

  render() {
    return (
      <div className={ styles.mainContainer }>
        <GuestsBoard tabId={ this.props.tabId } />
        <a className={ styles.link } href="#" target="_blank">Open in new tab</a>
        <div 
          className={ `markdown-body ${styles.exampleDescription}` } 
          dangerouslySetInnerHTML={ { __html: readme } } />
      </div>
    )
  }

}