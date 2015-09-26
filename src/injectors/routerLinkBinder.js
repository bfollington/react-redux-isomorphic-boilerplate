import {match, Link} from 'react-router';
import routes from 'views/Routes';

var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';
var _history;

export default function bindLinksToRouter(history) {
    try {
        document;
    } catch (err) {
        return;
    }

    _history = history;

    document.addEventListener(clickEvent, onclick, false);
}


// "borrowed" from page.js
function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    var el = e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    match({ routes, location: { pathname: path } }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            return;
        } else if (error) {
            return;
        } else if (renderProps == null) {
            return;
        } else {
            e.preventDefault();

            // _history.transitionTo({pathname: path, search: ""});

            _history.pushState(null, path);
        }
    });

  }

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }
