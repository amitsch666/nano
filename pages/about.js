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
    this.onLogin = this.onLogin.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleLoginModalState = this.toggleLoginModalState.bind(this);
    this.toggleClickOutsideState = this.toggleClickOutsideState.bind(this);
  }
  componentDidMount() {
    this.props.toggle_nav(false);
  }
  onLogin(data) {
    this.props.get_user(data);
  }
  toggleNav() {
    this.props.toggle_nav(!this.props.NavPaneIsOpen);
  }
  toggleLoginModalState(LoginModalState = this.props.LoginModalState) {
    this.props.toggle_login_modal_state(!LoginModalState);
  }
  toggleClickOutsideState(ClickOutsideState = this.props.ClickOutsideState) {
    this.props.toggle_click_outside_state(ClickOutsideState);
  }
  render() {
    return (
      <div className="masterdiv">
        <Head>
          <title>About Us | Project Nano</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav
          onLogin={this.onLogin}
          isOpen={this.props.NavPaneIsOpen}
          toggleNav={this.toggleNav}
          LoginModalState={this.props.LoginModalState}
          toggleLoginModalState={this.toggleLoginModalState}
          toggleClickOutsideState={this.toggleClickOutsideState}
          ClickOutsideState={this.props.ClickOutsideState}
        />
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
  NavPaneIsOpen: PropTypes.bool.isRequired,
  LoginModalState: PropTypes.bool.isRequired,
  ClickOutsideState: PropTypes.bool.isRequired,
  get_user: PropTypes.func.isRequired,
  toggle_nav: PropTypes.func.isRequired,
  toggle_login_modal_state: PropTypes.func.isRequired,
  toggle_click_outside_state: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  get_user: currUser => dispatch({ type: 'USER', payload: currUser }),
  toggle_modal1: modal1State => dispatch({ type: 'TOGGLE_MODAL1', payload: modal1State }),
  toggle_nav: NavPaneIsOpen => dispatch({ type: 'TOGGLE_NAV', payload: NavPaneIsOpen }),
  toggle_login_modal_state: LoginModalState => dispatch({ type: 'TOGGLE_LOGIN_MODAL_STATE', payload: LoginModalState }),
  toggle_click_outside_state: ClickOutsideState => dispatch({ type: 'TOGGLE_CLICK_OUTSIDE_STATE', payload: ClickOutsideState }),
});
const mapStateToProps = state => ({
  user_firstname: state.user_firstname,
  user_lastname: state.user_lastname,
  user_email: state.user_email,
  modal1_state: state.modal1_state,
  NavPaneIsOpen: state.NavPaneIsOpen,
  LoginModalState: state.LoginModalState,
  ClickOutsideState: state.ClickOutsideState,
});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps,
)(AboutPage);
