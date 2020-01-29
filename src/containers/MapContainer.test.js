import React from 'react';
import {shallow} from 'enzyme';
import MapContainer from './MapContainer';

const testLocation = {
  coords: {
    floor: 0,
    longitude: -122.08193111,
    speed: 33.88,
    latitude: 37.33638536,
    accuracy: 5,
  },
};

describe('extract lat/lng from coords data', () => {
  it('should return an object in the format {latitude: value, longitude: value}', () => {
    const wrapper = shallow(<MapContainer />);
    const instance = wrapper.instance();
    expect(instance.getCoords(testLocation)).toStrictEqual({
      latitude: 37.33638536,
      longitude: -122.08193111,
    });
  });
});

describe('MapContainer', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<MapContainer />);
      expect(component).toMatchSnapshot();
    });
  });
});
