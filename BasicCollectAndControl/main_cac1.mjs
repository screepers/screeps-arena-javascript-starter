export function cac_basic_main() 
{
    let index = 0;
    getObjectsByPrototype(Creep).filter(i=>i.my).forEach(creep=>{
        creep.say(index++);
    });
}