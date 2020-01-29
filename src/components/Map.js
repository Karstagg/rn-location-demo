import React from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import MapPolyline from 'react-native-maps/lib/components/MapPolyline';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const StyledMap = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const PlaceHolderContainer = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #2ab0b3;
  align-items: center;
  justify-content: center;
`;

const PlaceHolderTitle = styled(Text)`
  font-weight: 600;
  font-size: 32px;
  color: #ffffff;
  margin-top: ${hp(10)}px;
`;
const PlaceHolderText = styled(Text)`
  font-size: 18px;
  color: #ffffff;
  margin-top: ${hp(15)}px;
  width: 94%;
  text-align: center;
`;

const mapStyleJson = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2ab0b3',
      },
      {
        saturation: -20,
      },
      {
        lightness: 5,
      },
    ],
  },
  {
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e6e6e6',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#fff',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fff',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#fff',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];

const Map = props => {
  let shouldCalculate = () => {
    return props.locations.length > 1 && props.calculateRoute;
  };
  let setInitialRegion = () => {
    return {
      latitude: props.locations[0].latitude,
      longitude: props.locations[0].longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.05,
    };
  };
  if (shouldCalculate()) {
    return (
      <StyledMap
        provider={PROVIDER_GOOGLE}
        initialRegion={setInitialRegion()}
        showsUserLocation={false}
        followsUserLocation={false}
        customMapStyle={mapStyleJson}>
        <>
          <MapMarker coordinate={props.locations[0]} pinColor={'#2AC062'} />
          <MapPolyline
            coordinates={props.locations}
            strokeColor="#007174"
            strokeWidth={6}
          />
          <MapMarker
            coordinate={props.locations[props.locations.length - 1]}
            pinColor={'#f54290'}
          />
        </>
      </StyledMap>
    );
  } else {
    return (
      <PlaceHolderContainer>
        <PlaceHolderTitle>Location Demo</PlaceHolderTitle>
        <PlaceHolderText>
          {` a demo app to test 
react-native-maps and
react-native-background-geolocation`}
        </PlaceHolderText>
        <PlaceHolderText>Press Start to Continue</PlaceHolderText>
      </PlaceHolderContainer>
    );
  }
};

export default Map;
