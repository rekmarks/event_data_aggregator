// Exported from snack.expo.io
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';

// EWISOTT, list of lists
const someGeocodes = [[39.950882, -75.192983, "Irvine Auditorium"],
                      [39.951649, -75.192695, "Fisher Fine Arts Library"],
                      [39.951783, -75.190953, "SEAS"],
                      [39.953907, -75.193101, "Penn Law"],
                      [39.953147, -75.198195, "John M Huntsman Hall"]]

// our App gets all this stuff
export default class App extends Component {

  // setting the state for the mapRegion prop
  // supposedly we can set states for other things in here as well
  state = {
    mapRegion: {
      latitude: 39.952214,
      longitude: -75.193208,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421 }
  };

  // creates a log when we change the mapRegion, i.e. whenever we scroll
  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
  };

  // critical render function
  // all our html etc goes in the parentheses of return
  render() {
    return (

      /* NOTE: NO JS ("//") COMMENTS WITHIN HTML

         Return takes a mix of HTML and React JavaScript (denoted by {})
         in order to render the different "views" (i.e. pages) of your app,
         much like a browser renders a webpage. */

      /* From the React Native docs:
         "[View is] the most fundamental component for building a UI" */
      <View style={styles.container}>

      {/* Comments in here NEED to be wrapped like this */}

        <Text> ~*~ Synergy ~*~ </Text>
        {/* We use the MapView COMPONENT to create maps in
            React Native. Components have PROPS that determine state/behavior,
            such as "style" and "region" below.
            You CANNOT put comments inside HTML angle brackets (<>). */}
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
          scrollEnabled={true}
        >

          {/* Marker components are entered as children of MapView Components.
              They're simply the map pins. This first one is static. */}
          <MapView.Marker
            coordinate={{ latitude: this.state.mapRegion.latitude,
                          longitude: this.state.mapRegion.longitude }}
            pinColor={'#000000'}
            identifier={'abc'}
          >
            {/* The Callout component is the little popup that appears above
                the pins when you press them on your phone. */}
            <MapView.Callout>
              <Text>Hello!</Text>
            </MapView.Callout>
          </MapView.Marker>

          {/* Here's an interesting piece of React.
              It calls the map method on the list of lists, someGeocodes.
              This loops/iterates through the elements of that (outer) list,
              which are themselves (inner) lists. Then, it generates Markers
              with Callout children using using the elements of the inner lists.
              This allows us to programatically put markers on the map without
              hardcoding them.

              Ultimately, we will fetch data from our backend to
              construct our list of lists and use that to render even more
              markers. */}
          {
            someGeocodes.map((elt) => (
              <MapView.Marker
                coordinate={{ latitude: elt[0], longitude: elt[1] }}
              >
                <MapView.Callout>
                  <Text>{elt[2]}</Text>
                </MapView.Callout>
              </MapView.Marker>
            ))
          }
        {/* closing MapView tag */}
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
