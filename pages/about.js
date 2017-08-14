import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import makeStore from '../store';
import TopNav from '../containers/TopNav';
import sessdata from '../lib/session-data';

class AboutPage extends Component {
  static async getInitialProps({ store, isServer, res }) {
		sessdata(store, isServer, res);
    const getshows = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const shows = await getshows.json();
    return { shows };
  }
  constructor(props) {
    super(props);
		this.onLogin = this.onLogin.bind(this);
  }
	onLogin(data) {
		this.props.get_user(data);
	}
  render() {
    return (
      <div className="masterdiv">
        <Head>
          <title>About Us | Project Nano</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav onLogin={this.onLogin} />
        <main className="container-fluid px-0">
					<p>{this.props.user_firstname} {this.props.user_lastname}</p>
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
	user_firstname: PropTypes.string.isRequired,
  user_lastname: PropTypes.string.isRequired,
  user_email: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  get_user: currUser => dispatch({ type: 'USER', payload: currUser }),
});
const mapStateToProps = state => ({
  user_firstname: state.user_firstname,
  user_lastname: state.user_lastname,
  user_email: state.user_email,
});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps,
)(AboutPage);
