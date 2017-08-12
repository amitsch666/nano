import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
// import Cookies from 'universal-cookie';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import makeStore from '../store';
import TopNav from '../containers/TopNav';
import sessdata from '../lib/session-data';

class Page1 extends Component {
  static getInitialProps({ store, isServer, res, req }) {
		if(isServer) {
			if(res) {
				if(res.locals) {
					if (res.locals.user) {
						store.dispatch({ type: 'USER_FIRSTNAME', payload: res.locals.user.firstName }); // component will be able to read from store's state when rendered
					}
				}
			}
		}
    return { prop1: 'test', prop2: 'test2' };
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
		const self = this;
    e.preventDefault();
    axios.post('/api/authentication/login', { username: this.state.username, password: this.state.password })
      .then(function (response) {
				// dispatch user data to the store
				self.props.add_firstname(response.data.firstName);
      })
      .catch(function (error) {
        console.log(error);
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
          <p>{this.props.user_firstname}</p>
          <Button type="button" color="success" size="lg" onClick={() => Router.push('/about')}>About</Button>
          <Link prefetch href="/"><a>Home Page</a></Link>
          <form onSubmit={this.onSubmit} className="col col-md-4 offset-md-4">
            <div className="form-group">
              <label className="control-label">Username</label>
              <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label className="control-label">Password</label>
              <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
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

const mapDispatchToProps = (dispatch) => {
	return {
		add_firstname: (currUser) => dispatch({ type: 'USER_FIRSTNAME', payload: currUser })
	}
}

Page1 = withRedux(makeStore, state => ({ user_firstname: state.user_firstname }), mapDispatchToProps)(Page1);

Page1.propTypes = {
  resvals: PropTypes.string.isRequired,
};

export default Page1;
