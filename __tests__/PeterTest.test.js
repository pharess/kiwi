// PeterTest.react.test.js
import React from 'react';
//import PeterTest from '../PeterTest.react';
import PeterTest from '../dev/peter-test/src/PeterTest';
import renderer from 'react-test-renderer';

//test('PeterTest works', () => {
describe('PeterTest component renders the PeterTest correctly', () => {
  it('renders correctly', () => {
    const component = renderer.create(
        <PeterTest color="red" times="2"/>,
        //<h1>Hello World</h1>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});