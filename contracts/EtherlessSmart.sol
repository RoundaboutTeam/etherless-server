pragma solidity >=0.4.22 <0.7.0;

//TO DO//
//getFuncInfo -> returns all the info stored in the mapping
//deployFunction -> deployes the user developed function
//deleteFunction -> delete one of the caller's owned functions in AWS

contract EtherlessSmart {
  address ownerAddress;
  uint256 balance = 0;
  uint256 requestId; //incremented at every run request

  struct jsFunction {
    string name;
    //maybe add function signature!
    uint256 price; // wei
    address payable developer;
    bool exists;
  }

  mapping (string => jsFunction) private availableFunctions; //check if struct in mapping is set to 0 by default
  bytes32[] functionNames;

  //events
  //event run
  event runRequest(string funcname, string param, uint256 indexed id);
  //event response
  event response(string result, uint256 indexed id);

  constructor() public {
    ownerAddress = msg.sender;
    requestId = 0;
  }

  modifier onlyOwner(address _invokedFrom) {
    require(_invokedFrom == ownerAddress, "You are not the owner of the contract!");
    _;
  }

  //FUNCTIONS THAT ENABLE TYPE CONVERSION BETWEEN STRING AND BYTES32
  //converts a string to bytes32
  function stringToBytes(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if(tempEmptyStringTest.length == 0) {
        return 0x0;
    } assembly {
        result := mload(add(source, 32))
    }
  }

  //converts a bytes32 to string
  function bytes32ToStr(bytes32 _bytes32) public pure returns (string memory) {
    bytes memory bytesArray = new bytes(32);
    for (uint256 i; i < 32; i++) {
        bytesArray[i] = _bytes32[i];
        }
    return string(bytesArray);
    }

  //FUNCTIONS THAT IMPLEMENT OPERATIONS ON THE AVAILABLEFUNCTIONS LIST
  //getList -> returns the full list of names of available functions
  function getList() public view returns (bytes32[] memory) {
    return functionNames;
  }

  //existsFunction -> checks if a certain function is in the availableFunctions list
  function existsFunction(string memory name) public view returns (bool) {
    if(availableFunctions[name].exists) {
        return true;
    } else {
        return false;
    }
  }

  //addFunction -> adds a function that has just been deployed to the list
  function addFunction(string memory name, uint256 price) public {
    address payable developer = msg.sender;
    availableFunctions[name] = jsFunction(name, price, developer, true);
    functionNames.push(stringToBytes(name));
  }

  //removeFunction -> removes a given function from availableFunctions list
  function removeFunction(string memory toRemove) public {
    delete availableFunctions[toRemove];
    for (uint index = 0; index < functionNames.length; index++) {
        if(functionNames[index] == stringToBytes(toRemove)){
            //delete functionNames[index]; //check if length is correct after deleting an element
            functionNames[index] = functionNames[functionNames.length - 1];
            functionNames.pop();
        }
    }
  }

//MAIN COMMANDS
  //runFunction -> requests execution of the function
  function runFunction(string memory funcName, string memory param) public payable {
    require(existsFunction(funcName), "The function you're looking for does not exist! :'(");
    uint256 funcPrice = availableFunctions[funcName].price;
    address payable funcDev = availableFunctions[funcName].developer;

    require(msg.value >= funcPrice, "Insufficient amount sent! :'(");
    balance += msg.value;

    sendAmount(funcDev, funcPrice);

    getNewId();
    emit runRequest(funcName, param, requestId);
  }

  //resultFunction -> returns the result of a function execution
  function resultFunction(string memory result, uint256 id) public onlyOwner(msg.sender){
    emit response(result, id);
  }

  function getBalance() public view returns (uint256){
    return balance;
 }

  //sendAmount -> sends the given amount to a certain address
 function sendAmount(address payable to, uint256 amount) public {
   balance -= amount; //remainder from payment
   to.transfer(amount);
 }

  //getNewId -> increments requestId
 function getNewId() private returns (uint256){
   return requestId++;
 }
}