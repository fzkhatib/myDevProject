import { LightningElement,wire,api } from 'lwc';
import myImage from '@salesforce/resourceUrl/AboutMe';
import myGif from '@salesforce/resourceUrl/onLoad';
import guitar from '@salesforce/resourceUrl/GuitarPNG';
import Teach from '@salesforce/resourceUrl/TeachingGif';
import cook from '@salesforce/resourceUrl/CookingGif';
import badmin from '@salesforce/resourceUrl/badmintonGif';
import { subscribe, MessageContext } from 'lightning/messageService';
import LearnLMS from '@salesforce/messageChannel/LWCPassData__c';
import sendEmail from '@salesforce/apex/resumeController.sendEmail';
export default class ChildLwc extends LightningElement {
    backgroundImage = myImage;
    finalStyle;
    theGif = myGif;
    guitarPNG = guitar;
    teachingGif = Teach;
    cookHobby = cook;
    badmintoonHobby = badmin;
    // variables for Form
    personName;
    personEmail;
    personMessage;

    isLoading = true;
    @wire(MessageContext)
    messageContext;

       connectedCallback() {
        // Simulating data load with a delay
        setTimeout(() => {
            this.isLoading = false; // Set to false when the load is complete
        }, 1000); // Simulate a 2-second delay (replace with actual data fetching logic)
        this.subscription = subscribe(this.messageContext,LearnLMS, (message) => this.handleMessage(message));
    }


     handleMessage(message)
    {
        var portfolioSection;
        
        if(message.Section == 'portfolio-section')
        {
             portfolioSection = this.template.querySelector('.portfolio-section');
        }
        else if(message.Section == 'experience-section')
        {
             portfolioSection = this.template.querySelector('.experience-section');
        }
        else if(message.Section == 'contact-section')
        {
             portfolioSection = this.template.querySelector('.contact-section');
        }
        
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }


    scrollToPortfolio() {
        const portfolioSection = this.template.querySelector('.portfolio-section');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleContactSubmit() {
       var arry= this.template.querySelectorAll('.dataInput');
       arry.forEach(currentItem => {
        if(currentItem.label == 'Your Name')
        {
            this.personName = currentItem.value;
        }
        else if(currentItem.label == 'Your Email')
        {
            this.personEmail = currentItem.value;
        }
        else if(currentItem.label == 'Message')
        {
            
            this.personMessage = currentItem.value;
        }
        
        //TODO : currentItem
       });
       if(this.personEmail != null && this.personName != null &&  this.personMessage != null)
       {
        sendEmail({Name : this.personName , Email : this.personEmail , Message : this.personMessage});
       }
       
    }

     get getBackgroundImage(){
        return `background-image:url("${this.backgroundImage}")`;
    }

  

}