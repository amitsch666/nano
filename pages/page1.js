import { Component } from 'react';
import { Button } from 'reactstrap';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';

import 'font-awesome/scss/font-awesome.scss';
// eslint-disable-next-line no-unused-vars
import stylesheet from '../styles/main.scss';

import TopNav from '../containers/TopNav';
import MyModal from '../components/MyModal';

class Page1 extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
    return {custom: 'custom'}; // you can pass some custom props to component from here
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
          <Button type="button" color="success" size="lg" onClick={() => Router.push('/about')}>About</Button>
          <Link prefetch href="/"><a>Home Page</a></Link>
          <div>Prop from Redux {this.props.foo}</div>
          <div>Prop from getInitialProps {this.props.custom}</div>
        </main>
      </div>
    )
  }
}

Page1 = withRedux(makeStore, (state) => ({foo: state.foo}))(Page1);
export default Page1;
