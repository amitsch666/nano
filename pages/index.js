import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'

import stylesheet from '../styles/main.scss'
import 'font-awesome/scss/font-awesome.scss'
import { Button, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import TopNav from '../components/TopNav'

class IndexPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
	render() {
		return (
			<div>
				<Head>
					<title>Project Nano | Home</title>
		      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link rel="stylesheet" type="text/css" href="_s/main.css" />
				</Head>
				<TopNav fat />
				<main className="container-fluid px-0">
					<section id="intro">
						<div id="intro-inner" className="text-center align-middle">
							<h1>Hello Spinners<i className="fa fa-twitter"></i></h1>
						</div>
					</section>
					<Button type="button" color="success" size="lg" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => Router.push('/about')}>About</Button>
					<Link prefetch href="/about"><a>About Page</a></Link>
					<hr />
					<p>This is a <span id="UncontrolledTooltipExample">tooltip</span>.</p>
					<UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
		        <strong>Hello</strong> world!
		      </UncontrolledTooltip>
					<hr />
					<Button color="danger" size="lg" onClick={this.toggle}>Open modal</Button>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
	          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
	          <ModalBody>
	            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	          </ModalBody>
	          <ModalFooter>
	            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
	            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
	          </ModalFooter>
	        </Modal>
				</main>
			</div>
		)
	}
}
export default IndexPage
