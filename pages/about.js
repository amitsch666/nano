import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

export default () => (
  <div>
    <Head>
      <title>About us</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p>Hello world!</p>
    <button onClick={() => Router.push('/')}>Home</button>
  </div>
)
