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
    };
    this.handlePress = () => {
      if (this.state.on) {
        this.setState({
          on: false,
          calculateRoute: true,
        });
        BackgroundGeolocation.removeListeners();
      } else {
        this.setState({
          on: true,
          calculateRoute: false,
        });
        BackgroundGeolocation.ready(
          {
            // Geolocation Config
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 50,
            // Activity Recognition
            stopTimeout: 1,
            // Application config
            debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
            stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
            startOnBoot: true, // <-- Auto start tracking when device is powered-up.
            // HTTP / SQLite config
            url: 'http://yourserver.com/locations',
            batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
            headers: {
              // <-- Optional HTTP headers
              'X-FOO': 'bar',
            },
            params: {
              // <-- Optional HTTP params
              auth_token: 'maybe_your_server_authenticates_via_token_YES?',
            },
          },
          state => {
            console.log(
              '- BackgroundGeolocation is configured and ready: ',
              state.enabled,
            );

            if (!state.enabled) {
              ////
              // 3. Start tracking!
              //
              BackgroundGeolocation.start(function() {
                console.log('- Start success');
              });
            }
          },
        );
        BackgroundGeolocation.getCurrentPosition({
          timeout: 30, // 30 second timeout to fetch location
          persist: true, // Defaults to state.enabled
          maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
          desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
          samples: 3, // How many location samples to attempt.
          extras: {
            // Custom meta-data.
            route_id: 123,
          },
        }).then(location => {
          let locationArr = [...this.state.locations, location]
          this.setState({
            locations: locationArr,
          });
        });
        BackgroundGeolocation.onLocation(this.onLocation, this.onError);
      }
      console.log(this.state.on);
    };
  }
  componentDidMount(): void {}

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  onLocation = location => {
    let locationArr = [...this.state.locations, location]
    this.setState({
      locations: locationArr,
    });
  };
  onError = error => {
    console.warn('[location] ERROR -', error);
  };

  render() {
    return (
      <Container>
        <MapSection>
          <Map locations={this.state.locations} calculateRoute={this.state.calculateRoute}/>
        </MapSection>
        <ButtonSection>
          <MapButton on={this.state.on} onPress={this.handlePress} />
        </ButtonSection>
      </Container>
    );
  }
}

export default MapContainer;
