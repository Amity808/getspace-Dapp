// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

// the owner of the space will be the one to make set the space is not available when they receive payment through their links

contract GetSpaceMarketplace is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE"); 
    bytes32 public constant SPACE_OWNER_ROLE = keccak256("SPACE_OWNER"); 
    

    uint256 public spaceLength;

    address admin;

    enum SpaceStatus {
        ACTIVE,
        AVAILABE,
        NOTAVAILABLE,
        DEPOSITED
    }
    struct Space {
        string name;
        string spaceAddress;
        address payable Owner;
        string paymentLink;
        string description;
        uint256 amountpaid;
        uint256 currentAmount;
        SpaceStatus spaceStatus;
        uint256 duration;
        string videoImage;
    }

    constructor () {
        _setRoleAdmin(SPACE_OWNER_ROLE, DEFAULT_ADMIN_ROLE); 
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        admin = msg.sender;
    }

    modifier onlySPace_Owner() {
        require(hasRole(SPACE_OWNER_ROLE, msg.sender), "Only the house owner can call this function");
        _;
    }
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Only admin can call this function");
        _;
    }

    mapping (uint256 => Space) public _space;

    function registerSpace(string memory _name, string memory _spaceAddress, string memory _description, uint256 _duration, string memory _videoImage) public onlyAdmin() {
        Space storage space = _space[spaceLength];

        space.name = _name;
        space.Owner = payable (msg.sender);
        space.spaceAddress = _spaceAddress;
        // space.paymentLink = _paymentLink;
        space.description = _description;
        space.spaceStatus = SpaceStatus.AVAILABE;
        space.duration = _duration;
        space.videoImage = _videoImage;
        
        spaceLength++;
    }

    function spaceIsNotAvailable(uint256 _index) public {
        require(spaceLength > 0, "space not available");
        require(_space[_index].Owner == msg.sender, "you are not the owner of the space");
        require(_space[_index].spaceStatus == SpaceStatus.AVAILABE, "you are not the owner of the space");

        Space storage space = _space[_index];
        space.spaceStatus = SpaceStatus.NOTAVAILABLE;
    }

    function spaceIsAvailable(uint256 _index) public {
        require(spaceLength > 0, "space not available");
        require(_space[_index].Owner == msg.sender, "you are not the owner of the space");

        Space storage space = _space[_index];
        space.spaceStatus = SpaceStatus.AVAILABE;
    }

    function makePayment(uint256 _index, string memory _paymentLink, uint256 _duration) public {
        require(spaceLength > 0, "space not available");
        require(_space[_index].Owner == msg.sender, "you are not the owner of the space");
    
        Space storage space = _space[_index];
        space.duration = _duration;
        space.paymentLink = _paymentLink;
        space.spaceStatus = SpaceStatus.DEPOSITED;
    }

    function paymentClaimed(uint256 _index) public {
        require(_space[_index].spaceStatus == SpaceStatus.DEPOSITED,"nobody deposit to this smart contract" );
        Space storage space = _space[_index];
        // duration is part month
        
        uint256 newDuration = space.duration;
         uint256 durationrent = block.timestamp + newDuration * 1 * 24 * 60 * 60;
        //  uint256 toGetPay = block.timestamp + 12 * 30.44 * 24 * 60 * 60;
        if (block.timestamp >= durationrent) {
            space.duration = 0;
            space.spaceStatus = SpaceStatus.AVAILABE;
            space.paymentLink = "";
        }

        // to confirm the child is above or already 18 years with conversion of the block timestamp
        // uint256 toGetPay = currentTimeStap + 18 * 365 * 24 * 60 * 60;

    }



    
}