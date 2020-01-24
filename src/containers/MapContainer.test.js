import React from 'react';
import {shallow} from 'enzyme';
import MapContainer from './MapContainer';

describe('MapContainer', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<MapContainer />);
      expect(component).toMatchSnapshot();
    });
  });
});
