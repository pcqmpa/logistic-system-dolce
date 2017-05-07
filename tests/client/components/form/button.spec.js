/**
 * Module with the tests of the Button component.
 * @module tests/client/components/form/button
 */
// React.
import React from 'react';

// Jest.
import renderer from 'react-test-renderer';

// Components.
import { Button } from '../../../../src/client/components/';

test('Button should render correctly', () => {
  const component = renderer.create(
    <Button>Click</Button>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
