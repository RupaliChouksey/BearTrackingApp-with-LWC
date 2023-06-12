import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Bear object fields
import TRAINER_FIELD from '@salesforce/schema/Pokemon__c.Trainer__c';
const PokemonFields = [TRAINER_FIELD];
export default class detailFormTrainer extends LightningElement {
	@api recordId; // Bear Id
	@wire(getRecord, { recordId: '$recordId', fields: PokemonFields })
  Pokemon;
	get TrainerId() {
		return getFieldValue(this.Pokemon.data, TRAINER_FIELD);
	}
}