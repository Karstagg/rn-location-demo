
import React from 'react';
import {shallow} from 'enzyme';
import MapButton from './MapButton';


describe('MapButton', () => {
  describe('Rendering', () => {
    it('should match to snapshot -Primary', () => {
      const component = shallow(<MapButton primary />);
      expect(component).toMatchSnapshot('primary button snapshot');
    });
    it('should match to snapshot -Secondary', () => {
      const component = shallow(<MapButton primary={false} />);
      expect(component).toMatchSnapshot('Secondary button snapshot');
    });
  });
  describe('Interaction', () => {
    describe('onPressHandler', () => {
      const mockOnPress = jest.fn()
      const component = shallow(<MapButton onPress={mockOnPress()} />);
      component.find('MapButton').simulate('press');
      expect(mockOnPress.mock.calls.length).toHaveBeenCalledTimes(1);
    });
  });
});
