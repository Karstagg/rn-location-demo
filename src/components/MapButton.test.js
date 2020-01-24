
import React from 'react';
import {shallow} from 'enzyme';
import MapButton from './MapButton';

describe('MapButton', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<MapButton label="test label" />);
      expect(component).toMatchSnapshot();
    });
  });
})