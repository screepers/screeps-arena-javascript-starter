export function ctf_basic_main() 
{
    let index = 0;
    MY_CREEPS.forEach(creep=>{
        creep.say(index++);
    });
}