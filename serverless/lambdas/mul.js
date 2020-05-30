module.exports.defaultHandler = async event =>{
  const p = event.parameters;
  return {message:mul(p[0], p[1])};
}

function mul(n,m) {
  return n*m;
}