import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AttendanceRegister from './contracts/AttendanceRegister.json';
import AttendanceToken from './contracts/AttendanceToken.json';

import ConnectWallet from './components/ConnectWallet';
import TeacherPanel from './components/TeacherPanel';
import StudentView from './components/StudentView';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        loadContracts(signer, address);
      } catch (error) {
        console.error("Connection error", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const loadContracts = async (signer, address) => {
    setLoading(true);
    try {
      const network = await signer.provider.getNetwork();
      const netId = network.chainId.toString();

      const registerData = AttendanceRegister.networks[netId];
      const tokenData = AttendanceToken.networks[netId];

      if (registerData && tokenData) {
        const registerContract = new ethers.Contract(registerData.address, AttendanceRegister.abi, signer);
        const tokenCt = new ethers.Contract(tokenData.address, AttendanceToken.abi, signer);

        setContract(registerContract);
        setTokenContract(tokenCt);

        const adminStatus = await registerContract.isAdmin(address);
        setIsTeacher(adminStatus);
      } else {
        alert("Smart contract not deployed to the detected network. Please check your MetaMask network.");
      }
    } catch (error) {
      console.error("Error loading contracts", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          window.location.reload();
        } else {
          setAccount('');
          setContract(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="container py-5 app-container">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary gradient-text">Blockchain Attendance</h1>
        <p className="lead text-muted">Decentralized Student Register & Rewards</p>
      </header>

      <ConnectWallet connectWallet={connectWallet} account={account} />

      {loading && <div className="text-center my-5"><div className="spinner-border text-primary" role="status"></div></div>}

      {account && contract && !loading && (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {isTeacher ? (
              <TeacherPanel contract={contract} account={account} />
            ) : (
              <StudentView contract={contract} account={account} tokenContract={tokenContract} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
