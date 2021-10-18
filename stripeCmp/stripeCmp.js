import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import StripeJS from '@salesforce/resourceUrl/stripev3';

export default class StripeCmp extends LightningElement {
  isCalInitialized = false;
  stripe;
  cardElement;

  async renderedCallback() {
    if (this.isCalInitialized) {
      return;
    }
    this.isCalInitialized = true;      
    
    Promise.all([
      loadScript(this, StripeJS + '/stripe.js')
    ])
      .then(() => {

        console.log("***initialize Stripe done");
        this.stripe = Stripe('pk_test_3bHfkxTjsGOTNbTQVNtbJCsX');
        console.log("***Stripe loaded, " + this.stripe );

        const elements = Stripe.elements();
        console.log("*** Stripe after elements");
        const cardElement = elements.create('card', {});
        console.log("*** Stripe after cards");
        
      })
      .catch((error) => {
        console.error("Stripejs renderedCallback exception" + error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error loading stripe',
            message: error.message,
            variant: 'error'
          })
        );
      });
      
      
  }

  initializeStripe() {
    console.log("***initializeStripe started");
   
    // setup card Element
   
    /*
    const elements = this.stripe.elements();
    // setup card Element
    this.cardElement = elements.create("card", {});
    console.log("***Stripe loaded");

    const cardWrapper = this.template.querySelector('.stripe');    
    this.cardElement.mount(cardWrapper);
    console.log("***initializeStripe end");
*/
    // eslint-disable-next-line no-undef
    /*
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
    */
  }
}