import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MapButton = props => {
  const StyledButton = styled(TouchableOpacity)`
    height: ${hp(8)}px;
    width: 60%;
    margin: ${hp(1)}px 20% ${hp(1)}px 20%;
    background-color: ${!props.on ? '#2AC062' : '#f54290'};
    align-items: center;
    justify-content: center;
    border: 1px solid grey;
    box-shadow: 0px 0px 4px #505050;
    border-radius: 5px;
  `;
  return (
    <StyledButton onPress={props.onPress}>
      <Text style={{fontSize: 25, color: '#ffffff'}}>{!props.on ? 'Start' : 'Stop'}</Text>
    </StyledButton>
  );
};

export default MapButton;
