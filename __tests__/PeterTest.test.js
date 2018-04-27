import React from 'react';
import PeterTest from '../dev/peter-test/src/PeterTest';
import renderer from 'react-test-renderer';

describe('PeterTest component renders the PeterTest correctly', () => {
  it('renders correctly', () => {
    const component = renderer.create(
        <PeterTest color="red" times="2"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});