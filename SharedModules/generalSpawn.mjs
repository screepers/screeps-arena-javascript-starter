import { StructureSpawn } from 'game/prototypes';


global.ENERGY_AVAILABLE = 0;
global.ENERGY_CAPACITY = 0;
global.GeneralSpawn = {
	updateSpawning : function()
	{
		ENERGY_AVAILABLE = this.spawnEnergyAvailable();
		ENERGY_CAPACITY = this.spawnEnergyCapacity();
	
		MY_SPAWNS.forEach(spawner => {
			if(typeof spawner.memory === 'undefined') { spawner.memory = {spawning:0}; }
			spawner.memory.spawning -=1;
			console.log('spawner spawning timer: '+spawner.memory.spawning);
		});
	
		MY_CREEPS.forEach(creep=>{
			if(!creep.memory){creep.memory = {spawning:-1};}
			else if(typeof creep.memory.spawning === 'undefined'){creep.memory.spawning = -1;}
			
			if(creep.memory.spawning>0)
			{ creep.memory.spawning-=1; }
		})
	},
	
	spawnEnergyAvailable : function()
	{
		let allSpawnStrucs = MY_STRUCS.filter(i=> i instanceof StructureSpawn || i instanceof StructureExtension);
		let totalEnergy = 0;
		allSpawnStrucs.forEach(struc=>{
			totalEnergy += struc.store.energy;
		});
		return totalEnergy;
	},
	
	spawnEnergyCapacity : function()
	{
		let allSpawnStrucs = MY_STRUCS.filter(i=> i instanceof StructureSpawn || i instanceof StructureExtension);
		let totalCapacity = 0;
		allSpawnStrucs.forEach(struc=>{
			totalCapacity += struc.store.getCapacity([RESOURCE_ENERGY]);
		});
		return totalCapacity;
	},
}


StructureSpawn.prototype.trackedSpawnCreep = function(creepBody,memory = {})
{
    let spawnObj = this.spawnCreep(creepBody);	
    if(spawnObj.object)
    {
        console.log(memory.type + ' spawn success');
    }
    else
    {
        console.log(memory.type + ' spawnError: '+spawnObj.error);
        return;
    }

    ENERGY_AVAILABLE -= CreepCost(creepBody);
    this.memory.spawning = creepBody.length * 3;

    let newCreep = spawnObj.object;
    newCreep.memory = memory;
    newCreep.memory.spawning = creepBody.length * 3 - 1;
    return newCreep;
}