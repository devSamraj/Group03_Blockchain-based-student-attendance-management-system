const AttendanceToken = artifacts.require("AttendanceToken");
const AttendanceRegister = artifacts.require("AttendanceRegister");

contract("AttendanceRegister", (accounts) => {
    let token;
    let register;
    const admin = accounts[0];
    const student1 = accounts[1];
    const teacher2 = accounts[2];

    before(async () => {
        token = await AttendanceToken.deployed();
        register = await AttendanceRegister.deployed();
    });

    it("should deploy contracts successfully", async () => {
        assert(token.address !== "");
        assert(register.address !== "");
    });

    it("should allow admin to add a student", async () => {
        await register.addStudent(student1, "Alice", { from: admin });
        const student = await register.getStudent(student1);
        assert.equal(student.name, "Alice");
        assert.equal(student.registered, true);
    });

    it("should allow admin to add a subject", async () => {
        await register.addSubject("Math", { from: admin });
        const subject = await register.getSubject(1);
        assert.equal(subject.name, "Math");
        assert.equal(subject.id, 1);
    });

    it("should mark attendance and reward token", async () => {
        // Check initial balance
        const initialBalance = await token.balanceOf(student1);
        assert.equal(initialBalance.toString(), "0");

        // Mark attendance
        await register.markAttendance(student1, 1, true, { from: admin });

        // Check attendance recorded
        const isPresent = await register.attendance(student1, 1);
        assert.equal(isPresent, true);

        // Check token balance (1 token = 1 * 10^18)
        const finalBalance = await token.balanceOf(student1);
        assert.equal(finalBalance.toString(), web3.utils.toWei("1", "ether"));
    });

    it("should NOT allow non-admin to add student", async () => {
        try {
            await register.addStudent(teacher2, "Bob", { from: teacher2 });
            assert.fail("Should have thrown error");
        } catch (e) {
            assert.include(e.message, "Not an admin");
        }
    });

    it("should NOT allow non-admin to mark attendance", async () => {
        try {
            await register.markAttendance(student1, 1, true, { from: teacher2 });
            assert.fail("Should have thrown error");
        } catch (e) {
            assert.include(e.message, "Not an admin");
        }
    });

    it("should prevent duplicate student registration", async () => {
        try {
            await register.addStudent(student1, "Alice Again", { from: admin });
            assert.fail("Should have thrown error");
        } catch (e) {
            assert.include(e.message, "Already registered");
        }
    });
});
