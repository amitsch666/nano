import { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import makeStore from '../store';
import Link from 'next/link';

class Page1 extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
    return {custom: 'custom'}; // you can pass some custom props to component from here
  }
  render() {
    return (
      <div>
        <Link prefetch href="/"><a>Home Page</a></Link>
        <div>Prop from Redux {this.props.foo}</div>
        <div>Prop from getInitialProps {this.props.custom}</div>
      </div>
    )
  }
}

Page1 = withRedux(makeStore, (state) => ({foo: state.foo}))(Page1);
export default Page1;
