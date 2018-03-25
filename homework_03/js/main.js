'use strict';

function Company({ name, owner, maxCompanySize }) {
	let _employees = [],
		_companyCharacter = arguments[0],
		_createDateComp = new Date(),
		_logCompany = `${_companyCharacter.name} was created by ${_companyCharacter.owner} in ${_createDateComp}.\n`;

	this.addNewEmployee = function (newEmployee) {
		if (typeof newEmployee !== 'object' || Array.isArray(newEmployee) === true) {
			console.log('Please try to add Employee instance');
		} else if (_companyCharacter.maxCompanySize <= _employees.length) {
			let salaryArray = [];
			_employees.forEach(e => {
				salaryArray.push(e.employeeCharacter().salary);
			});
			function getLowestSalary(salaryArray) {
				return salaryArray.sort(function (a, b) {
					return Math.abs(a) > Math.abs(b) ? 1 : -1;
				})[0];
			}
			let minSalary = getLowestSalary(salaryArray);
			for (let j = 0; j < _employees.length; j++) {
				if (_employees[j].employeeCharacter().salary === minSalary) {
					_employees[j]._fire(_companyCharacter.name);
					_logCompany += `${_employees[j].employeeCharacter().name} ends working at ${_companyCharacter.name} in ${new Date()}.\n`
					_employees.splice(j, 1);
					return this.addNewEmployee(newEmployee);
				}
			}
		} else {
			_employees.push(newEmployee);
			newEmployee._hire(_companyCharacter.name);
			_logCompany += `${newEmployee.employeeCharacter().name} starts working at ${_companyCharacter.name} in ${new Date()}.\n`;
		}
	}
	this.removeEmployee = function (indexEmployee) {
		if (arguments.hasOwnProperty(1) || !isFinite(indexEmployee) || isNaN(indexEmployee) || typeof indexEmployee !== 'number' || indexEmployee < 0) {
			console.log('Incorrect data. Enter the number')
		} else {
			_employees[indexEmployee]._fire(_companyCharacter.name);
			_logCompany += `${_employees[indexEmployee].employeeCharacter().name} ends working at ${_companyCharacter.name} in ${new Date()}.\n`;
			_employees.splice(indexEmployee, 1);
		}
	}
	this.getAverageSalary = function () {
		let salarySum = 0;
		_employees.forEach(e => {
			salarySum += e.employeeCharacter().salary;
		});
		return Math.floor(salarySum / _employees.length);
	}
	this.getEmployees = function () {
		_employees.forEach(e => {
			console.log(e.employeeCharacter());
		});
		return _employees;
	}
	this.getFormattedListOfEmployees = function () {
		let listOfEmployees = '';
		_employees.forEach(e => {
			let currentDate = new Date().getTime();
			listOfEmployees += `${e.employeeCharacter().name} - works in ${_companyCharacter.name} ${Math.floor((currentDate - e.getHireDate()) / 1000)} seconds.\n`;
		});
		return listOfEmployees;
	}
	this.getAverageAge = function () {
		let ageSum = 0;
		_employees.forEach(e => {
			ageSum += e.employeeCharacter().age;
		});
		return ageSum / _employees.length;
	}
	this.getHistory = function () {
		return _logCompany;
	}
}

function Employee({ name, primarySkill, age, salary }) {
	let _employeeCharacter = arguments[0],
		_startWork = 0,
		_endWork = 0,
		_allTimeWork = 0,
		_allTimeHire = 0,
		_allTimeFire = 0,
		_logEmployee = '',
		_currentCompany = '';

	this.employeeCharacter = function () {
		return _employeeCharacter;
	}
	this.getHireDate = function () {
		return _startWork;
	}
	this.getSalary = function () {
		return _employeeCharacter.salary;
	}
	this.setSalary = function (newSalary) {
		if (arguments.hasOwnProperty(1) || !isFinite(newSalary) || isNaN(newSalary) || typeof newSalary !== 'number' || newSalary < 0) {
			console.log('Incorrect data. Enter the number')
		} else {
			if (newSalary < _employeeCharacter.salary) {
				_logEmployee += `try to change salary from ${_employeeCharacter.salary} to ${newSalary}\n`
				console.log('You cannot set smaller salary than employee has now');
			} else {
				_logEmployee += `change salary from ${_employeeCharacter.salary} to ${newSalary}\n`
				_employeeCharacter.salary = newSalary;
			}
		}
	}
	this.getWorkTimeInSeconds = function () {
		let currentTime = new Date().getTime();
		if (_currentCompany !== '' && _endWork > 0 && _allTimeWork > 0) {
			_allTimeHire = Math.floor((currentTime - _startWork) / 1000);
			return _allTimeWork += _allTimeHire;
		} else if (_currentCompany === '' && _endWork > 0 && _allTimeHire > 0) {
			_allTimeFire = Math.floor((_endWork - _startWork) / 1000);
			return _allTimeFire += _allTimeWork;
		} else if (_currentCompany !== '' && _endWork >= 0) {
			return _allTimeWork = Math.floor((currentTime - _startWork) / 1000);
		} else if (_currentCompany === '' && _endWork > 0) {
			return _allTimeWork = Math.floor((_endWork - _startWork) / 1000);
		}
	}
	this._hire = function (company) {
		_startWork = new Date().getTime();
		_currentCompany = company;
		_logEmployee += `${_employeeCharacter.name} is hired to ${company} in ${new Date()};\n`;
	}
	this._fire = function (company) {
		_endWork = new Date().getTime();
		_currentCompany = '';
		_logEmployee += `${_employeeCharacter.name} is fired from ${company} in ${new Date()};\n`;

	}
	this.getHistory = function () {
		return _logEmployee;
	}
}

let artem = new Employee({ name: "Artem", age: 15, salary: 1000, primarySkill: "UX" });
let vova = new Employee({ name: "Vova", age: 16, salary: 2000, primarySkill: "BE" });
let vasyl = new Employee({ name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE" });
let ivan = new Employee({ name: "Ivan", age: 35, salary: 5000, primarySkill: "FE" });
let orest = new Employee({ name: "Orest", age: 29, salary: 300, primarySkill: "AT" });
let anton = new Employee({ name: "Anton", age: 19, salary: 500, primarySkill: "Manager" });

let epam = new Company({ name: "Epam", owner: "Arkadii", maxCompanySize: 5 });
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);
console.log(epam.getHistory());

epam.removeEmployee(2);
console.log(vasyl.getHistory());

console.log(epam.getAverageSalary());
console.log(epam.getAverageAge());

epam.addNewEmployee(5, 6, 9, 5);

setTimeout(() => {
	epam.removeEmployee(1);
	console.log(artem.getWorkTimeInSeconds());
}, 5000);
vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());


