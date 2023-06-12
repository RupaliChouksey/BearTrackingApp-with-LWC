import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Set Bear object fields

const NAME_FIELD = 'Pokemon__c.Name';
const LOCATION_LATITUDE_FIELD = 'Pokemon__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Pokemon__c.Location__Longitude__s';

const PokemonFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];

export default class LocationTrackPokemon extends LightningElement {

    @api recordId;
    name;
    mapMarkers = [];
    @wire(getRecord, { recordId: '$recordId', fields: PokemonFields })

    loadBear({ error, data }) {
        if (error) {
          // TODO: handle error
        } else if (data) {
          // Get Bear data
          this.name =  getFieldValue(data, NAME_FIELD);
          const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
          const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
          // Transform bear data into map markers
          this.mapMarkers = [{
            location: { Latitude, Longitude },
            title: this.name,
            description: `Coords: ${Latitude}, ${Longitude}`
          }];
}
}
get cardTitle() {
  return (this.name) ? `${this.name}'s location` : 'Pokemon location';
}
}