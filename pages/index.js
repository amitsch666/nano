import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'

import stylesheet from '../styles/main.scss'

export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" type="text/css" href="_s.css" />
    </Head>
		<div className="container-fluid">
			<p>Hello world!</p>
		</div>
    <button className="btn-lg btn-primary" onClick={() => Router.push('/about')}>About</button>
    <Link prefetch href="/about">
      <a>About Page</a>
    </Link>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
  </div>
)
