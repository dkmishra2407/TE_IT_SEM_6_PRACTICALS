document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userTable = document.getElementById('userTable');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                window.location.href = 'display.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked'))
                .map(checkbox => checkbox.value);
            
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                mobile: document.getElementById('mobile').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                hobbies: hobbies
            };

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registration successful!');
            window.location.href = 'display.html';
        });
    }

    if (userTable) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const tbody = userTable.querySelector('tbody');
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>${user.address}</td>
                <td>${user.city}</td>
                <td>${user.gender}</td>
                <td>${user.hobbies.join(', ')}</td>
            `;
            tbody.appendChild(row);
        });
    }
});