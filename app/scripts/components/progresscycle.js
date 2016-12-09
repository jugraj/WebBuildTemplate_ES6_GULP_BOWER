'use strict';

/* dependencies:
	createjs
	TweenLite
	easel plugin
*/

class ProgressCycle{
	constructor(num, imageObject, holder){
		this.progressArcAngle = {startAngle:0, varAngle:0}
		this.progressContainer = new createjs.Container();
    	this.progressArcHolder = new createjs.Container();
    	this.progressArray = [];
    	
    	for(let i of Array(num).keys()){
	        let cont = new createjs.Container();
	        let nums = new createjs.Bitmap(imageObject['num_'+(i+1)]);
	        nums.regX = nums.image.width/2;
	        nums.regY = nums.image.height/2;
	        nums.scaleX = nums.scaleY = 2.5;
	        cont.addChild(nums);
	        cont.alpha = 0;
	        cont.cache(-50,-50,100,100);
	        TweenLite.set(cont,{easel:{tint:'#fff'}});
	        this.progressArray.push(cont);
	        this.progressContainer.addChild(cont);
        }
	
	    this.progressArc = new createjs.Shape();
	    this.progressArcHolder.rotation = -90;
	    this.progressArcHolder.addChild(this.progressArc)
	    this.progressContainer.addChild(this.progressArcHolder);
	    holder.addChild(this.progressContainer);
	}

	outro(){
		let radius = 130;
		let initVal = {inner:20,outer:50};

		let outroArc = new createjs.Shape();
		outroArc.graphics.beginStroke('#fff');
        outroArc.graphics.setStrokeStyle(initVal.outer);
        outroArc.graphics.beginFill('rgba(0,0,0,0)').drawCircle(0,0,initVal.inner);
		this.progressContainer.addChild(outroArc);
		// outroArc.cache(-100,-100,200,200);
		
		TweenLite.to(this.progressContainer,.5,{delay:.3,alpha:0,ease:Cubic.easeInOut});

		TweenLite.to(initVal,.8,{ease:Cubic.easeOut,inner:radius,onUpdate:()=>{
			if(initVal.outer>0){
				initVal.outer -= 2;
			}
			outroArc.graphics.clear();
			outroArc.graphics.beginStroke('#fff');
        	outroArc.graphics.setStrokeStyle(initVal.outer);
        	outroArc.graphics.beginFill('rgba(0,0,0,0)').drawCircle(0,0,initVal.inner);
        	// outroArc.updateCache();
		},onComplete:()=>{
			outroArc.graphics.clear();
			this.progressContainer.removeChild(outroArc);
			outroArc = null;
		}});

	}
}

export default ProgressCycle;