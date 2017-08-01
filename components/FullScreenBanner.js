import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const FullScreenBanner = props => (
  <section id="intro">
    <div id="intro-inner" className="text-center align-middle">
      <h1>{props.headline}</h1>
      <p>{props.tagline}</p>
      <p>{process.env.MY_NAME}</p>
      <Button color="info" size="lg">Test Button</Button>
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
