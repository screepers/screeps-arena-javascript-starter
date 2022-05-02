import{cac1ScoreHunter} from './cac1ScoreHunter.mjs'
const uniqueRoles = {
    cac1ScoreHunter,
};

export function cac_basic_main() 
{
    //TODO: is there some way to enforce that this gets done (like a virtual inheritance or something)
    if(getTicks() === 1)
    {
        //this adds unique arena roles into the global roles dictionary to be used in the main creep run loop
        Object.keys(uniqueRoles).forEach(key=>{
            ROLES[key] = uniqueRoles[key];
        });
    }

    if(CountCreeps('cac1ScoreHunter') === 0)
    {
        let spawner = MY_SPAWNS[0];
        console.log(spawner.memory.spawning);
        if(spawner && spawner.memory.spawning<=0)
        {
            ROLES['cac1ScoreHunter'].spawn(spawner,1);
        }
    }

}