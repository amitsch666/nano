import Head from 'next/head'
import Router from 'next/router'

import stylesheet from '../styles/main.scss'
import 'font-awesome/scss/font-awesome.scss'
import { Button } from 'reactstrap'

import TopNav from '../containers/TopNav'

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
			<i className="fa fa-twitter"></i>
	    <Button color="info" size="lg" onClick={() => Router.push('/')}>Home</Button>
      <p>No magic is involved, it auto-creates Redux store when getInitialProps is called by Next.js and then passes this store down to React Redux's Provider, which is used to wrap the original component, also automatically. On the client side it also takes care of using same store every time, whereas on server new store is created for each request.</p>
      <p>No magic is involved, it auto-creates Redux store when getInitialProps is called by Next.js and then passes this store down to React Redux's Provider, which is used to wrap the original component, also automatically. On the client side it also takes care of using same store every time, whereas on server new store is created for each request.</p>
      <p>No magic is involved, it auto-creates Redux store when getInitialProps is called by Next.js and then passes this store down to React Redux's Provider, which is used to wrap the original component, also automatically. On the client side it also takes care of using same store every time, whereas on server new store is created for each request.</p>
      <p>No magic is involved, it auto-creates Redux store when getInitialProps is called by Next.js and then passes this store down to React Redux's Provider, which is used to wrap the original component, also automatically. On the client side it also takes care of using same store every time, whereas on server new store is created for each request.</p>
		</main>
  </div>
)
