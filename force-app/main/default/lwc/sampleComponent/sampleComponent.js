import { LightningElement,track,wire,api } from 'lwc';


import { publish, MessageContext } from 'lightning/messageService';
import LearnLMS from '@salesforce/messageChannel/LWCPassData__c';
export default class SampleComponent extends LightningElement {

  @wire(MessageContext)
  messageContext;

  handleClick(event)
  {
    const payload = { Section : event.target.title};
    publish(this.messageContext, LearnLMS, payload);

  }
}