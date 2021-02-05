import React, { Component } from 'react'
import { aaa } from './test'

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
      <div>
        test 

        { aaa.a }
      </div>
    )
  }
}