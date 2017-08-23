import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import makeStore from '../store';
import TopNav from '../components/TopNav';
import sessdata from '../lib/session-data';

const cookies = require('browser-cookies');
const jwt_decode = require('jwt-decode');

class AboutPage extends Component {
  static async getInitialProps({ store, isServer, res }) {
    sessdata(store, isServer, res);
  }
  constructor(props) {
    super(props);
		// const self = this;
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
	TokenFoundOnLogin(){
		axios.get('/api/authentication/validate')
			.then((response) => {
				const decodedJWT = jwt_decode(cookies.get('token'));
				this.props.onLogin(decodedJWT);
			})
			.catch((error) => {
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
      <div className="masterdiv">
        <Head>
          <title>About Us | Project Nano</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav
          user={this.props.user}
          onLogin={this.props.onLogin}
          isOpen={this.props.NavPaneIsOpen}
          toggleNav={this.toggleNav}
          LoginModalState={this.props.LoginModalState}
          toggleLoginModalState={this.toggleLoginModalState}
          toggleClickOutsideState={this.toggleClickOutsideState}
          ClickOutsideState={this.props.ClickOutsideState}
					TokenFoundOnLogin = {this.TokenFoundOnLogin}
        />
        <main className="container-fluid px-0">
          {this.props.user ?
            (
              <p>{this.props.user.firstName} {this.props.user.lastName}</p>
            )
            :
            (<p>not logged in</p>)
          }
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
        </main>
      </div>
    );
  }
}

AboutPage.propTypes = {
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
  toggle_modal1: modal1State => dispatch({ type: 'TOGGLE_MODAL1', payload: modal1State }),
  toggle_nav: NavPaneIsOpen => dispatch({ type: 'TOGGLE_NAV', payload: NavPaneIsOpen }),
  toggle_login_modal_state: LoginModalState => dispatch({ type: 'TOGGLE_LOGIN_MODAL_STATE', payload: LoginModalState }),
  toggle_click_outside_state: ClickOutsideState => dispatch({ type: 'TOGGLE_CLICK_OUTSIDE_STATE', payload: ClickOutsideState }),
});
const mapStateToProps = state => ({
  user: state.user,
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
