import { Creep } from 'game/prototypes';

Creep.prototype.say = function(sayText)
{
    TVisual.text(sayText,this,{font:"0.5"});
}

global.displayCostMatrix = function(costMatrix, locationOfInterest, radius = 5)
{
	//global.text(text,{x:creep.x,y:creep.y});
	for (let x = -radius; x < radius; x+=1) {
		for (let y = -radius; y < radius; y+=1) {
			let tempPos = {x:locationOfInterest.x+x,y:locationOfInterest.y+y};
			if(!InBounds(tempPos)){continue;}
			TVisual.text(costMatrix.get(tempPos.x,tempPos.y),tempPos,{font:0.5});
		}
	}
}

Creep.prototype.moveTo_vis = function(target, options)
{
    let result = searchPath(this, target, options);
	if(result.path.length>0)
	{
		let direction = getDirection(result.path[0].x - this.x, result.path[0].y - this.y);
		this.move(direction);

		result.path.forEach(pos=>{
			TVisual.circle(pos);
		});
	}
    else
    {
        this.say('xpath');
    }
}