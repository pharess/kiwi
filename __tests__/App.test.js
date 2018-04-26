import React from 'react';
import expect from 'expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../dev/peter-test/src/App';
import PeterTest from '../dev/peter-test/src/PeterTest';

import { shallow } from 'enzyme'; // shallow rendering instead of rendering

Enzyme.configure({ adapter: new Adapter() });

describe('Component: PeterTest', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<PeterTest />);
        expect(wrapper.length).toEqual(1);
    });

});

describe('Component: App', () => {

    it('receives a proper integer in times', () => {
       const wrapper = shallow(<App />);
        expect(
           parseInt(
            wrapper.find('PeterTest').prop('times')
           ) >= 0
        ).toEqual(true);
    });
});

