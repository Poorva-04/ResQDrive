document.addEventListener("DOMContentLoaded", function () {
    console.log("Manage Requests Page Loaded!");

    const requestList = document.getElementById("requestList");

    // Dummy data (Replace with API call to fetch real data)
    const serviceRequests = [
        { id: "A12345", user: "John Doe", vehicle: "Car", mechanic: "Michael", status: "Pending" },
        { id: "B67890", user: "Alice Smith", vehicle: "Two-wheeler", mechanic: "David", status: "Accepted" },
        { id: "C54321", user: "Robert Brown", vehicle: "Truck", mechanic: "Chris", status: "Completed" }
    ];

    function loadRequests() {
        requestList.innerHTML = ""; // Clear previous data

        if (serviceRequests.length === 0) {
            requestList.innerHTML = `<tr><td colspan="6">No service requests available.</td></tr>`;
            return;
        }

        serviceRequests.forEach(request => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${request.id}</td>
                <td>${request.user}</td>
                <td>${request.vehicle}</td>
                <td>${request.mechanic}</td>
                <td>${request.status}</td>
                <td>
                    <button class="approve-btn" data-id="${request.id}">Approve</button>
                    <button class="reject-btn" data-id="${request.id}">Reject</button>
                </td>
            `;

            requestList.appendChild(row);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".approve-btn").forEach(button => {
            button.addEventListener("click", function () {
                updateStatus(this.dataset.id, "Approved");
            });
        });

        document.querySelectorAll(".reject-btn").forEach(button => {
            button.addEventListener("click", function () {
                updateStatus(this.dataset.id, "Rejected");
            });
        });
    }

    function updateStatus(requestId, newStatus) {
        const request = serviceRequests.find(req => req.id === requestId);
        if (request) {
            request.status = newStatus;
            console.log(`Updated ${requestId} to ${newStatus}`);
            loadRequests(); // Refresh the table
        }
    }

    loadRequests();
});
