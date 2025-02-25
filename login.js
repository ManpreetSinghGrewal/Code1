document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert('Login failed: ' + errorData.error);
    } else {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = 'chat.html';
    }
  } catch (error) {
    alert('An unexpected error occurred: ' + error.message);
  }
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert('Registration failed: ' + errorData.error);
    } else {
      alert('Registration successful, please log in');
      switchToLogin();
    }
  } catch (error) {
    alert('An unexpected error occurred: ' + error.message);
  }
});

const logoutButton = document.getElementById('logout');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}

function switchToSignUp() {
  document.getElementById('login-box').classList.remove('active');
  document.getElementById('signup-box').classList.add('active');
}

function switchToLogin() {
  document.getElementById('login-box').classList.add('active');
  document.getElementById('signup-box').classList.remove('active');
}
