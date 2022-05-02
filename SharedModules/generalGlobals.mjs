global.MY_CREEPS = [];
global.EN_CREEPS = [];
global.MY_SPAWNS = [];
global.MY_STRUCS = [];
global.EN_STRUCS = [];
global.BODY_DROPS = [];

//calling this at the top of each tick will reduce the need to check .exist on objects and or check for new objects.
//This is also a good place to make generalized clasifications (filters that you would otherwise call many times).
global.updateGlobalSearches = function()
{
	MY_SPAWNS = getObjectsByPrototype(StructureSpawn).filter(i => i.my);
	MY_CREEPS = getObjectsByPrototype(Creep).filter(i => i.my);
	EN_CREEPS = getObjectsByPrototype(Creep).filter(i => !i.my);
	MY_STRUCS = getObjectsByPrototype(OwnedStructure).filter(i => typeof i.my !== 'undefined' && i.my);
	EN_STRUCS = getObjectsByPrototype(OwnedStructure).filter(i => typeof i.my !== 'undefined' && !i.my);

	//this is a way to handle arena specific imports, afaik you can not do logic gated importing in js, but by checking if things are defined, you can determine if other logic should execute
	//in this case only in ctf modes this code will execute.
	if(typeof BodyPart !== 'undefined')
	{
		BODY_DROPS = getObjectsByPrototype(BodyPart);
	}
}

global.InBounds = function(position)
{
	if(position.x<0 ||position.x>99 || position.y<0||position.y>99){return false;}
	else {return true;}
}

global.BulkParts = function(part, count)
{
    return Array(count).fill(part);
};

global.CountCreeps = function(creepType)
{
	let myCreeps = getObjectsByPrototype(Creep).filter(i => i.my && i.memory && i.memory.type === creepType);
	return myCreeps.length;
};

global.CreepCost = function(creepBodyDesign)
{
    let totalCost = 0;
    creepBodyDesign.forEach(part=>{
        totalCost+= BODYPART_COST[part];
    });
    return totalCost;
};