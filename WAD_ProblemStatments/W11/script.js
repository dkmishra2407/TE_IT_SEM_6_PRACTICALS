// Common XHR Post Simulation
function postData(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);  // Simulate POST request
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(null, xhr.responseText);
      } else {
        callback(`Error: ${xhr.status}`);
      }
    };
  
    
    xhr.onerror = function () {
      callback("Request error");
    };
  
    xhr.send(JSON.stringify(data));
  }
  
  // Handle Registration
  if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const user = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        dob: document.getElementById("dob").value,
        city: document.getElementById("city").value.trim(),
        address: document.getElementById("address").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value
      };
  
      // Validation
      if (!/^\d{10}$/.test(user.mobile)) {
        alert("Invalid mobile number");
        return;
      }
  
      // Use XHR to "POST"
      postData("/register", user, (err, res) => {
        if (err) {
          alert("Registration failed");
        } else {
          // Save to localStorage
          let users = JSON.parse(localStorage.getItem("users") || "[]");
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          alert("Registration successful");
          window.location.href = "login.html";
        }
      });
    });
  }
  
  // Handle Login
  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
  
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find(u => u.username === username && u.password === password);
  
      if (found) {
        alert("Login successful");
        window.location.href = "users.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }
  
  // Display Registered Users
  if (document.getElementById("userList")) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const listDiv = document.getElementById("userList");
  
    if (users.length === 0) {
      listDiv.innerHTML = "<p>No registered users.</p>";
    } else {
      const list = document.createElement("ul");
      users.forEach(u => {
        const li = document.createElement("li");
        li.innerText = `${u.name} (${u.email}, ${u.mobile}) from ${u.city}`;
        list.appendChild(li);
      });
      listDiv.appendChild(list);
    }
  }
  