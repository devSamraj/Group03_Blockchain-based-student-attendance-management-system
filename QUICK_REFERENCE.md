# Quick Reference Guide

## 🚀 Quick Start Commands

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Terminal 1 - Start Ganache
npx ganache --port 8545

# 3. Terminal 2 - Deploy contracts
npx truffle migrate --network development

# 4. Terminal 3 - Start app
npm start
```

### Automated Setup
```bash
# Use the quick start script (Ganache must be running first)
./quick-start.sh
```

---

## 🔑 Key Addresses

After running `truffle migrate`, note these addresses:
- **AttendanceToken**: (displayed in migration output)
- **AttendanceRegister**: (displayed in migration output)

---

## 👥 Test Accounts

From Ganache output, you'll get 10 accounts. Use:
- **Account 0**: Teacher/Admin (import to MetaMask first)
- **Account 1-9**: Students (import as needed)

---

## 📝 Common Tasks

### Reset Everything
```bash
# Stop Ganache (Ctrl+C in Terminal 1)
# Restart Ganache
npx ganache --port 8545

# Re-deploy (Terminal 2)
npx truffle migrate --network development --reset

# Reset MetaMask
# Settings → Advanced → Clear activity tab data
```

### Run Tests Only
```bash
npx truffle test --network development
```

### Rebuild Frontend
```bash
npm run build
```

---

## 🐛 Quick Fixes

### "Cannot connect to network"
→ Check Ganache is running on port 8545

### "Smart contract not deployed"
→ Run `npx truffle migrate --network development --reset`

### MetaMask transaction failing
→ Reset MetaMask account data (Settings → Advanced → Clear activity)

### Wrong account type showing
→ Ensure you imported Account 0 as teacher, others as students

---

## 📊 Demo Checklist

- [ ] Ganache running (Terminal 1)
- [ ] Contracts deployed (Terminal 2)
- [ ] Frontend running (Terminal 3)
- [ ] MetaMask configured (Localhost 8545, Chain ID 1337)
- [ ] Teacher account imported (Account 0)
- [ ] Student account imported (Account 1)
- [ ] Connected as teacher → See Teacher Panel
- [ ] Added student (paste Account 1 address)
- [ ] Added subject (e.g., "Math")
- [ ] Marked attendance for student
- [ ] Switched to student account
- [ ] Refreshed page → See Student Dashboard with attendance + tokens

---

## 🎯 Smart Contract Functions

### Teacher (Admin) Functions
```
addStudent(address, name)
addSubject(name)
markAttendance(student, subjectId, isPresent)
```

### Student (View) Functions
```
getStudent(address) → name, registered
getSubject(id) → id, name
attendance(student, subjectId) → bool
balanceOf(address) → token balance
```

---

## 📱 MetaMask Setup Values

| Field | Value |
|-------|-------|
| Network Name | Localhost 8545 |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 1337 |
| Currency | ETH |

---

## 🔢 Important Numbers

- Subject IDs start at **1** (auto-increment)
- Token reward per attendance: **1 ATK**
- Default gas price: **2 gwei** (Ganache)
- Starting ETH per account: **100 ETH** (Ganache)

---

For full documentation, see [README.md](./README.md)
