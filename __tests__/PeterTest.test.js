import React from "react";
import expect from "expect";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PeterTest from "../dev/peter-test/react/src/PeterTest";
import { shallow } from "enzyme"; 
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe("Renders the PeterTest correctly", () => {
    
  it("renders correctly", () => {
    const component = renderer.create(
        <PeterTest color="red" times="2"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Component: PeterTest", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<PeterTest />);
        expect(wrapper.length).toEqual(1);
    });

    it("receives a proper integer in times", () => {
        const wrapper = Enzyme.mount(<PeterTest color="red" times="2" />);
        expect(
            typeof(wrapper.prop("times")) === "string"
        ).toEqual(true);
    });

    it("receives the correct integer in times", () => {
        const wrapper = Enzyme.mount(<PeterTest color="red" times="2" />);
        expect(
            parseInt(wrapper.prop("times")) === 2
        ).toEqual(true);
    });

    it("receives a proper string in color", () => {
        const wrapper = Enzyme.mount(<PeterTest color="red" times="2" />);
        expect(
            typeof (wrapper.prop("color")) === "string"
        ).toEqual(true);
    });

    it("receives the correct string in color", () => {
        const wrapper = Enzyme.mount(<PeterTest color="red" times="2" />);
        expect(
            String(wrapper.prop("color")) === "red"
        ).toEqual(true);
    });

    it("has correct default state type for color", () => {
        const wrapper = Enzyme.mount(<PeterTest/>);
        expect(
            typeof(wrapper.state("color")) === "string"
        ).toEqual(true);
    });

    it("has correct default state for color", () => {
        const wrapper = Enzyme.mount(<PeterTest/>);
        expect(
            String(wrapper.state("color")) === "black"
        ).toEqual(true);
    });

    it("has correct default state type for times", () => {
        const wrapper = Enzyme.mount(<PeterTest/>);
        expect(
            typeof(wrapper.state("times")) === "number"
        ).toEqual(true);
    });

    it("has correct default state for times", () => {
        const wrapper = Enzyme.mount(<PeterTest/>);
        expect(
            parseInt(wrapper.state("times")) === 1
        ).toEqual(true);
    });
});

