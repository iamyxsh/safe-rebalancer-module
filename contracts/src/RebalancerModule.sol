// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Initializable} from  "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract RebalancerModule is Initializable, OwnableUpgradeable {
    string public constant NAME = "Rebalancer Module";
    string public constant VERSION = "0.1.0";

    function initialize(address _admin) public initializer {
       __Ownable_init(_admin);
    }
}
