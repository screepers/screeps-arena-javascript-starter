
global.GeneralCombat = {
    operateRangedAttack:function(creep)
    {
        let nearestEnemy = findClosestByRange(creep,EN_CREEPS);
        if(nearestEnemy && getRange(creep,nearestEnemy)<=3)
        {
            creep.say('pew');
        }
    },
    operateMeleAttack:function(creep)
    {
        let nearestEnemy = findClosestByRange(creep,EN_CREEPS);
        if(nearestEnemy && getRange(creep,nearestEnemy)<=1)
        {
            creep.say('bop');
        }
    },
    operateHeal:function(creep)
    {
        let nearestAlly = findClosestByRange(creep,MY_CREEPS.filter(i=>i.hits<i.hitsMax));
        if(nearestAlly && getRange(creep,nearestAlly)<=1)
        {
            creep.say('bzt');
        }
    },
}