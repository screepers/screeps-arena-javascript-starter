//The purpose of this main file is to run any common functions or imports that all
//arenas will need, and then call the appropriate arena code to run arena specific code.
//Relatively few edits should go in this file other than pointing to new arenas or 
//adding additional shared functionality.


//This simply imports all available objects from the specified directory and 
//places them in global scope to reduce required code to call built-in functions
//Importing and placing in global here makes these functions and objects
//available in all subsequently imported code (so you dont have to worry about imports in each module)
import * as prototypes from 'game/prototypes';
for (let globalKey in prototypes) { global[globalKey] = prototypes[globalKey];}

import * as constants from 'game/constants';
for (let globalKey in constants) { global[globalKey] = constants[globalKey];}

import * as specConstants from 'arena/constants';
for (let globalKey in specConstants) { global[globalKey] = specConstants[globalKey];}

import * as utils from 'game/utils';
for (let globalKey in utils) { global[globalKey] = utils[globalKey];}

import * as pathing from 'game/path-finder';
for (let globalKey in pathing) { global[globalKey] = pathing[globalKey];}

import * as arenaConstants from 'arena';
for (let globalKey in arenaConstants) { global[globalKey] = arenaConstants[globalKey];}    

import { arenaInfo } from '/game';

import { Visual } from 'game/visual';
global.PVisual = new Visual(1,true);
global.TVisual = new Visual(2,false);

//these could be placed behind container objects to reduce global polution 
import './SharedModules/generalGlobals.mjs';
import './SharedModules/generalVisuals.mjs';
import './SharedModules/generalMovement.mjs';
import './SharedModules/generalSpawn.mjs';
import './SharedModules/generalCombat.mjs';

//specific arena imports
import{ctf_basic_main} from './BasicCaptureTheFlag/main_ctf1.mjs';
import{sas_basic_main} from './BasicSpawnAndSwamp/main_sas1.mjs';
import{cac_basic_main} from './BasicCollectAndControl/main_cac1.mjs';

//non-arena specific roles (if any)
import{scout} from './SharedModules/CommonRoles/Scout.mjs'
import{healer} from './SharedModules/CommonRoles/Healer.mjs'
import{ranger} from './SharedModules/CommonRoles/Ranger.mjs'
import{mele} from './SharedModules/CommonRoles/Mele.mjs'
global.ROLES = {
    scout,
    healer,
    ranger,
    mele
};

export function loop() {
    console.log('-------------------tick: '+getTicks());
    //console.log(JSON.stringify(arenaInfo));

    TVisual = new Visual(1,false); //I do not know if this is how they intend this to be used tbh...

    if(getTicks()===1) //initialization stuff (you get extra processing power on first tick)
    {
        console.log('initializing...');
    }

    try
    {
        updateGlobalSearches();
        GeneralSpawn.updateSpawning();
        CustomCosts.resetStashedCostMatricies();
    }
    catch(err)
    {
        console.log('top loop utilities error');
		console.log(err.stack);
    }
    

    try
    {
        if(arenaInfo.name === "Capture the Flag" && arenaInfo.level === 1)
        {
            console.log('ctf lvl 1');
            ctf_basic_main();
        }
        else if(arenaInfo.name === "Spawn and Swamp" && arenaInfo.level === 1)
        {
            console.log('sas lvl 1');
            sas_basic_main();
        }
        else if(arenaInfo.name === "Collect and Control" && arenaInfo.level === 1)
        {
            console.log('cac lvl 1');
            cac_basic_main();
        }
    }
    catch(err)
    {
        console.log('main loop error');
		console.log(err.stack);
    }
    

    //run creeps (all arenas have creeps, so may as well call them here).  I use memory.type to describe them, but there are many ways to do the same
	MY_CREEPS.forEach(creep => {
        if(!creep.memory)
        {
            console.log('confused creep: '+JSON.stringify(creep));
            return;
        }
		if(findInRange(creep,MY_SPAWNS,0).length>0){return;} //creep spawning
		try
		{
			ROLES[creep.memory.type].run(creep);
		}
		catch(err)
		{
			console.log('creep run error: '+creep.memory.type);
			console.log(err.stack);
		}
	});

    let cpuUsed = getCpuTime();
    let limit = arenaInfo.cpuTimeLimit;
    if(getTicks() === 1){limit = arenaInfo.cpuTimeLimitFirstTick}
    let usedRatio = cpuUsed / limit;
    console.log('CPU: '+ Math.floor(usedRatio*100)+' %');
}
