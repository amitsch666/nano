import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import Navigation from '../components/Navigation'

export default () => (
  <div>
    <Head>
      <title>About us</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" type="text/css" href="_s/main.css" />
    </Head>
		<Navigation />
    <p>Hello world!</p>
    <button onClick={() => Router.push('/')}>Home</button>
  </div>
)
