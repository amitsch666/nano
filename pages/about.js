import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import TopNav from '../containers/TopNav';

export default class AboutPage extends Component {
  static async getInitialProps() {
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
      <div className="masterdiv">
        <Head>
          <title>About Us | Project Nano</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav />
        <main className="container-fluid px-0">
          <Button color="info" size="lg" onClick={() => Router.push('/')}>Home</Button>
          <p>No magic is involved, it auto-creates Redux store when getInitialProps
          is called by Next.js and then passes this store down to React Reduxs
          Provider, which is used to wrap the original component, also automatically.
          On the client side it also takes care of using same store every time, whereas
          on server new store is created for each request.</p>
          <p>No magic is involved, it auto-creates Redux store when getInitialProps is
          called by Next.js and then passes this store down to React Reduxs Provider,
          which is used to wrap the original component, also automatically. On the client
          side it also takes care of using same store every time, whereas on server new
          store is created for each request.</p>
          <p>No magic is involved, it auto-creates Redux store when getInitialProps is
          called by Next.js and then passes this store down to React Reduxs Provider,
          which is used to wrap the original component, also automatically. On the client
          side it also takes care of using same store every time, whereas on server new
          store is created for each request.</p>
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
        </main>
      </div>
    );
  }
}

AboutPage.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.string).isRequired,
};
