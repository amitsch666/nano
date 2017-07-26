import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { Button } from 'reactstrap'

// import NavSmall from '../components/NavSmall'
import TopNav from '../components/TopNav'

export default () => (
  <div>
    <Head>
      <title>About us</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" type="text/css" href="_s/main.css" />
    </Head>
		<TopNav />
		<main className="container-fluid mt-6 px-0">
	    <p>Hello world!</p>
	    <Button color="info" size="lg" onClick={() => Router.push('/')}>Home</Button>
		</main>
  </div>
)
