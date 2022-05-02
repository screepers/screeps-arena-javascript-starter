import{sas1Hauler} from './sas1Hauler.mjs'
const uniqueRoles = {
    sas1Hauler,
};

export function sas_basic_main() 
{
    if(getTicks() === 1)
    {
        //this adds unique arena roles into the global roles dictionary to be used in the main creep run loop
        Object.keys(uniqueRoles).forEach(key=>{
            ROLES[key] = uniqueRoles[key];
        });
    }

    if(CountCreeps('sas1Hauler') === 0)
    {
        let spawner = MY_SPAWNS[0];
        console.log(spawner.memory.spawning);
        if(spawner && spawner.memory.spawning<=0)
        {
            ROLES['sas1Hauler'].spawn(spawner,3);
        }
    }
    else if(CountCreeps('scout') === 0)
    {
        let spawner = MY_SPAWNS[0];
        console.log(spawner.memory.spawning);
        if(spawner && spawner.memory.spawning<=0)
        {
            ROLES['scout'].spawn(spawner,1);
        }
    }
}