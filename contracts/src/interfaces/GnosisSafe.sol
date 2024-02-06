// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../utils/enums.sol";

interface GnosisSafe {
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}