// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {RebalancerModule} from "../src/RebalancerModule.sol";

contract CounterTest is Test {
    RebalancerModule public module;

    function setUp() public {
        module = new RebalancerModule();
    }

    function test_ModuleSetup() public {
        assertEq(module.NAME(), "Rebalancer Module");
        assertEq(module.VERSION(), "0.1.0");
    }
}
