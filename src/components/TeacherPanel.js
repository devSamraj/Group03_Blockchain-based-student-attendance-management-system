import React, { useState } from 'react';

const TeacherPanel = ({ contract }) => {
    const [studentAddress, setStudentAddress] = useState('');
    const [studentName, setStudentName] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [markStudent, setMarkStudent] = useState('');
    const [markSubjectId, setMarkSubjectId] = useState('');
    const [isPresent, setIsPresent] = useState(true);

    const addStudent = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.addStudent(studentAddress, studentName);
            await tx.wait();
            alert("Student added!");
            setStudentAddress('');
            setStudentName('');
        } catch (error) {
            console.error(error);
            alert("Error adding student: " + (error.reason || error.message));
        }
    };

    const addSubject = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.addSubject(subjectName);
            await tx.wait();
            alert("Subject added!");
            setSubjectName('');
        } catch (error) {
            console.error(error);
            alert("Error adding subject: " + (error.reason || error.message));
        }
    };

    const markAttendance = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.markAttendance(markStudent, markSubjectId, isPresent);
            await tx.wait();
            alert("Attendance marked!");
        } catch (error) {
            console.error(error);
            alert("Error marking attendance: " + (error.reason || error.message));
        }
    };

    return (
        <div className="card mt-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h3>Teacher Panel</h3>
            </div>
            <div className="card-body">
                <div className="mb-4 p-3 border rounded bg-light">
                    <h5>Add Student</h5>
                    <form onSubmit={addStudent}>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Student Address (0x...)" value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register Student</button>
                    </form>
                </div>

                <div className="mb-4 p-3 border rounded bg-light">
                    <h5>Add Subject</h5>
                    <form onSubmit={addSubject}>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-secondary w-100">Add Subject</button>
                    </form>
                </div>

                <div className="p-3 border rounded bg-light">
                    <h5>Mark Attendance</h5>
                    <form onSubmit={markAttendance}>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Student Address" value={markStudent} onChange={(e) => setMarkStudent(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <input type="number" className="form-control" placeholder="Subject ID" value={markSubjectId} onChange={(e) => setMarkSubjectId(e.target.value)} required />
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" checked={isPresent} onChange={(e) => setIsPresent(e.target.checked)} />
                            <label className="form-check-label">Is Present</label>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Mark Attendance</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherPanel;
