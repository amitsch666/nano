import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import makeStore from '../store';
import TopNav from '../components/TopNav';
import sessdata from '../lib/session-data';
import FullScreenBanner from '../components/FullScreenBanner';

const cookies = require('browser-cookies');
const jwtDecode = require('jwt-decode');

class IndexPage extends Component {
  static async getInitialProps({ store, isServer, res, req }) {
    sessdata(store, isServer, res, req);
  }
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.TokenFoundOnLogin = this.TokenFoundOnLogin.bind(this);
    this.toggleLoginModalState = this.toggleLoginModalState.bind(this);
    this.toggleClickOutsideState = this.toggleClickOutsideState.bind(this);
  }
  componentDidMount() {
    this.props.toggle_nav(false);
  }
  toggleNav() {
    this.props.toggle_nav(!this.props.NavPaneIsOpen);
  }
  TokenFoundOnLogin() {
    // console.log('token found in page');
    axios.get('/api/authentication/validate')
      .then(() => {
        const decodedJWT = jwtDecode(cookies.get('token'));
        this.props.onLogin(decodedJWT);
      })
      .catch(() => {
        this.props.onLogin(null);
        this.props.toggle_login_modal_state(true);
      });
  }
  toggleLoginModalState(LoginModalState = this.props.LoginModalState) {
    this.props.toggle_login_modal_state(!LoginModalState);
  }
  toggleClickOutsideState(ClickOutsideState = this.props.ClickOutsideState) {
    this.props.toggle_click_outside_state(ClickOutsideState);
  }
  render() {
    return (
      <div className="masterdiv-with-fatnav">
        <Head>
          <title>Project Nano | Home</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav
          fat
          user={this.props.user}
          onLogin={this.props.onLogin}
          isOpen={this.props.NavPaneIsOpen}
          toggleNav={this.toggleNav}
          LoginModalState={this.props.LoginModalState}
          toggleLoginModalState={this.toggleLoginModalState}
          toggleClickOutsideState={this.toggleClickOutsideState}
          ClickOutsideState={this.props.ClickOutsideState}
          TokenFoundOnLogin={this.TokenFoundOnLogin}
        />
        <main className="container-fluid px-0">
          <FullScreenBanner headline={'Welcome home, Spinners!'} tagline={'This is just a random tagline, don\'t worry'} />
          <Button type="button" color="success" size="lg" onClick={() => Router.push('/about')}>About</Button>
          <Link prefetch href="/about"><a>About Page</a></Link>
          <hr />
          {this.props.user ? (
            <div>
              <p>firstName: {this.props.user.firstName}</p>
            </div>
          ) : (<p>not logged in</p>) }
          <a href="/api/authentication/auth/facebook">facebook</a>
          <p>This is a <span id="UncontrolledTooltipExample">tooltip</span>.</p>
          <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
            <strong>Hello</strong> world!
          </UncontrolledTooltip>
        </main>
      </div>
    );
  }
}

IndexPage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    img: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
  NavPaneIsOpen: PropTypes.bool.isRequired,
  LoginModalState: PropTypes.bool.isRequired,
  ClickOutsideState: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  toggle_nav: PropTypes.func.isRequired,
  toggle_login_modal_state: PropTypes.func.isRequired,
  toggle_click_outside_state: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLogin: currUser => dispatch({ type: 'USER', payload: currUser }),
  toggle_nav: NavPaneIsOpen => dispatch({ type: 'TOGGLE_NAV', payload: NavPaneIsOpen }),
  toggle_login_modal_state: LoginModalState => dispatch({ type: 'TOGGLE_LOGIN_MODAL_STATE', payload: LoginModalState }),
  toggle_click_outside_state: ClickOutsideState => dispatch({ type: 'TOGGLE_CLICK_OUTSIDE_STATE', payload: ClickOutsideState }),
});
const mapStateToProps = state => ({
  user: state.user,
  NavPaneIsOpen: state.NavPaneIsOpen,
  LoginModalState: state.LoginModalState,
  ClickOutsideState: state.ClickOutsideState,
});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
