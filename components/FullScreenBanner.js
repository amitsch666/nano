import PropTypes from 'prop-types';
import Router from 'next/router';

import NanoButton from '../components/elements/NanoButton';

const FullScreenBanner = props => (
  <section id="intro">
    <div id="intro-inner" className="text-center align-middle">
      <h1>{props.headline}</h1>
      <p>{props.tagline}</p>
      <NanoButton type="button" className="btn btn-lg" onClick={() => Router.push('/page2')}>Test Page</NanoButton>
    </div>
  </section>
);

FullScreenBanner.propTypes = {
  headline: PropTypes.string,
  tagline: PropTypes.string,
};
FullScreenBanner.defaultProps = {
  headline: '',
  tagline: '',
};

export default FullScreenBanner;
