import{ranger} from '../SharedModules/CommonRoles/Ranger.mjs'

var ctf1Ranger = 
{
    __proto__: ranger,
    movement: function(creep)
    {
        if(getTicks()<1000)
        {
            let randDir = 1 + Math.floor(Math.random() * 8);
            creep.move(randDir);
        }
        else
        {
            let nearestEn = findClosestByRange(creep,EN_CREEPS);
            if(getRange(creep,nearestEn)>3)
            {
                creep.moveTo(nearestEn);
                TVisual.line(creep,nearestEn);
            }
        }
        
    }
};

export {ctf1Ranger};