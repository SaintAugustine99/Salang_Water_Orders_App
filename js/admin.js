// Initialize the admin dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const loginSection = document.getElementById('login-section');
  const mainDashboard = document.getElementById('main-dashboard');
  const dashboard = document.getElementById('dashboard');
  const tenantManagement = document.getElementById('tenant-management');
  const currentUserElement = document.getElementById('current-user');
  const ordersDataElement = document.getElementById('orders-data');
  const loadingIndicator = document.getElementById('loading-indicator');
  const noOrdersElement = document.getElementById('no-orders');
  const refreshButton = document.getElementById('refresh-btn');
  const statusFilter = document.getElementById('status-filter');
  const dateFilter = document.getElementById('date-filter');
  const orderDetailsModal = document.getElementById('order-details-modal');
  const orderDetailsContent = document.getElementById('order-details-content');
  const updateStatusSelect = document.getElementById('update-status');
  const saveStatusButton = document.getElementById('save-status');
  
  // Current order being viewed in the modal
  let currentOrderId = null;
  
  // Setup Netlify Identity
  initializeNetlifyIdentity();
  
  // Add event listeners
  refreshButton.addEventListener('click', loadOrders);
  statusFilter.addEventListener('change', filterOrders);
  dateFilter.addEventListener('change', filterOrders);
  
  // Tab switching functionality
  document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all tabs
          document.querySelectorAll('.tab-btn').forEach(btn => {
              btn.classList.remove('active');
          });
          
          // Hide all dashboard containers
          dashboard.style.display = 'none';
          tenantManagement.style.display = 'none';
          
          // Show selected tab
          const tabName = this.getAttribute('data-tab');
          if (tabName === 'orders') {
              dashboard.style.display = 'block';
              loadOrders();
          } else if (tabName === 'tenants') {
              tenantManagement.style.display = 'block';
              loadTenants();
          }
          
          this.classList.add('active');
      });
  });
  
  // Close modal when clicking the X
  document.querySelector('.close-modal').addEventListener('click', function() {
      orderDetailsModal.style.display = 'none';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target === orderDetailsModal) {
          orderDetailsModal.style.display = 'none';
      }
  });
  
  // Save status changes
  saveStatusButton.addEventListener('click', updateOrderStatus);
  
  // Setup tenant filtering
  if (document.getElementById('tenant-search')) {
      document.getElementById('tenant-search').addEventListener('input', loadTenants);
  }
  
  if (document.getElementById('group-filter')) {
      document.getElementById('group-filter').addEventListener('change', loadTenants);
  }
  
  if (document.getElementById('refresh-tenants-btn')) {
      document.getElementById('refresh-tenants-btn').addEventListener('click', loadTenants);
  }

  // Initialize identity widget
  function initializeNetlifyIdentity() {
      if (netlifyIdentity) {
          netlifyIdentity.on('init', user => {
              handleIdentityEvent(user);
          });
          
          netlifyIdentity.on('login', user => {
              handleIdentityEvent(user);
              netlifyIdentity.close();
              // Initialize data if needed
              initializeCustomersData().then(() => {
                  loadOrders();
              });
          });
          
          netlifyIdentity.on('logout', () => {
              loginSection.style.display = 'block';
              mainDashboard.style.display = 'none';
              currentUserElement.textContent = 'Not logged in';
          });
          
          netlifyIdentity.on('error', err => {
              console.error('Netlify Identity error:', err);
              alert('Authentication error: ' + err.message);
          });
      }
  }

  // Handle identity changes
  function handleIdentityEvent(user) {
      if (user) {
          currentUserElement.textContent = `Logged in as: ${user.email}`;
          loginSection.style.display = 'none';
          mainDashboard.style.display = 'block';
          
          // Set default tab to orders
          document.querySelectorAll('.tab-btn').forEach(btn => {
              btn.classList.remove('active');
          });
          document.querySelector('.tab-btn[data-tab="orders"]').classList.add('active');
          dashboard.style.display = 'block';
          tenantManagement.style.display = 'none';
      } else {
          currentUserElement.textContent = 'Not logged in';
          loginSection.style.display = 'block';
          mainDashboard.style.display = 'none';
      }
  }
  
  // Load orders from API
  function loadOrders() {
      const user = netlifyIdentity.currentUser();
      if (!user) {
          console.error('No user authenticated');
          return;
      }
      
      // Show loading state
      ordersDataElement.innerHTML = '';
      loadingIndicator.style.display = 'flex';
      noOrdersElement.style.display = 'none';
      
      // Get JWT token for authorization
      user.jwt().then(token => {
          // Call the orders API with the auth token
          fetch('/.netlify/functions/get-orders', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              displayOrders(data.orders);
          })
          .catch(error => {
              console.error('Error loading orders:', error);
              loadingIndicator.style.display = 'none';
              ordersDataElement.innerHTML = `<tr><td colspan="7" class="error-message">Error loading orders: ${error.message}</td></tr>`;
          });
      });
  }

  // Display orders in the table
  function displayOrders(orders) {
      loadingIndicator.style.display = 'none';
      
      if (!orders || orders.length === 0) {
          noOrdersElement.style.display = 'block';
          return;
      }
      
      // Apply filters
      const filteredOrders = filterOrdersList(orders);
      
      if (filteredOrders.length === 0) {
          noOrdersElement.style.display = 'block';
          return;
      }
      
      noOrdersElement.style.display = 'none';
      
      // Sort orders by date (newest first)
      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Clear existing rows
      ordersDataElement.innerHTML = '';
      
      // Add orders to table
      filteredOrders.forEach(order => {
          const row = document.createElement('tr');
          
          // Format date
          const orderDate = new Date(order.createdAt);
          const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          
          row.innerHTML = `
              <td>${order.id}</td>
              <td>${formattedDate}</td>
              <td>${order.name}<br><small>${formatPhone(order.phone)}</small></td>
              <td>${order.quantity} bottle${order.quantity > 1 ? 's' : ''}</td>
              <td>${truncateText(order.address, 30)}</td>
              <td><span class="status-pill status-${order.status || 'new'}">${capitalizeFirstLetter(order.status || 'new')}</span></td>
              <td>
                  <button class="action-btn view-btn" data-id="${order.id}">
                      <i class="fas fa-eye"></i> View
                  </button>
                  <button class="action-btn delete-btn" data-id="${order.id}">
                      <i class="fas fa-trash"></i> Delete
                  </button>
              </td>
          `;
          
          ordersDataElement.appendChild(row);
      });
      
      // Add event listeners to the new buttons
      document.querySelectorAll('.view-btn').forEach(button => {
          button.addEventListener('click', () => viewOrderDetails(button.getAttribute('data-id')));
      });
      
      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', () => deleteOrder(button.getAttribute('data-id')));
      });
  }

  // Filter orders based on selected filters
  function filterOrdersList(orders) {
      const statusValue = statusFilter.value;
      const dateValue = dateFilter.value;
      
      return orders.filter(order => {
          // Filter by status
          if (statusValue !== 'all' && (order.status || 'new') !== statusValue) {
              return false;
          }
          
          // Filter by date
          if (dateValue) {
              const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
              if (orderDate !== dateValue) {
                  return false;
              }
          }
          
          return true;
      });
  }

  // Apply filters when changed
  function filterOrders() {
      loadOrders();
  }

  // View order details
  function viewOrderDetails(orderId) {
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      currentOrderId = orderId;
      
      user.jwt().then(token => {
          fetch(`/.netlify/functions/get-order?id=${orderId}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              if (data.order) {
                  displayOrderDetails(data.order);
                  orderDetailsModal.style.display = 'block';
                  
                  // Set the current status in the dropdown
                  updateStatusSelect.value = data.order.status || 'new';
              } else {
                  alert('Order not found');
              }
          })
          .catch(error => {
              console.error('Error loading order details:', error);
              alert(`Error loading order details: ${error.message}`);
          });
      });
  }

  // Display order details in the modal
  function displayOrderDetails(order) {
      const orderDate = new Date(order.createdAt);
      const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
      
      let notesDisplay = order.notes ? order.notes : 'None';
      let emailDisplay = order.email ? order.email : 'Not provided';
      
      orderDetailsContent.innerHTML = `
          <div class="order-detail-row">
              <div class="detail-label">Order ID:</div>
              <div class="detail-value">${order.id}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Date:</div>
              <div class="detail-value">${formattedDate}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Status:</div>
              <div class="detail-value"><span class="status-pill status-${order.status || 'new'}">${capitalizeFirstLetter(order.status || 'new')}</span></div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Customer:</div>
              <div class="detail-value">${order.name}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Phone:</div>
              <div class="detail-value">${formatPhone(order.phone)}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Email:</div>
              <div class="detail-value">${emailDisplay}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Quantity:</div>
              <div class="detail-value">${order.quantity} bottle${order.quantity > 1 ? 's' : ''}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Address:</div>
              <div class="detail-value">${order.address}</div>
          </div>
          <div class="order-detail-row">
              <div class="detail-label">Notes:</div>
              <div class="detail-value">${notesDisplay}</div>
          </div>
      `;
  }

  // Update order status
  function updateOrderStatus() {
      if (!currentOrderId) return;
      
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      const newStatus = updateStatusSelect.value;
      
      user.jwt().then(token => {
          fetch('/.netlify/functions/update-order', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: currentOrderId,
                  status: newStatus
              })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              alert('Order status updated successfully');
              orderDetailsModal.style.display = 'none';
              loadOrders(); // Refresh the orders list
          })
          .catch(error => {
              console.error('Error updating order:', error);
              alert(`Error updating order: ${error.message}`);
          });
      });
  }

  // Delete order
  function deleteOrder(orderId) {
      if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
          return;
      }
      
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      user.jwt().then(token => {
          fetch('/.netlify/functions/delete-order', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: orderId
              })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              alert('Order deleted successfully');
              loadOrders(); // Refresh the orders list
          })
          .catch(error => {
              console.error('Error deleting order:', error);
              alert(`Error deleting order: ${error.message}`);
          });
      });
  }
  
  // ==================== TENANT MANAGEMENT FUNCTIONS ====================
  
  // Initialize customer data
  async function initializeCustomersData() {
      const user = netlifyIdentity.currentUser();
      if (!user) return false;
      
      try {
          const token = await user.jwt();
          const response = await fetch('/.netlify/functions/init-customers', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          
          if (!response.ok) {
              console.warn('Failed to initialize customers data:', response.status);
              return false;
          }
          
          const data = await response.json();
          console.log('Customers data initialized:', data);
          return true;
      } catch (error) {
          console.error('Error initializing customers data:', error);
          return false;
      }
  }

  // Load tenants from API
  function loadTenants() {
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      const tenantsDataElement = document.getElementById('tenants-data');
      const loadingIndicator = document.getElementById('loading-tenants');
      
      // Show loading state
      if (tenantsDataElement) tenantsDataElement.innerHTML = '';
      if (loadingIndicator) loadingIndicator.style.display = 'flex';
      
      // Get filter values
      const groupFilter = document.getElementById('group-filter')?.value || 'all';
      const searchTerm = document.getElementById('tenant-search')?.value || '';
      
      user.jwt().then(token => {
          // Build query string
          let queryParams = new URLSearchParams();
          if (groupFilter !== 'all') {
              queryParams.set('group', groupFilter);
          }
          if (searchTerm) {
              queryParams.set('search', searchTerm);
          }
          
          // Make API call
          fetch(`/.netlify/functions/get-tenants?${queryParams.toString()}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              displayTenants(data.tenants);
              if (loadingIndicator) loadingIndicator.style.display = 'none';
          })
          .catch(error => {
              console.error('Error loading tenants:', error);
              if (loadingIndicator) loadingIndicator.style.display = 'none';
              if (tenantsDataElement) tenantsDataElement.innerHTML = `<tr><td colspan="6" class="error-message">Error: ${error.message}</td></tr>`;
          });
      });
  }

  // Display tenants in the table
  function displayTenants(tenants) {
      const tenantsDataElement = document.getElementById('tenants-data');
      if (!tenantsDataElement) return;
      
      if (!tenants || tenants.length === 0) {
          tenantsDataElement.innerHTML = '<tr><td colspan="6">No tenants found</td></tr>';
          return;
      }
      
      // Sort by ID
      tenants.sort((a, b) => a.id.localeCompare(b.id));
      
      // Generate table rows
      tenantsDataElement.innerHTML = '';
      
      tenants.forEach(tenant => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${tenant.id}</td>
              <td>${tenant.name}</td>
              <td>${tenant.phone}</td>
              <td>${tenant.previousBalance || '-'}</td>
              <td>${tenant.balance}</td>
              <td>
                  <button class="action-btn edit-btn" data-id="${tenant.id}">
                      <i class="fas fa-edit"></i> Edit
                  </button>
              </td>
          `;
          tenantsDataElement.appendChild(row);
      });
      
      // Add event listeners for edit buttons
      document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', () => editTenant(button.getAttribute('data-id')));
      });
  }

  // Show tenant edit modal
  function editTenant(tenantId) {
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      user.jwt().then(token => {
          fetch(`/.netlify/functions/get-tenant?id=${tenantId}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              if (data.tenant) {
                  showTenantEditModal(data.tenant);
              } else {
                  alert('Tenant not found');
              }
          })
          .catch(error => {
              console.error('Error fetching tenant details:', error);
              alert(`Error: ${error.message}`);
          });
      });
  }

  // Create and show tenant edit modal
  function showTenantEditModal(tenant) {
      // Remove any existing modal
      const existingModal = document.getElementById('tenant-edit-modal');
      if (existingModal) {
          document.body.removeChild(existingModal);
      }
      
      // Create modal HTML
      const modalHtml = `
          <div id="tenant-edit-modal" class="modal">
              <div class="modal-content">
                  <span class="close-modal">&times;</span>
                  <h3>Edit Tenant: ${tenant.name}</h3>
                  
                  <div class="form-group">
                      <label>Tenant ID:</label>
                      <input type="text" id="edit-tenant-id" value="${tenant.id}" disabled>
                  </div>
                  
                  <div class="form-group">
                      <label>Name:</label>
                      <input type="text" id="edit-tenant-name" value="${tenant.name}" disabled>
                  </div>
                  
                  <div class="form-group">
                      <label>Phone:</label>
                      <input type="text" id="edit-tenant-phone" value="${tenant.phone}" disabled>
                  </div>
                  
                  <div class="form-group">
                      <label>Previous Balance:</label>
                      <input type="text" id="edit-tenant-previous" value="${tenant.previousBalance || tenant.balance}" disabled>
                  </div>
                  
                  <div class="form-group">
                      <label>Current Balance:</label>
                      <input type="number" id="edit-tenant-balance" value="${tenant.balance}">
                  </div>
                  
                  <button id="save-tenant-btn" class="save-btn">Save Changes</button>
              </div>
          </div>
      `;
      
      // Add modal to page
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      
      const modal = document.getElementById('tenant-edit-modal');
      const closeBtn = modal.querySelector('.close-modal');
      const saveBtn = document.getElementById('save-tenant-btn');
      
      // Show modal
      modal.style.display = 'block';
      
      // Close modal when clicking X
      closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
      });
      
      // Close modal when clicking outside
      window.addEventListener('click', function(event) {
          if (event.target === modal) {
              document.body.removeChild(modal);
          }
      });
      
      // Save button functionality
      saveBtn.addEventListener('click', () => {
          const newBalance = document.getElementById('edit-tenant-balance').value;
          
          if (!newBalance || isNaN(newBalance)) {
              alert('Please enter a valid balance amount');
              return;
          }
          
          updateTenantBalance(tenant.id, parseFloat(newBalance), modal);
      });
  }

  // Update tenant balance
  function updateTenantBalance(tenantId, newBalance, modal) {
      const user = netlifyIdentity.currentUser();
      if (!user) return;
      
      user.jwt().then(token => {
          fetch('/.netlify/functions/update-tenant-bill', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  tenantId,
                  newBalance
              })
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Server responded with status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              alert('Tenant balance updated successfully');
              document.body.removeChild(modal);
              loadTenants(); // Refresh the list
          })
          .catch(error => {
              console.error('Error updating tenant:', error);
              alert(`Error: ${error.message}`);
          });
      });
  }

// Helper function: Format phone number
function formatPhone(phone) {
  if (!phone) return '';
  
  // Handle Kenyan numbers
  if (phone.startsWith('254')) {
      return '+' + phone.substring(0, 3) + ' ' + phone.substring(3);
  } else if (phone.startsWith('0')) {
      return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return phone;
}

// Helper function: Truncate text with ellipsis
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Helper function: Capitalize first letter
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}
});