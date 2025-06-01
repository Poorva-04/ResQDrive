document.addEventListener('DOMContentLoaded', function () {
    // Set up event listeners for sidebar links
    document.getElementById('dashboard-link').addEventListener('click', showDashboard);
    document.getElementById('users-link').addEventListener('click', showUsers);
    document.getElementById('mechanics-link').addEventListener('click', showMechanics);
    document.getElementById('appointments-link').addEventListener('click', showAppointments);
    document.getElementById('logout-link').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Show dashboard by default
    showDashboard(new Event('init'));
});

// Generic fetch utility (token removed for now)
async function fetchData(url, method = 'GET', body = null) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null
    });

    if (response.ok) {
        const data = await response.json();
        console.log(`Data from ${url}:`, data);  // Debugging line to check API response
        return data || [];
    }

    throw new Error('Failed to fetch data from ' + url);
}

// Function to fetch and display dashboard stats
async function fetchDashboardData() {
    try {
        const userCount = await fetchData('http://localhost:8000/api/admin/users/count');
        const mechanicCount = await fetchData('http://localhost:8000/api/admin/mechanics/count');
        const appointmentCount = await fetchData('http://localhost:8000/api/admin/appointments/count');

        document.getElementById('total-users').textContent = userCount.count || 0;
        document.getElementById('total-mechanics').textContent = mechanicCount.count || 0;
        document.getElementById('total-appointments').textContent = appointmentCount.count || 0;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    }
}

// Show Dashboard
async function showDashboard(event) {
    if (event) event.preventDefault();

    document.getElementById('content-area').innerHTML = `
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Use the side menu to manage users, mechanics, and appointments.</p>
    `;

    await fetchDashboardData();
}

// Show Users
async function showUsers(event) {
    event.preventDefault();
    let users = [];

    try {
        // Fetch users and filter by type 'user'
        const response = await fetch('http://localhost:8000/api/admin/users');
        const data = await response.json();

        // Filter out users that are not of type 'user'
        users = data.filter(user => user.userType === 'user');
        console.log('Fetched users:', users);  // Debugging line to verify data

    } catch (err) {
        console.error('Failed to fetch users:', err);
    }

    // Render the filtered users in the table
    let userTableHTML = `
        <h2>Manage Users</h2>
        <table>
            <thead>
                <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr id="user-${user.id}">
                        <td>${user.name || 'N/A'}</td>
                        <td>${user.email || 'N/A'}</td>
                        <td><button onclick="editUser(${user.id})">Edit</button> <button onclick="deleteUser(${user.id})">Delete</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('content-area').innerHTML = userTableHTML;
}

// Edit User
async function editUser(userId) {
    try {
        const user = await fetchData(`http://localhost:8000/api/admin/users/${userId}`);

        // Display edit form with pre-filled data
        const editFormHTML = `
            <h2>Edit User</h2>
            <form id="edit-user-form">
                <input type="hidden" name="id" value="${user.id}">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${user.name}" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}" required>
                <label for="userType">User Type:</label>
                <select id="userType" name="userType" required>
                    <option value="user" ${user.userType === 'user' ? 'selected' : ''}>User</option>
                    <option value="mechanic" ${user.userType === 'mechanic' ? 'selected' : ''}>Mechanic</option>
                    <option value="admin" ${user.userType === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
                <button type="submit">Save Changes</button>
            </form>
        `;

        document.getElementById('content-area').innerHTML = editFormHTML;

        // Handle form submission
        document.getElementById('edit-user-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedUser = {
                name: event.target.name.value,
                email: event.target.email.value,
                userType: document.getElementById('userType').value
            };

            try {
                const response = await fetchData(`http://localhost:8000/api/admin/users/${userId}`, 'PUT', updatedUser);
                alert('User updated successfully');
                showUsers(event); // Refresh the user list
            } catch (error) {
                console.error('Error updating user:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching user data for editing:', error);
    }
}

