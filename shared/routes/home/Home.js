import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import config from 'utils/config';

import Segment from 'components/segment';
import Button from 'components/button';

export default class Home extends PureComponent {

  render() {
    return (
      <div>
        <Helmet title="Home" />

        <Segment>
          <h1>{config('welcomeMessage')}</h1>
        </Segment>

        <Segment>
          <Button>Button</Button>
          <Button to="http://ueno.co">Ueno.co</Button>
          <Button to="/about">About</Button>
        </Segment>
      </div>
    );
  }
}
