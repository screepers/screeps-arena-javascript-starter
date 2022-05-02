global.MY_CREEPS = [];
global.MY_SPAWNS = [];
global.MY_STRUCS = [];
global.BODY_DROPS = [];

//calling this at the top of each tick will reduce the need to check .exist on objects and or check for new objects.
//This is also a good place to make generalized clasifications (filters that you would otherwise call many times).
global.updateGlobalSearches = function()
{
	MY_SPAWNS = getObjectsByPrototype(StructureSpawn).filter(i => i.my);
	MY_CREEPS = getObjectsByPrototype(Creep).filter(i => i.my);
	MY_STRUCS = getObjectsByPrototype(OwnedStructure).filter(i => i.my && !(i instanceof StructureContainer));

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