// Lấy phần tử DOM
const username = document.getElementById('username');
const password = document.getElementById('password');
const message = document.getElementById('message');
const loginBtn = document.getElementById('loginBtn');
const runTests = document.getElementById('runTests');
const clearForm = document.getElementById('clearForm');

// Hàm hiển thị thông báo
function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

// Hàm xử lý đăng nhập
function login() {
  const user = username.value.trim();
  const pass = password.value.trim();

  if (!user) {
    showMessage("Username is required", "error");
    return false;
  }
  if (!pass) {
    showMessage("Password is required", "error");
    return false;
  }

  if (user === "admin" && pass === "admin") {
    showMessage("Login successful! Welcome admin", "success");
    return true;
  } else {
    showMessage("Invalid username or password", "error");
    return false;
  }
}

// Gắn sự kiện click
loginBtn.addEventListener("click", login);

clearForm.addEventListener("click", () => {
  username.value = "";
  password.value = "";
  message.textContent = "";
  message.className = "message";
});

// ---- Test Automation ---- //
const testCases = [
  { id: 1, username: "", password: "", expected: "Username is required" },
  { id: 2, username: "admin", password: "", expected: "Password is required" },
  { id: 3, username: "admin", password: "admin", expected: "Login successful! Welcome admin" },
  { id: 4, username: "user", password: "123", expected: "Invalid username or password" },
];

function runAllTests() {
  const results = testCases.map(tc => {
    username.value = tc.username;
    password.value = tc.password;
    login();
    const actual = message.textContent;
    const pass = actual === tc.expected;
    return { TestCase: tc.id, Expected: tc.expected, Actual: actual, Result: pass ? "✅ Pass" : "❌ Fail" };
  });
  console.table(results);
}

// Gắn sự kiện test
runTests.addEventListener("click", runAllTests);