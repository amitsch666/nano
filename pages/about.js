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
		</main>
  </div>
)
