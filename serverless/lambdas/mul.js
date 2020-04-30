'use strict';

module.exports.defaultHandler = async event =>{
  const params = JSON.parse(event.parameters);
  return {message:mul(params[0],params[1])};
}

function mul(n,m)
{
  return n*m;
}