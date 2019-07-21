pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2;

contract Blocklance {
    
    address[] Users;
    struct User {
        
        string Type; 
        bool check;
        
    }
    
    mapping (address => User) public username;
    
    function addUser (string memory _Type)public{
        User storage user = username[msg.sender];
        require (!user.check);
        bool check = true;
        username[msg.sender]= User(_Type,check);
        Users.push(msg.sender);
    }
    
    struct work {
        address employerAddress;
        string wName;
        string wDescr;
        uint cost;
        bool wChk;
    }
       address public workEmp;
       mapping (address => work)public empWork;
       address[] empAdresses;
       work[] workList;       
       function addWork (string memory _wName,string memory _wDescr,uint _cost)public
               {
                 address addEmployerAddress = msg.sender;
                 bool _chk = false;
                 workEmp = msg.sender;
                 empWork[msg.sender]=work(addEmployerAddress,_wName,_wDescr,_cost,_chk);
                 workList.push(work(addEmployerAddress,_wName,_wDescr,_cost,_chk));
                 empAdresses.push(msg.sender);
               }
               
               function viewWorkList(uint index)public returns(work memory)
               {
                   if (empWork[empAdresses[index]].wChk = false)
                   return empWork[empAdresses[index]];
               }    
               
               mapping (address=>work)public AcceptMap;
               
               function acceptWork (address Employeraddress)public {
                   bool _chk = true;
                   empWork[workEmp].wChk = _chk;
                   AcceptMap[msg.sender]=empWork[Employeraddress];
               }
               
               
               
               
               
               
               
               
               
               
               
               work[] array;
               function remove(uint index) public
                        {
                            require(index >= array.length);    
                            for (uint i = index; i<array.length-1; i++){
                                array[i] = array[i+1];
                                }
                            delete array[array.length-1];
                            array.length--;
                         }
}