
# Stock-options-contract

A simple smart contract that allows organiZations to give out, distribute and  vest Stock Options in a Trustless manner

# stockOptionFactory

This Smart Contract deploys the Stock Options Plan contract and immediately transfer ownership to the Organisation Creator

# Employee Stock Option Plan

This smart contract is an Employee Stock Option Plan implemented in Solidity. It allows for the management and granting of stock options to employees. The contract is designed to be owned by an address and provides various functions for adding employees, granting stock options, setting vesting schedules, and managing vested and exercised options.
This contract was also designed to allow Stock Options to be allocated as many times as possible

## Contract Details

The contract inherits from the `Ownable` and `ReentrancyGuard` contracts provided by the OpenZeppelin library. It includes the following features:

### Structs

- `Employee`: Represents an employee and contains the following fields:
  - `stockOptions`: The number of stock options granted to the employee.
  - `vestingSchedule`: The vesting schedule for the employee's stock options.

### Storage

The contract uses the following mappings for storage:

- `employee`: Maps employee addresses to their corresponding `Employee` struct, allowing retrieval of employee information.
- `excercisedBalance`: Maps employee addresses to the balance of exercised stock options.
- `vestingBalance`: Maps employee addresses to the balance of vested stock options.

### Functions

The contract provides the following functions:

- `addEmployee(address _employeeAddress)`: Adds an employee to the contract by initializing their `Employee` struct with default values.
- `grantStockOptions(address _employeeAddress, uint256 _stockOptions)`: Grants stock options to an employee by increasing their `stockOptions` field. If the employee's vesting schedule is not set, it is set to infinity.
- `setVestingSchedule(address _employeeAddress, uint256 _vestingSchedule)`: Sets the vesting schedule for an employee. The vesting schedule must be in the future, and the employee must exist.
- `getBlockTimeStamp()`: Returns the current block timestamp.
- `vestingCountdown(address _employeeAddress)`: Returns the remaining time until vesting for an employee's stock options. If the vesting schedule has already passed, it returns 0.
- `_vest(address _employeeAddress)`: Internal function used to vest the employee's stock options based on the current time.
- `vestOptions()`: Vests the stock options for the calling employee. Requires that the employee exists and has stock options.
- `exerciseOptions()`: Exercises the vested stock options for the calling employee.
- `getVestedOptions(address _employeeAddress)`: Returns the balance of vested stock options for an employee.
- `getExcercisedOptions(address _employeeAddress)`: Returns the balance of exercised stock options for an employee.
- `transferOptions(address _recipient, uint256 _stockOptionsAmount)`: Transfers vested stock options from the calling employee to the recipient address. Requires that the stock option amount is greater than zero, the employee exists, and the employee has sufficient vested balance.

### Events

The contract emits the following event:

- `StockOptionsGranted(address employee, uint256 stockOptionsAmount)`: Indicates when stock options are granted to an employee, providing the employee's address and the granted amount.

## Getting Started

To use this contract, you can deploy it to an Ethereum network or interact with it through a compatible blockchain interface such as Remix, Truffle, or Hardhat.

## Security Features
1. Ownable: The contract uses the Ownable module from the OpenZeppelin library, which provides a modifier to restrict access to certain functions only to the contract owner.

2. ReentrancyGuard: The contract uses the ReentrancyGuard module from the OpenZeppelin library, which protects against reentrancy attacks by preventing multiple function calls from being executed simultaneously.

3. Access Control: The contract includes access control mechanisms to ensure that only the contract owner can perform certain operations, such as granting stock options and setting vesting schedules.

4. Input Validation: The contract includes various input validations to ensure that only valid operations can be performed. For example, when granting stock options, the contract checks for a valid employee address and ensures that the vesting schedule is set to infinity if it hasn't been set yet.

5. Vesting Schedule: The contract allows employees to set a vesting schedule for their stock options. The vesting schedule ensures that the stock options become available for exercise only after a certain period of time.

6. Vesting Process: The contract includes a vesting process that automatically releases vested stock options to employees when the vesting period has passed. This process helps enforce the agreed-upon vesting schedules and prevents unauthorized access to stock options.

7. Transferability: The contract allows vested stock options to be transferred from one employee to another. This feature provides flexibility for employees to trade or distribute their vested stock options among themselves.

8. This contract also uses a version of solidity that has inbuilt protection against underflows and overflows so there is no need to use third party libraries like safemath from openzepellin

9. This contract also requires all necessary functions can only be accessed by employees plus used internal function to save gas in relative to using Modifiers
10. This contract implements a system where vesting schedule is set to a value of infinity to prevent stock options from being claimed when vesting schedule hasn't been set

11. This contract also automatically helps employee vest their stock options to prevent the goal post from being shifted by the employer by calling the internal _vest() function, this is also called in other necessary functions to make it easier for employee options to be vested

## Testing

The testing script was written with typescript you can use whatever framework you like.
It's recommended to use Hardhat, Mocha and Chai. 
Go through the normal process of setting up your hardhat environment then import the test into your test directory then you can run the test
Note the testis designed to run concurrently, so individual instance might not give expected output
