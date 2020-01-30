import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Map from '../components/Map';
import MapButton from '../components/MapButton';

const Container = styled(View)`
  height: ${hp(100)}px;
  width: ${wp(100)}px;
  background-color: grey;
`;
const MapSection = styled(View)`
  height: ${hp(90)}px;
  width: ${wp(100)}px;
  background-color: grey;
`;
const ButtonSection = styled(View)`
  height: ${hp(10)}px;
  width: ${wp(100)}px;
  background-color: grey;
`;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      on: false,
      calculateRoute: false,
      motion: 'Not Started',
      moving: false,
    };
    this.handlePress = () => {
      if (this.state.on) {
        this.setState({
          on: false,
          calculateRoute: true,
        });
        BackgroundGeolocation.stop(state => {
          console.log('Stopped', state.enabled);
        });
        BackgroundGeolocation.removeListeners();
      } else {
        this.setState({
          on: true,
          calculateRoute: false,
        });
        BackgroundGeolocation.ready(
          {
            preventSuspend: true,
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10,
            stopTimeout: 1,
            debug: true,
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          },
          state => {
            console.log(
              '- BackgroundGeolocation is configured and ready: ',
              state.enabled,
            );

            if (!state.enabled) {
              BackgroundGeolocation.start(function() {
                console.log('- Start success');
              })
            }
          },
        );
        BackgroundGeolocation.getCurrentPosition({
          timeout: 30,
          persist: true,
          maximumAge: 5000,
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          samples: 3,
        }).then(location => {
          let locationArr = [...this.state.locations, this.getCoords(location)]
          this.setState({
            locations: locationArr,
          });
        });
        BackgroundGeolocation.onLocation(this.onLocation, this.onError);
        BackgroundGeolocation.onMotionChange(this.onMotionChange);
      }
    };
  }
  getCoords = location => {
    const {
      coords: {latitude, longitude},
    } = location;
    return {latitude, longitude};
  };

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  onLocation = location => {
    console.log(location)
    let locationArr = [...this.state.locations, this.getCoords(location)]
    this.setState({
      locations: locationArr,
    });
  };
  onMotionChange = event => {
    let motion = event.isMoving ? 'Moving' : 'Stationary';
    this.setState({
      moving: event.isMoving,
      motion: motion,
    });
  };
  onError = error => {
    console.warn('[location] ERROR -', error);
  };

  render() {
    return (
      <Container>
        <MapSection>
          <Map
            locations={this.state.locations}
            calculateRoute={this.state.calculateRoute}
            motion={this.state.motion}
            on={this.state.on}
          />
        </MapSection>
        <ButtonSection>
          <MapButton on={this.state.on} onPress={this.handlePress} />
        </ButtonSection>
      </Container>
    );
  }
}

export default MapContainer;
