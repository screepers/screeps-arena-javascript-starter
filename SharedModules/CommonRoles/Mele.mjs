export var mele = {
	run:function(creep)
	{
		this.action(creep);
        this.movement(creep);
	},
    action:function(creep)
    {
        GeneralCombat.operateMeleAttack(creep);
    },
    movement:function(creep)
    {
        GeneralMovement.defaultMovement(creep);
    },
	spawn:function(spawner, size = 1)
	{
        let body = BulkParts(MOVE,size).concat(BulkParts(ATTACK,size));
        spawner.trackedSpawnCreep(body,{type:'mele'});
	}
};