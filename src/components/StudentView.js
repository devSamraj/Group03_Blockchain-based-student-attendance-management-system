import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const StudentView = ({ contract, account, tokenContract }) => {
    const [attendance, setAttendance] = useState([]);
    const [balance, setBalance] = useState('0');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Get token balance
                if (tokenContract && account) {
                    const bal = await tokenContract.balanceOf(account);
                    setBalance(ethers.formatEther(bal));
                }

                // Get attendance
                if (contract && account) {
                    const count = await contract.subjectCount();
                    const records = [];

                    // Loop through all subjects to check attendance
                    // Note: In production, optimize this with events or a view function returning arrays
                    for (let i = 1; i <= Number(count); i++) {
                        const isPresent = await contract.attendance(account, i);
                        if (isPresent) {
                            const subject = await contract.getSubject(i);
                            records.push({ id: subject.id.toString(), name: subject.name, status: "Present" });
                        }
                    }
                    setAttendance(records);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };
        fetchData();
    }, [contract, account, tokenContract]);

    return (
        <div className="card mt-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3>Student Dashboard</h3>
            </div>
            <div className="card-body">
                <div className="mb-4 p-3 bg-light rounded text-center">
                    <h4>Token Balance</h4>
                    <h2 className="display-4 text-primary">{parseFloat(balance).toFixed(2)} <small className="text-muted" style={{ fontSize: '0.5em' }}>ATK</small></h2>
                </div>

                <h5 className="mt-4">My Attendance Records</h5>
                {loading ? (
                    <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>
                ) : attendance.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Subject ID</th>
                                    <th>Subject Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((rec) => (
                                    <tr key={rec.id}>
                                        <td>{rec.id}</td>
                                        <td>{rec.name}</td>
                                        <td><span className="badge bg-success">{rec.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-muted">No attendance records found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentView;
