export var sas1Hauler = {
	run:function(creep)
	{
		if(creep.store[RESOURCE_ENERGY]===0)
        {
            let targetContainer = findClosestByRange(creep,getObjectsByPrototype(StructureContainer));
            if(targetContainer)
            {
                if(getRange(creep,targetContainer)>1){creep.moveTo(targetContainer);}
                else {creep.withdraw(targetContainer,RESOURCE_ENERGY);}
            }
        }
        else
        {
            let randDir = 1 + Math.floor(Math.random() * 8);
            creep.move(randDir);
            creep.drop(RESOURCE_ENERGY,25);
            creep.say('yeet');
        }
	},
	spawn:function(spawner, size = 1)
	{
        let body = BulkParts(CARRY,size).concat(BulkParts(MOVE,size));
        spawner.trackedSpawnCreep(body,{type:'sas1Hauler'});
	}
};