# Blockchain Attendance System

A decentralized student attendance tracking system built with **Ethereum Smart Contracts**, **React.js**, and **MetaMask**. Teachers can register students, add subjects, and mark attendance, while students earn **ERC-20 tokens** as rewards for attendance.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Usage Guide](#usage-guide)
- [Smart Contracts](#smart-contracts)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### For Teachers (Admin)
- Register new students with wallet addresses
- Create subjects for attendance tracking
- Mark student attendance (present/absent)
- Automatic token rewards for present students

### For Students
- View personal attendance records
- Check token balance (ATK tokens)
- Real-time blockchain transaction updates

### Blockchain Features
- **ERC-20 Token Rewards**: Students earn 1 ATK token per attendance mark
- **Immutable Records**: All attendance data stored on blockchain
- **Role-Based Access**: Admin-only functions for teachers
- **MetaMask Integration**: Secure wallet-based authentication

---

## 🛠 Tech Stack

- **Smart Contracts**: Solidity ^0.8.0
- **Development Framework**: Truffle Suite
- **Frontend**: React.js with React Bootstrap
- **Blockchain Library**: Ethers.js v6
- **Local Blockchain**: Ganache
- **Token Standard**: ERC-20 (OpenZeppelin)
- **Styling**: Bootstrap 5 + Custom CSS

---

## 📁 Project Structure

```
attendance-system/
├── contracts/              # Smart contracts
│   ├── AttendanceToken.sol       # ERC-20 token contract
│   ├── SimpleAdmin.sol           # Role management
│   ├── AttendanceRegister.sol    # Main attendance logic
│   └── Migrations.sol
├── migrations/             # Deployment scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test/                   # Truffle tests
│   └── AttendanceRegister.test.js
├── src/                    # React frontend
│   ├── components/
│   │   ├── ConnectWallet.js      # Wallet connection
│   │   ├── TeacherPanel.js       # Teacher dashboard
│   │   └── StudentView.js        # Student dashboard
│   ├── contracts/          # Build artifacts (auto-generated)
│   ├── App.js              # Main app component
│   └── App.css
├── truffle-config.js       # Truffle configuration
└── package.json
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   ```bash
   node --version
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **MetaMask Browser Extension**
   - Install from [metamask.io](https://metamask.io/)
   - Create a wallet if you don't have one

4. **Truffle** (global installation)
   ```bash
   npm install -g truffle
   ```

---

## 🚀 Installation

### Step 1: Clone/Navigate to Project
```bash
cd /home/sam/Templates/blockchain_v4/attendance-system
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React and React Bootstrap
- Ethers.js
- OpenZeppelin Contracts
- Ganache (local blockchain)
- All other project dependencies

---

## 🎯 Running the Application

### Terminal 1: Start Local Blockchain (Ganache)

```bash
npx ganache --port 8545
```

**Important**: Keep this terminal running. Ganache will display:
- 10 pre-funded test accounts
- Private keys for each account
- Mnemonic phrase
- RPC server address (127.0.0.1:8545)

**Save the first account's private key** - you'll need it to import into MetaMask as the teacher/admin account.

---

### Terminal 2: Deploy Smart Contracts

Open a new terminal and run:

```bash
npx truffle migrate --network development
```

Expected output:
```
✓ Compiling your contracts...
✓ Deploying 'AttendanceToken'...
✓ Deploying 'AttendanceRegister'...

Token deployed at: 0x...
Register deployed at: 0x...
```

**Note**: Contract addresses will be automatically saved to `src/contracts/` for the frontend.

---

### Terminal 3: Start React Frontend

Open another terminal:

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🧪 Testing

### Run Smart Contract Tests

```bash
npx truffle test --network development
```

Expected output:
```
Contract: AttendanceRegister
  ✓ should deploy contracts successfully
  ✓ should allow admin to add a student
  ✓ should allow admin to add a subject
  ✓ should mark attendance and reward token
  ✓ should NOT allow non-admin to add student
  ✓ should NOT allow non-admin to mark attendance
  ✓ should prevent duplicate student registration

7 passing (2s)
```

---

## 📘 Usage Guide

### 1. Configure MetaMask

#### Add Local Network
1. Open MetaMask
2. Click on the network dropdown (top center)
3. Select "Add Network" → "Add a network manually"
4. Enter:
   - **Network Name**: Localhost 8545
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
5. Click "Save"

#### Import Test Accounts
1. Copy the **first private key** from Ganache's output (this will be the admin/teacher)
2. In MetaMask: "Account" menu → "Import Account" → Paste private key
3. Repeat for second account (this will be a student)

---

### 2. Teacher Workflow

1. **Connect as Admin/Teacher**
   - Switch to the first imported account in MetaMask
   - Click "Connect Wallet" in the app
   - You should see the "Teacher Panel"

2. **Register a Student**
   - Copy the address of your second MetaMask account
   - In "Add Student" section:
     - Paste student address
     - Enter student name (e.g., "Alice")
   - Click "Register Student"
   - Confirm transaction in MetaMask
   - Wait for success message

3. **Add a Subject**
   - In "Add Subject" section:
     - Enter subject name (e.g., "Mathematics")
   - Click "Add Subject"
   - Confirm transaction
   - Subject ID will be 1 (auto-incremented)

4. **Mark Attendance**
   - In "Mark Attendance" section:
     - Enter student address
     - Enter Subject ID (1 for first subject)
     - Check "Is Present" checkbox
   - Click "Mark Attendance"
   - Confirm transaction
   - Student receives 1 ATK token automatically

---

### 3. Student Workflow

1. **Connect as Student**
   - Switch to the second MetaMask account
   - Refresh the page or click "Connect Wallet"
   - You should see the "Student Dashboard"

2. **View Attendance**
   - See table of all subjects where you were marked present
   - View Subject ID, Subject Name, and Status

3. **Check Token Balance**
   - View your ATK token balance at the top
   - Balance updates automatically when attendance is marked

---

## 📜 Smart Contracts

### AttendanceToken.sol
- **Type**: ERC-20 Token
- **Symbol**: ATK
- **Name**: AttendanceToken
- **Features**:
  - Mintable by owner (AttendanceRegister contract)
  - Standard ERC-20 functions (transfer, balanceOf, etc.)

### SimpleAdmin.sol
- **Purpose**: Role-based access control
- **Functions**:
  - `isAdmin(address)`: Check if address is admin
  - `addAdmin(address)`: Add new admin (admin only)
  - `removeAdmin(address)`: Remove admin (admin only)

### AttendanceRegister.sol
- **Purpose**: Main attendance logic
- **Key Functions**:
  - `addStudent(address, string name)`: Register student
  - `addSubject(string name)`: Create subject
  - `markAttendance(address, uint subjectId, bool isPresent)`: Record attendance
  - `getStudent(address)`: View student info
  - `getSubject(uint)`: View subject info
- **Events**:
  - `StudentAdded(address, string)`
  - `SubjectAdded(uint, string)`
  - `AttendanceMarked(address, uint, bool)`

---

## 🔧 Troubleshooting

### Issue: MetaMask not connecting
**Solution**:
- Ensure Ganache is running on port 8545
- Check MetaMask is on "Localhost 8545" network
- Try refreshing the page
- Check browser console for errors

### Issue: Transaction fails
**Solution**:
- Ensure you have enough ETH in your account (Ganache provides 100 ETH per account)
- Verify you're using the correct account (teacher for admin functions)
- Check if contracts are deployed (`src/contracts/` should have .json files)
- Reset MetaMask account (Settings → Advanced → Clear activity tab data)

### Issue: "Smart contract not deployed to detected network"
**Solution**:
- Ensure you ran `npx truffle migrate --network development`
- Verify network ID matches (1337 for Ganache)
- Check `src/contracts/AttendanceRegister.json` contains network entry for "1337"
- Restart Ganache and re-deploy contracts

### Issue: Build errors
**Solution**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear build cache: `rm -rf build/ src/contracts/`
- Re-compile: `npx truffle compile`

### Issue: Can't see attendance records
**Solution**:
- Ensure contracts are deployed
- Check browser console for errors
- Verify student address is registered
- Ensure at least one attendance has been marked

---

## 📝 Additional Notes

### Gas Fees
- All transactions require gas fees (paid in ETH)
- Ganache provides 100 ETH per account for testing
- In production, you'd need real ETH

### Token Economics
- 1 token = 1 * 10^18 wei (standard ERC-20 decimals)
- Students earn 1 ATK token per "present" mark
- No penalties for absent marks
- Tokens are freely transferable (ERC-20 standard)

### Security Considerations
- Only admin addresses can register students and mark attendance
- Student addresses are immutable once registered
- All transactions are recorded on-chain
- MetaMask provides transaction signing security

---

## 🎓 Demo Flow

1. **Start Ganache** → Terminal 1
2. **Deploy Contracts** → Terminal 2
3. **Start Frontend** → Terminal 3
4. **Import 2 accounts** into MetaMask
5. **Connect as Teacher** (Account 1)
6. **Add student** (Account 2 address)
7. **Add subject** ("Blockchain 101")
8. **Mark attendance** for student
9. **Switch to Student account** in MetaMask
10. **Refresh page** → See attendance + token balance

---

## 🚀 Production Deployment

For production deployment:
1. Deploy contracts to a testnet (Sepolia, Goerli) or mainnet
2. Update `truffle-config.js` with network configuration
3. Build React app: `npm run build`
4. Deploy `build/` folder to hosting (Vercel, Netlify, IPFS)
5. Update contract addresses in frontend

---

## 📄 License

MIT License - feel free to use for educational purposes

---

## 🤝 Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review browser console for error messages
- Ensure all prerequisites are installed
- Verify Ganache is running before deploying contracts

---

**Happy Learning! 🎉**
