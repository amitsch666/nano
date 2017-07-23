import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'

import stylesheet from '../styles/main.scss'
import { Button, UncontrolledTooltip } from 'reactstrap'

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
		<Button color="primary" size="lg">primary</Button>{` `}
    <Button type="button" color="success" size="lg" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => Router.push('/about')}>About</Button>
    <Link prefetch href="/about">
      <a>About Page</a>
    </Link>
		<hr />
			<p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
      <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
        Hello world!
      </UncontrolledTooltip>
		<hr />
		<Button type="button" color="default" size="lg" data-toggle="modal" data-target="#exampleModal">Launch demo modal</Button>
		<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        ...
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" className="btn btn-primary">Save changes</button>
		      </div>
		    </div>
		  </div>
		</div>
  </div>
)
