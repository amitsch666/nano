import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import makeStore from '../store';
import TopNav from '../containers/TopNav';
import sessdata from '../lib/session-data';

class Page1 extends Component {
  static async getInitialProps({ store, isServer, res }) {
    sessdata(store, isServer, res);
    return { prop1: 'test', prop2: 'test2' };
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  login(e) {
    const self = this;
    e.preventDefault();
    axios.post('/api/authentication/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        // dispatch user data to the store
				self.props.get_user(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  render() {
    return (
      <div className="masterdiv">
        <Head>
          <title>Project Nano | Home</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href={`_s/${process.env.CSS}.min.css`} />
        </Head>
        <TopNav />
        <main>
					<p>{this.props.user_firstname} {this.props.user_lastname}</p>
					<p>{this.props.user_email}</p>
          <Button type="button" color="success" size="lg" onClick={() => Router.push('/about')}>About</Button>
          <Link prefetch href="/"><a>Home Page</a></Link>
          <form onSubmit={this.login} className="col col-md-4 offset-md-4">
            <div className="form-group">
              <label className="control-label" htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control" value={this.state.username} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-lg">Sign Up</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	get_user: currUser => dispatch({ type: 'USER', payload: currUser }),
});
const mapStateToProps = state => ({
	user_firstname: state.user_firstname,
	user_lastname: state.user_lastname,
	user_email: state.user_email,
});

Page1.propTypes = {
	user_firstname: PropTypes.string.isRequired,
	user_lastname: PropTypes.string.isRequired,
	user_email: PropTypes.string.isRequired,
};

// export default Page1;
export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps,
)(Page1);
