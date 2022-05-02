import { Creep } from 'game/prototypes';

Creep.prototype.say = function(sayText)
{
    TVisual.text(sayText,this,{font:"0.5"});
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

//TODO: this does not belong here
Creep.prototype.countActiveBodypart = function(partType)
{
	let count = 0;
	for (let i = 0; i < this.body.length; i++) {
		if (this.body[i].hits > 0 && this.body[i].type === partType) { count++; }
	}
	return count;
}