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
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </Head>
    <p>Hello world!</p>
    <button onClick={() => Router.push('/about')}>About</button>
    <Link prefetch href="/about">
      <a>About Page</a>
    </Link>
  </div>
)
