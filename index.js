'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const skillName = 'Mini You';
const welcomeMessage = "Welcome to " + skillName;
const helpMessage = 'I can give compliments to your family members.';
const helpReprompt = 'What can I help you with?';
const stopMessage = 'Goodbye!';

const data = [
    {firstName:"Elisa"},
    {firstName:"Diana"},
    {firstName:"Sofiya"}
];

const compliments = [
    'is so beautiful',
    'is so smart',
    'is outstanding!',
];

const hiStrings = [
    'Hi',
    'Hello',
    'Howdy',
];

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(welcomeMessage).listen(getGenericHelpMessage(data));
        this.emit(':responseReady');
    },
    'GiveComplimentByNameIntent': function () {
        // let firstName = isSlotValid(this.event.request, "firstName");
        const speechOutput = "She " + getRandomString(compliments);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SayHiByNameIntent': function () {
        // let firstName = isSlotValid(this.event.request, "firstName");
        const speechOutput = getRandomString(hiStrings) + " there";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = helpMessage;
        const reprompt = helpReprompt;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(stopMessage);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(stopMessage);
        this.emit(':responseReady');
    },
};

function getGenericHelpMessage(data) {
    let sentences = [
        "say give a compliment to " + getRandomName(data),
        "say - give " + getRandomName(data) + " a compliment"
    ];
	return "You can " + sentences[getRandom(0,sentences.length-1)];
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomString(arrayOfStrings) {
	let randomNumber = getRandom(0, arrayOfStrings.length - 1);
	return arrayOfStrings[randomNumber];
}

function getRandomName(arrayOfStrings) {
	let randomNumber = getRandom(0, data.length - 1);
	return arrayOfStrings[randomNumber].firstName;
}

function isSlotValid(request, slotName){
	let slot = request.intent.slots[slotName];
	//console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
	let slotValue;

	//if we have a slot, get the text and store it into speechOutput
	if (slot && slot.value) {
		//we have a value in the slot
		slotValue = slot.value.toLowerCase();
		return slotValue;
	} else {
		//we didn't get a value in the slot.
		return false;
	}
}