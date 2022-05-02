global.TEMP_COST_MATRICIES = {};//these reset each tick (related to game objects that may change)
global.PERM_COST_MATRICIES = {};//these are only computed once (ie room specific or strategy stuff)

global.CustomCosts = {
    resetStashedCostMatricies : function () {
        TEMP_COST_MATRICIES = {};
        if(typeof PERM_COST_MATRICIES === 'undefined'){PERM_COST_MATRICIES = {};}
    },
    combineCosts:function(cm1,cm2){
		let outCosts = new CostMatrix();
		for(let x = 0;x<100;x++)
		{
			for(let y = 0;y<100;y++)
			{
				let val1 = cm1.get(x,y);
				let val2 = cm2.get(x,y);
				outCosts.set(x,y,Math.max(val1,val2));
			}
		}
		return outCosts;
	},
    oddsOnlyCostMatrix:function() {
		//this would never change and so can be calculated just once (if it has already been calculated, just return the stashed result)
		if(PERM_COST_MATRICIES.oddTiling){return PERM_COST_MATRICIES.oddTiling;}

		//any costs that are not set on a new costMatrix will have terrain costs applied when passed to pather.  (so terrain does not need to be injected (can just be left blank))
		//if terrain is to be ignored, all tiles need to be described
		let costs = new CostMatrix();
		for(let x = 0;x<100;x++)
		{
			for(let y = 0;y<100;y++)
			{
				if(x%2===0 && y%2===0)
				{
					costs.set(x,y,255);
				}
				else
				{
					let testTerrain = getTerrainAt({x:x,y:y});
					if (testTerrain !== TERRAIN_WALL) {costs.set(x,y,1);} //there are few situations where changing the cost of a terrain wall is a good idea
				}
			}
		}

		//stash computed cost matrix before returning (so that you don't have to compute it again)
		PERM_COST_MATRICIES.oddTiling = costs;
		return costs;
	},
    verboseTerrain:function(plainCost=2,swampCost=10,hillCost=255)
    {
        //the unique key allows stashing without reducing flexibility if multiple creeps want different weightings
        let uniqueKey = 'vt'+plainCost.toString()+swampCost.toString()+hillCost.toString();
        if(PERM_COST_MATRICIES[uniqueKey]){return PERM_COST_MATRICIES[uniqueKey];}
        
        let costs = new CostMatrix;
        for (let x = 0; x < 100; x++) {
            for (let y = 0; y < 100; y++) {
                let tempTerrain = getTerrainAt({ x: x, y: y });
                if (tempTerrain === TERRAIN_WALL) { costs.set(x, y, hillCost); }
                else if (tempTerrain === TERRAIN_SWAMP) { costs.set(x, y, swampCost); }
                else { costs.set(x, y, plainCost); }//plains
            }
        }

        PERM_COST_MATRICIES[uniqueKey] = costs;
        return costs;
    },
    simpleFreezeEffect:function(freezeCost=50)
    {
        let uniqueKey = 'sfe'+freezeCost.toString();
        if(TEMP_COST_MATRICIES[uniqueKey]){return TEMP_COST_MATRICIES[uniqueKey];}

        let costs = new CostMatrix;
        if(typeof AreaEffect === 'undefined'){return costs;}

        getObjectsByPrototype(AreaEffect).forEach(areaEffect=>{
            if(areaEffect.effect === EFFECT_FREEZE){costs.set(areaEffect.x,areaEffect.y,freezeCost);}
        });

        TEMP_COST_MATRICIES[uniqueKey] = costs;
        return costs;
    },

};


global.GeneralMovement = {
    setPriorityTarget:function(creep,targetObj)
    {
        creep.memory.priorityTarget = targetObj;
    },
    setPOI:function(creep,position,range=0)
    {
        creep.memory.poi = position;
        creep.memory.poi.range = range;
    },
    defaultMovement:function(creep)
    {
        if(findInRange(creep,EN_CREEPS,3).length>0)//defensive movment
        {
            this.flee(creep,EN_CREEPS,4);
        }
        else if(creep.memory.priorityTarget && creep.memory.priorityTarget.exists)//offensive movement
        {
            creep.moveTo(creep.memory.priorityTarget);
        }
        else if(creep.memory.poi)//general movement
        {
            if(creep.memory.poi && getRange(creep,creep.memory.poi) > creep.memory.poi.range )
            {
                creep.moveTo(creep.memory.poi);
            }
        }
        else
        {
            creep.say('zzz');
        }
    },
    flee :function (creep, targets, range) 
    {
        let result = searchPath(creep, targets.map(i => ({ pos: i, range:range })), { flee: true });
        if (result.path.length > 0) {
            let direction = getDirection(result.path[0].x - creep.x, result.path[0].y - creep.y);
            creep.move(direction);
            creep.say('flee');
        }
    },
};