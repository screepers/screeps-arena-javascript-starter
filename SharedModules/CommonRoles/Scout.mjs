export var scout = {
	run:function(creep)
	{
		let targets = getObjectsByPrototype(OwnedStructure).filter(i=>typeof i.my !== 'undefined' && !i.my);
        targets = targets.concat(getObjectsByPrototype(Creep).filter(i=>!i.my));
        if(typeof Flag !== 'undefined')
        { targets = targets.concat(getObjectsByPrototype(Flag).filter(i=>typeof i.my === 'undefined' || !i.my)); }
        

        if(targets.length>0)
        {
            let primeTarget = findClosestByRange(creep,targets);
            if(primeTarget)
            {
                creep.moveTo_vis(primeTarget,{range:3});
            }
        }
	},
	spawn:function(spawner, size = 1)
	{
        let body = BulkParts(MOVE,size);
        spawner.trackedSpawnCreep(body,{type:'scout'});
	}
};