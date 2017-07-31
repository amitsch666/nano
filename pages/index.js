import { Component } from 'react';
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'

import stylesheet from '../styles/main.scss'
import 'font-awesome/scss/font-awesome.scss'
import { Button, UncontrolledTooltip } from 'reactstrap'

import TopNav from '../containers/TopNav'
import MyModal from '../components/MyModal'
import FullScreenBanner from '../components/FullScreenBanner'

export default class IndexPage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      modal1: false
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
  }
  toggleModal1() {
    this.setState({
      modal1: !this.state.modal1
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
					<FullScreenBanner headline={`Welcome home, Spinners!`} tagline={`This is just a random tagline, don't worry`} />
					<Button type="button" color="success" size="lg" onClick={() => Router.push('/about')}>About</Button>
					<Link prefetch href="/about"><a>About Page</a></Link>
					<hr />
					<p>This is a <span id="UncontrolledTooltipExample">tooltip</span>.</p>
					<UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
		        <strong>Hello</strong> world!
		      </UncontrolledTooltip>
					<hr />
					<Button color="danger" size="lg" onClick={this.toggleModal1}>Open modal</Button>
					<MyModal isOpen={this.state.modal1} toggle={this.toggleModal1} className={`amit-test`} /> {/* value in className gets added to .modal-dialog */}
				</main>
			</div>
		)
	}
}
