import React, { Component } from 'react'
import { aaa } from './test'
import './index.css'

export interface Props {
  a?: string
}

export default class App extends Component<Props> {
  private aaaa = async () => {
    console.log('xxx')
  }

  public render() {
    const {
      a
    } = this.props

    return (
      <div className="test">
        test 

        { aaa.a }
      </div>
    )
  }
}