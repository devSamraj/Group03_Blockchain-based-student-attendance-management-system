// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AttendanceToken.sol";
import "./SimpleAdmin.sol";

contract AttendanceRegister is SimpleAdmin {
    AttendanceToken public token;

    struct Student {
        string name;
        bool registered;
    }

    struct Subject {
        uint id;
        string name;
    }

    mapping(address => Student) public students;
    mapping(uint => Subject) public subjects;
    uint public subjectCount;

    // student => subjectId => isPresent
    mapping(address => mapping(uint => bool)) public attendance;

    event AttendanceMarked(address indexed student, uint indexed subjectId, bool isPresent);
    event StudentAdded(address indexed student, string name);
    event SubjectAdded(uint indexed id, string name);

    constructor(address _token) {
        token = AttendanceToken(_token);
    }

    function addStudent(address _student, string memory _name) public onlyAdmin {
        require(!students[_student].registered, "Already registered");
        students[_student] = Student(_name, true);
        emit StudentAdded(_student, _name);
    }

    function addSubject(string memory _name) public onlyAdmin {
        subjectCount++;
        subjects[subjectCount] = Subject(subjectCount, _name);
        emit SubjectAdded(subjectCount, _name);
    }

    function markAttendance(address _student, uint _subjectId, bool _isPresent) public onlyAdmin {
        require(students[_student].registered, "Student not registered");
        require(_subjectId > 0 && _subjectId <= subjectCount, "Invalid subject");
        
        attendance[_student][_subjectId] = _isPresent;
        
        if (_isPresent) {
            token.mint(_student, 1 * 10**18); // 1 token
        }
        
        emit AttendanceMarked(_student, _subjectId, _isPresent);
    }
    
    function getStudent(address _student) public view returns (string memory name, bool registered) {
        return (students[_student].name, students[_student].registered);
    }

    function getSubject(uint _subjectId) public view returns (uint id, string memory name) {
        return (subjects[_subjectId].id, subjects[_subjectId].name);
    }
}
