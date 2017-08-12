import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import TopNav from '../containers/TopNav';
import MyModal from '../components/MyModal';
import FullScreenBanner from '../components/FullScreenBanner';

export default class IndexPage extends Component {
  static async getInitialProps({ req }) {
    const getshows = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const shows = await getshows.json();
    return { shows };
  }
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    };
    this.toggleModal1 = this.toggleModal1.bind(this);
  }
  toggleModal1() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }
  render() {
    return (
      <div className="masterdiv-with-fatnav">
        <Head>
          <title>Project Nano | Home</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav fat />
        <main className="container-fluid px-0">
          <FullScreenBanner headline={'Welcome home, Spinners!'} tagline={'This is just a random tagline, don\'t worry'} />
          <Button type="button" color="success" size="lg" onClick={() => Router.push('/page1')}>Page1</Button>
          <Link prefetch href="/about"><a>About Page</a></Link>
          <hr />
          <p>This is a <span id="UncontrolledTooltipExample">tooltip</span>.</p>
          <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
            <strong>Hello</strong> world!
          </UncontrolledTooltip>
          <hr />
          <ul>
            {this.props.shows.map(({ show }) => (
              <li key={show.id}>
                <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                  <a>{show.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <Button color="danger" size="lg" onClick={this.toggleModal1}>Open modal</Button>
          <MyModal isOpen={this.state.modal1} toggle={this.toggleModal1} className={'someclass'} modalClassName={'otherclass'} /> {/* value in className gets added to .modal-dialog */}
        </main>
      </div>
    );
  }
}

IndexPage.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.string).isRequired,
};
