import React from 'react';
import {shallow} from 'enzyme';
import Map from './Map';

describe('Map', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<Map />);
      expect(component).toMatchSnapshot();
    });
  });
});


