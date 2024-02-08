// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {RebalancerModule} from "../src/RebalancerModule.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        address proxy = Upgrades.deployUUPSProxy(
    "RebalancerModule.sol",
    abi.encodeCall(RebalancerModule.initialize, ("arguments for the initialize function"))
);
    }
}
