{
  someGeocodes.map((elt) => (
    <MapView.Marker
      coordinate={{ latitude: elt[0], longitude: elt[1] }}
    />
  ))
}
