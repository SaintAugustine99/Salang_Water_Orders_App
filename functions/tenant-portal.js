// js/tenant-portal.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('tenant-login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('tenant-dashboard');
    const tenantNameElement = document.getElementById('tenant-name');
    const currentBalanceElement = document.getElementById('current-balance');
    const previousBalanceElement = document.getElementById('previous-balance');
    const logoutButton = document.getElementById('logout-btn');
    
    // Check if user is already logged in
    const token = localStorage.getItem('tenant_token');
    if (token) {
      const tokenData = parseJwt(token);
      // Check if token is expired
      if (tokenData.exp * 1000 > Date.now()) {
        fetchTenantData(token);
      } else {
        localStorage.removeItem('tenant_token');
      }
    }
    
    // Login form submission
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/.netlify/functions/tenant-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phone, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }
        
        // Save token to local storage
        localStorage.setItem('tenant_token', data.token);
        
        // Show dashboard
        displayTenantDashboard(data.tenant);
        
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    });
    
    // Logout button
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('tenant_token');
      dashboardSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
    
    // Display tenant dashboard
    function displayTenantDashboard(tenant) {
      loginSection.style.display = 'none';
      dashboardSection.style.display = 'block';
      
      tenantNameElement.textContent = `Welcome, ${tenant.name}`;
      currentBalanceElement.textContent = tenant.balance;
      previousBalanceElement.textContent = tenant.previousBalance || tenant.balance;
      
      // Load payment history if available
      if (tenant.payments && tenant.payments.length > 0) {
        displayPaymentHistory(tenant.payments);
      } else {
        document.getElementById('no-payments').style.display = 'block';
      }
    }
    
    // Fetch tenant data using token
    async function fetchTenantData(token) {
      try {
        const response = await fetch('/.netlify/functions/get-tenant-data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch tenant data');
        }
        
        displayTenantDashboard(data.tenant);
        
      } catch (error) {
        console.error('Error fetching tenant data:', error);
        // Clear invalid token
        localStorage.removeItem('tenant_token');
      }
    }
    
    // Display payment history
    function displayPaymentHistory(payments) {
      const tableBody = document.getElementById('payment-history-data');
      tableBody.innerHTML = '';
      
      payments.forEach(payment => {
        const row = document.createElement('tr');
        
        const paymentDate = new Date(payment.date);
        const formattedDate = paymentDate.toLocaleDateString();
        
        row.innerHTML = `
          <td>${formattedDate}</td>
          <td>KES ${payment.amount}</td>
          <td><span class="status-pill status-${payment.status}">${payment.status}</span></td>
        `;
        
        tableBody.appendChild(row);
      });
      
      document.getElementById('no-payments').style.display = 'none';
    }
    
    // Helper function to parse JWT token
    function parseJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      } catch (e) {
        return {};
      }
    }
  });