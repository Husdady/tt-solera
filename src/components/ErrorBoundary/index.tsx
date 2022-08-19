// React
import React from 'react'

// Components
import MultiLangText from '@components/MultiLangText'

// Interfaces
import {
  BoundaryProps,
  BoundaryState
} from '@interfaces/ErrorBoundary.interface'

const robot = require('@images/robot.png')

export default class ErrorBoundary extends React.PureComponent<
  BoundaryProps,
  BoundaryState
> {
  public _isMounted: boolean = false
  public state: BoundaryState = {
    error: null
  }

  public componentDidMount() {
    this._isMounted = true
  }

  public componentDidCatch(error: Error) {
    // Capturar el error en caso se haya montado el componente
    this._isMounted && this.setState({ error: error.message })
  }

  public componentWillUnmount() {
    this._isMounted = false
  }

  public render() {
    if (this.state.error) {
      return (
        <div className="error-application">
          <img src={robot} alt="robot" />
          <span>
            <MultiLangText dictionaryKey="error-application-sidh18" />:
          </span>
          <code>{JSON.stringify(this.state.error)}</code>
        </div>
      )
    }

    return this.props.children
  }
}
