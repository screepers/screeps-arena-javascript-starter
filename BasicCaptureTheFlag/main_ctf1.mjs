import{ctf1Ranger} from './ctf1Ranger.mjs'
const uniqueRoles = {
    ctf1Ranger,
};

export function ctf_basic_main() 
{
    let index = 0;
    if(getTicks() === 1)
    {

        Object.keys(uniqueRoles).forEach(key=>{
            ROLES[key] = uniqueRoles[key];
        });

        MY_CREEPS.forEach(creep=>{
            if(creep.body.some(part=>part.type === RANGED_ATTACK))
            {
                creep.memory = {type:'ctf1Ranger'};
            }
            else if(creep.body.some(part=>part.type === HEAL))
            {
                creep.memory = {type:'healer'};
            }
            else if(creep.body.some(part=>part.type === ATTACK))
            {
                creep.memory = {type:'mele'};
            }
        });
    }

    if(getTicks() < 1000 && getTicks()%25 === 0)
    {
        let randX = 10 + Math.floor(Math.random() * 90);
        let randY = 10 + Math.floor(Math.random() * 90);
        let pos = {x:randX,y:randY};
        PVisual.clear();
        PVisual.circle(pos,{radius:2});
        MY_CREEPS.forEach(creep=>{
            GeneralMovement.setPOI(creep,pos)
        });
    }
    else if(getTicks() === 1000)
    {
        let enFlag = getObjectsByPrototype(Flag).find(i=>!i.my);
        PVisual.clear();
        PVisual.circle(enFlag,{radius:2});
        MY_CREEPS.forEach(creep=>{
            GeneralMovement.setPriorityTarget(creep,enFlag);
        });
    }

    getObjectsByPrototype(StructureTower).forEach(tower=>{
        operateTower(tower);
    });
}

function operateTower(tower)
{
    let hurtCreep = MY_CREEPS.find(creep=>creep.hits<creep.hitsMax);
    if(hurtCreep)
    {
        tower.heal(hurtCreep);
    }
}