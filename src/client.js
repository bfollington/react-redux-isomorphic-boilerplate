import React from "react";
import App from 'App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'isomorphic-fetch';

injectTapEventPlugin();

const initialState = JSON.parse(window.__reactTransmitPacket) || {};

React.render(
    <App initialState={initialState} />,
    document.getElementById('react-root')
);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== 'production') {
  const reactRoot = window.document.getElementById('react-root');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes ||
      !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