// Delete User
async function deleteUser(userId) {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
        try {
            await fetchData(`http://localhost:8000/api/admin/users/${userId}`, 'DELETE');
            document.getElementById(`user-${userId}`).remove(); // Remove the deleted user from the table
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

// Show Mechanics
async function showMechanics(event) {
    event.preventDefault();
    let mechanics = [];

    try {
        mechanics = await fetchData('http://localhost:8000/api/admin/mechanics');
        console.log('Fetched mechanics:', mechanics);  // Debugging line to verify data
    } catch (err) {
        console.error('Failed to fetch mechanics:', err);
    }

    let mechanicTableHTML = `
        <h2>Manage Mechanics</h2>
        <table>
            <thead>
                <tr><th>Name</th><th>Vehicle Type</th><th>Availability</th><th>Actions</th></tr>
            </thead>
            <tbody>
                ${mechanics.map(mechanic => `
                    <tr id="mechanic-${mechanic.id}">
                        <td>${mechanic.name || 'N/A'}</td>
                        <td>${mechanic.vehicleType || 'N/A'}</td>
                        <td>${mechanic.availability ? 'Available' : 'Unavailable'}</td>
                        <td><button onclick="editMechanic(${mechanic.id})">Edit</button> <button onclick="deleteMechanic(${mechanic.id})">Delete</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('content-area').innerHTML = mechanicTableHTML;
}

// Edit Mechanic
async function editMechanic(mechanicId) {
    try {
        const mechanic = await fetchData(`http://localhost:8000/api/admin/mechanics/${mechanicId}`);

        const editFormHTML = `
            <h2>Edit Mechanic</h2>
            <form id="edit-mechanic-form">
                <input type="hidden" name="id" value="${mechanic.id}">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${mechanic.name}" required>
                <label for="vehicleType">Vehicle Type:</label>
                <input type="text" id="vehicleType" name="vehicleType" value="${mechanic.vehicleType}" required>
                <label for="availability">Availability:</label>
                <select id="availability" name="availability" required>
                    <option value="true" ${mechanic.availability ? 'selected' : ''}>Available</option>
                    <option value="false" ${!mechanic.availability ? 'selected' : ''}>Unavailable</option>
                </select>
                <button type="submit">Save Changes</button>
            </form>
        `;

        document.getElementById('content-area').innerHTML = editFormHTML;

        document.getElementById('edit-mechanic-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedMechanic = {
                name: event.target.name.value,
                vehicleType: event.target.vehicleType.value,
                availability: event.target.availability.value === 'true'
            };

            try {
                await fetchData(`http://localhost:8000/api/admin/mechanics/${mechanicId}`, 'PUT', updatedMechanic);
                alert('Mechanic updated successfully');
                showMechanics(event);  // Refresh the mechanic list
            } catch (error) {
                console.error('Error updating mechanic:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching mechanic data for editing:', error);
    }
}

// Delete Mechanic
async function deleteMechanic(mechanicId) {
    const confirmation = confirm('Are you sure you want to delete this mechanic?');
    if (confirmation) {
        try {
            await fetchData(`http://localhost:8000/api/admin/mechanics/${mechanicId}`, 'DELETE');
            document.getElementById(`mechanic-${mechanicId}`).remove(); // Remove the deleted mechanic from the table
            alert('Mechanic deleted successfully');
        } catch (error) {
            console.error('Error deleting mechanic:', error);
        }
    }
}

// Show Appointments
async function showAppointments(event) {
    event.preventDefault();
    let appointments = [];

    try {
        appointments = await fetchData('http://localhost:8000/api/admin/appointments');
        console.log('Fetched appointments:', appointments);  // Debugging line to verify data
    } catch (err) {
        console.error('Failed to fetch appointments:', err);
    }

    let appointmentTableHTML = `
        <h2>Manage Appointments</h2>
        <table>
            <thead>
                <tr><th>ID</th><th>User</th><th>Mechanic</th><th>Status</th></tr>
            </thead>
            <tbody>
                ${appointments.map(app => `
                    <tr>
                        <td>${app.id}</td>
                        <td>${app.userName || 'N/A'}</td>
                        <td>${app.mechanicName || 'N/A'}</td>
                        <td>${app.status || 'Pending'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('content-area').innerHTML = appointmentTableHTML;
}
