// Phone number formatting
document.getElementById('phone').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Geolocation function
function getLocation() {
    const status = document.getElementById('locationStatus');
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
        return;
    }

    status.textContent = 'Locating...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // In a real app, you would reverse geocode these coordinates
            // For demo purposes, we'll just show the coordinates
            status.textContent = `Location detected: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            // Add coordinates to address field
            const addressField = document.getElementById('address');
            addressField.value = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}\n${addressField.value}`;
        },
        (error) => {
            status.textContent = 'Unable to retrieve location';
            console.error(error);
        }
    );
}

// Form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value
    };
    
    // In a real application, you would send this data to your backend
    console.log('Order submitted:', formData);
    
    // Show confirmation modal
    document.getElementById('confirmationModal').style.display = 'flex';
    
    // Reset form
    this.reset();
});

// Close modal function
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}