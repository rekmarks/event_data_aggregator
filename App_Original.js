// Nikhilesh's original demo implementation

// Exported from snack.expo.io
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: {
      latitude: 39.952214,
      longitude: -75.193208,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 }
  };

  // keep this at least for logging purposes
  _handleMapRegionChange = mapRegion => {
    // this.setState({ mapRegion }); // enable this to update the state to current location
    console.log(mapRegion);
  };

  // for Nikhilesh's location example
  async componentDidMount () {
    const result = await Location
      .getCurrentPositionAsync({});
    this.setState({
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text> ~*~ Synergy ~*~ </Text>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>
            <MapView.Marker
              coordinate={{ latitude: this.state.mapRegion.latitude,
                longitude: this.state.mapRegion.longitude }}
            />
          </MapView>
        <Text> ~*~ Synergy ~*~ </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
