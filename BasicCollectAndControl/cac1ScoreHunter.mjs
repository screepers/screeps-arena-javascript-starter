export var cac1ScoreHunter = {
	run:function(creep)
	{
		//move to nearest score container using cost matricies to consider terrain and effects
        //carry parts do not cause fatigue when not holding anything (so haulers can move through swamps for free when empty)
        
        if(creep.store.getUsedCapacity()>0)
        {
            let nearestEnStruc = findClosestByRange(creep,EN_STRUCS);
            if(nearestEnStruc)
            {
                if(getRange(creep,nearestEnStruc)>1)
                {
                    //swamps cost 10 so creep will avoid them pretty strongly
                    let filledCostMatrix = CustomCosts.combineCosts(CustomCosts.verboseTerrain(2,10,255),CustomCosts.simpleFreezeEffect(100));
                    displayCostMatrix(filledCostMatrix,creep,5);
                    creep.moveTo_vis(nearestEnStruc,{costMatrix:filledCostMatrix});
                }
                else
                {
                    creep.drop(Object.keys(creep.store)[0]);
                }
            }
        }
        else
        {
            let scoreContainer = findClosestByRange(creep,getObjectsByPrototype(StructureContainer).filter(i=>i.store[RESOURCE_SCORE]>0));
            if(scoreContainer)
            {
                if(getRange(creep,scoreContainer)>1)
                {
                    //swamps cost 1 so creep will lightly favor them when available
                    let filledCostMatrix = CustomCosts.combineCosts(CustomCosts.verboseTerrain(2,1,255),CustomCosts.simpleFreezeEffect(50));
                    displayCostMatrix(filledCostMatrix,creep,5);
                    creep.moveTo_vis(scoreContainer,{costMatrix:filledCostMatrix});
                }
                else
                {
                    creep.withdraw(scoreContainer,RESOURCE_SCORE);
                }
            }
            else
            {
                creep.say('zzz');
            }
        }
    },
	spawn:function(spawner, size = 1)
	{
        let body = BulkParts(CARRY,size).concat(BulkParts(MOVE,size));
        spawner.trackedSpawnCreep(body,{type:'cac1ScoreHunter'});
	}
};