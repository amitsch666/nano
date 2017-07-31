import { Button } from 'reactstrap';

export default (props) => (
  <section id="intro">
    <div id="intro-inner" className="text-center align-middle">
      <h1>{props.headline}</h1>
      <p>{props.tagline}</p>
      <p>{process.env.MY_NAME}</p>
    </div>
  </section>
)
