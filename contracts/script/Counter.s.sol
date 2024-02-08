// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";
import {RebalancerModule} from "../src/RebalancerModule.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
    RebalancerModule proxy = RebalancerModule(Upgrades.deployUUPSProxy(
        "RebalancerModule.sol",
        abi.encodeCall(RebalancerModule.initialize, (address(1))))
    );

    address owner = proxy.owner();
    console2.logAddress(owner);
    console2.logAddress(address(proxy));
    }
}
