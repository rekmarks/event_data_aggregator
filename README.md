## UPenn Data Aggregator
The app that will change the world of tomorrow, today.

## Synopsis

This Expo/React Native mobile app will aggregate and display information from various sources from upenn.edu.

## Code Example

This code programmatically generates Google Maps markers from a list of lists:
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

## Motivation

Information relevant to UPenn grad students (i.e. times and locations of free food) is spread across multiple websites. This app is an attempt to create a one-stop shop for all UPenn grad students' event-finding needs.

## Installation

App must currently be run through the Expo XDE: https://expo.io/tools
Should work on both Android and iOS.

## API Reference

https://expo.io

## Tests

TODO

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

None now, maybe at some point.
