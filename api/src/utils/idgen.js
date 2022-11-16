const pid = require('process').pid;
const FlakeId = require('flakeid');

//initiate flake
const time_offset = 1230768000000 + (pid + (Math.floor(Math.random() * pid))) // (2013-1970)*31536000*1000 //optional, define a offset time
console.log(time_offset, "<< time_offset")
const flake = new FlakeId({
    mid : 42, //optional, define machine id
    timeOffset : time_offset
});

// exports.flake = flake;
// module.exports = flake
exports.getUniqueId = function(){
    return flake.gen()
}