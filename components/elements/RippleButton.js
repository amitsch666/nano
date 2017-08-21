import { Component } from 'react';
import PropTypes from 'prop-types';

class RippleButton extends Component {
  constructor(props) {
    super(props);
		this.state = {
      Effect: null,
    };
    // this.onClick = this.onClick.bind(this);
  }
	componentDidMount() {
		this.setState({
			Effect: {
				duration: 750,
			},
		});
	}
	convertStyle(obj) {
    var style = '';
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }
    return style;
  }
  show(e, element) {
		var duration = 750;
		var el = element || this;
		// Disable right click
    if (e.button === 2) { return false; }
		// Create ripple
    const ripple = document.createElement('div');
    ripple.className = 'waves-ripple';
    el.appendChild(ripple);
		// Get click coordinate and element witdh
    var pos = offset(el);
    var relativeY = e.pageY - pos.top;
    var relativeX = e.pageX - pos.left;
    var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';
		// Support for touch devices
    if ('touches' in e) {
      relativeY = e.touches[0].pageY - pos.top;
      relativeX = e.touches[0].pageX - pos.left;
    }
		// Attach data to element
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-x', relativeX);
    ripple.setAttribute('data-y', relativeY);
		// Set ripple position
    var rippleStyle = {
      'top': relativeY + 'px',
      'left': relativeX + 'px'
    };
		ripple.className = ripple.className + ' waves-notransition';
	  ripple.setAttribute('style', convertStyle(rippleStyle));
	  ripple.className = ripple.className.replace('waves-notransition', '');
		// Scale the ripple
    rippleStyle['-webkit-transform'] = scale;
    rippleStyle['-moz-transform'] = scale;
    rippleStyle['-ms-transform'] = scale;
    rippleStyle['-o-transform'] = scale;
    rippleStyle.transform = scale;
    rippleStyle.opacity = '1';

    rippleStyle['-webkit-transition-duration'] = duration + 'ms';
    rippleStyle['-moz-transition-duration'] = duration + 'ms';
    rippleStyle['-o-transition-duration'] = duration + 'ms';
    rippleStyle['transition-duration'] = duration + 'ms';

    rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
    rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

    ripple.setAttribute('style', convertStyle(rippleStyle));
	}
	hide(e) {
		var duration = 750;
    TouchHandlerAllowEvent(e);
		var el = this;
    var width = el.clientWidth * 1.4;
		// Get first ripple
    var ripple = null;
    var ripples = el.getElementsByClassName('waves-ripple');
    if (ripples.length > 0) {
      ripple = ripples[ripples.length - 1];
    } else {
      return false;
    }
    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');
    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;
    if (delay < 0) {delay = 0; }
		// Fade out ripple after delay
    setTimeout(function () {
      var style = {
        'top': relativeY + 'px',
        'left': relativeX + 'px',
        'opacity': '0',

        // Duration
        '-webkit-transition-duration': duration + 'ms',
        '-moz-transition-duration': duration + 'ms',
        '-o-transition-duration': duration + 'ms',
        'transition-duration': duration + 'ms',
        '-webkit-transform': scale,
        '-moz-transform': scale,
        '-ms-transform': scale,
        '-o-transform': scale,
        'transform': scale
      };

      ripple.setAttribute('style', convertStyle(style));

      setTimeout(function () {
        try {
          el.removeChild(ripple);
        } catch (e) {
          return false;
        }
      }, duration);
    }, delay);
	}
		// Disable mousedown event for 500ms during and after touch
	TouchHandlerAllowEvent(e) {
		/* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
		var touches = 0;
		var allow = true;
		if (e.type === 'touchstart') {
			touches += 1; //push
		} else if (e.type === 'touchend' || e.type === 'touchcancel') {
			setTimeout(function () {
				if (touches > 0) {
					touches -= 1; //pop after 500ms
				}
			}, 500);
		} else if (e.type === 'mousedown' && touches > 0) {
			allow = false;
		}
		return allow;
	}

	// Delegated click handler for .waves-effect element. Returns null when .waves-effect element not in "click tree".
	getWavesEffectElement(e) {
    if (TouchHandlerAllowEvent(e) === false) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

	// Bubble the click and show effect if .waves-effect elem was found
	showEffect(e) {
		var element = getWavesEffectElement(e);
    if (element !== null) {
      show(e, element);
      if ('ontouchstart' in window) {
        element.addEventListener('touchend', this.hide, false);
        element.addEventListener('touchcancel', this.hide, false);
      }
      element.addEventListener('mouseup', this.hide, false);
      element.addEventListener('mouseleave', this.hide, false);
      element.addEventListener('dragend', this.hide, false);
    }
	}











  render() {
    return (
      <button
        className={`${this.props.className} btn-nano`}
        type={this.props.type}
        onClick={this.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default RippleButton;

RippleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
