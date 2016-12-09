'use strict';

// UTILS:
export default class Utils{
	constructor(){
	}

	// get random number: 
	getRandomNumber(min, max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	// return block number and color code
	getColorAndNumberCode(num){
		return {number:4-(num%5),block:Math.floor(num/5)};
	};
	
}