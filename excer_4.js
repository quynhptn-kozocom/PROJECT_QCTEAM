const username = document.getElementById('username');
const password = document.getElementById('password');
const message = document.getElementById('message');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

function showMessage(text, type) {
  message.textContent = text;
  message.className = 'message ' + type;
}

function clearErrors() {
  usernameError.textContent = '';
  passwordError.textContent = '';
  message.textContent = '';
  message.className = 'message';
}

document.getElementById('loginBtn').addEventListener('click', () => {
  clearErrors();
  const user = username.value.trim();
  const pass = password.value.trim();

  if (!user) {
    usernameError.textContent = 'Username is required';
    return;
  }
  if (!pass) {
    passwordError.textContent = 'Password is required';
    return;
  }

  if (user === 'admin' && pass === 'admin') {
    showMessage('Login successful', 'success');
  } else {
    showMessage('Invalid username or password', 'error');
  }
});

document.getElementById('clearForm').addEventListener('click', () => {
  username.value = '';
  password.value = '';
  clearErrors();
});

document.getElementById('runTests').addEventListener('click', runAllTests);

function runAllTests() {
  const tests = [
    { name: 'Empty username', input: { user: '', pass: 'admin' }, expected: 'Username is required' },
    { name: 'Empty password', input: { user: 'admin', pass: '' }, expected: 'Password is required' },
    { name: 'Correct login', input: { user: 'admin', pass: 'admin' }, expected: 'Login successful' },
    { name: 'Wrong login', input: { user: 'abc', pass: '123' }, expected: 'Invalid username or password' },
  ];

  const results = tests.map(t => {
    const res = simulateLogin(t.input.user, t.input.pass);
    const isPass = res === t.expected;
    return {
      Test: t.name,
      Expected: t.expected,
      Actual: res,
      Result: isPass ? '✅' : '❌'
    };
  });

  console.table(results);
}

function simulateLogin(user, pass) {
  if (!user) return 'Username is required';
  if (!pass) return 'Password is required';
  if (user === 'admin' && pass === 'admin') return 'Login successful';
  return 'Invalid username or password';
}
