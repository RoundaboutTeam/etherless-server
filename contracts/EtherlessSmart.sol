pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract EtherlessSmart {

    string data = "hello!";
    uint256 balance = 0;

    struct jsFunction {
        string name;
        //maybe add function signature!
        uint256 price; //decide unit of measurement (probably wei for ease of use and not having 0.0000...00something ether)
        address payable developer;
        bool exists;
    }

    mapping (string => jsFunction) private availableFunctions; //check if struct in mapping is set to 0 by default
    string[] functionNames;

    //events
    //event run
    event runRequest(string funcname, string param, string id);
    //event response
    event response(string _result, string id);

    // functions to check list (availableFunctions)
    //getList -> returns the full list of available functions
    function getList() public view returns (string[] memory) {
      return functionNames;
    }

    //existsFunction -> check if function is in the availableFunctions list
    function existsFunction(string memory name) public view returns (bool) {
      if(availableFunctions[name].exists) {
          return true;
      } else {
          return false;
      }
    }

    //addFunction -> add deployed function to list
    function addFunction(string memory name, uint256 price) public {
      address payable developer = msg.sender;
      availableFunctions[name] = jsFunction(name, price, developer, true);
      functionNames.push(name); //check if length is correct after adding an element
    }

    //removeFunction -> remove function from availableFunctions list
    function removeFunction(string memory toRemove) public {
      delete availableFunctions[toRemove];
      for (uint index = 0; index < functionNames.length; index++) {
          if(uint(keccak256(abi.encodePacked(functionNames[index]))) == uint(keccak256(abi.encodePacked(toRemove)))){
              delete functionNames[index]; //check if length is correct after deleting an element
          }
      }
    }

// main commands
    //runFunction -> requests execution of the function (call to existsFunction - requests payment - check payment - emit executeFunction event)
    function runFunction(string memory funcName, string memory param, string memory id) public payable {
      data = funcName;
      balance += msg.value;
      emit runRequest(funcName, param, id);
    }

    function resultFunction(string memory result, string memory id) public {
      emit response(result, id);
    }
    //deployFunction -> deployes the user developed function
    //deleteFunction -> delete one of the caller's owned functions
    //...

    function getBalance() public view returns (uint256){
      return balance;
   }

   function getData() public view returns(string memory){
     return data;
   }
}
