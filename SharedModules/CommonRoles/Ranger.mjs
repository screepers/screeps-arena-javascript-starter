export var ranger = {
	run:function(creep)
	{
		this.action(creep);
        this.movement(creep);
	},
    action:function(creep)
    {
        GeneralCombat.operateRangedAttack(creep);
    },
    movement:function(creep)
    {
        GeneralMovement.defaultMovement(creep);
    },
	spawn:function(spawner, size = 1)
	{
        let body = BulkParts(MOVE,size).concat(BulkParts(RANGED_ATTACK,size));
        spawner.trackedSpawnCreep(body,{type:'ranger'});
	}
};