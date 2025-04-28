// Configuration
const appConfig = {
    // Set to false when your Netlify function is ready
    testMode: false,
    
    // API endpoint for production - Update with your Netlify function URL
    apiEndpoint: 'https://your-site-name.netlify.app/api/create-order',
    
    // Simulated response delay in milliseconds (for test mode)
    testDelay: 1500
};

// Phone number formatting for Kenyan numbers
document.getElementById('phone').addEventListener('input', function (e) {
    // Remove any non-digit characters
    let input = e.target.value.replace(/\D/g, '');
    
    // Handle Kenyan phone numbers (formats like 07xx, 01xx, 254xxx)
    if (input.startsWith('254')) {
        // Format as 254 7xx xxx xxx
        let x = input.match(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,3})/);
        e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
    } else if (input.startsWith('0')) {
        // Format as 07xx xxx xxx
        let x = input.match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
        e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
    } else {
        // For other formats, just group digits
        let x = input.match(/(\d{0,4})(\d{0,3})(\d{0,3})/);
        e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '');
    }
});

// Remove pattern attribute and just set placeholder
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    // Remove the pattern attribute entirely
    phoneInput.removeAttribute('pattern');
    phoneInput.setAttribute('placeholder', '0722 123 456 or 254722 123 456');
});

// Geolocation function without Google Maps dependency
function getLocation() {
    const status = document.getElementById('locationStatus');
    const addressField = document.getElementById('address');
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
        status.style.color = '#e74c3c';
        return;
    }

    status.textContent = 'Locating...';
    status.style.color = '#3498db'; // Info color
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Get coordinates
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Use coordinates directly since we don't have Google Maps for geocoding
            addressField.value = `Location Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            // Try to use a free reverse geocoding service if available
            tryReverseGeocode(latitude, longitude, addressField, status);
            
            // Set success status
            status.textContent = 'Location coordinates captured successfully!';
            status.style.color = '#27ae60'; // Success color
        },
        (error) => {
            handleLocationError(error, status);
        },
        { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0 
        }
    );
}

// Optional: Try to use a free reverse geocoding service
function tryReverseGeocode(latitude, longitude, addressField, statusElement) {
    // Using OpenStreetMap Nominatim API (free but has usage limits)
    // Be sure to add proper attribution if you use this in production
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    
    fetch(url, {
        headers: {
            // Add a user agent as required by Nominatim's usage policy
            'User-Agent': 'SalangWaterRefillApp/1.0'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Geocoding service unavailable');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.display_name) {
            // Success - we have an address
            addressField.value = data.display_name;
            statusElement.textContent = 'Address found successfully!';
            statusElement.style.color = '#27ae60'; // Success color
        } else {
            throw new Error('No address found');
        }
    })
    .catch(error => {
        console.warn('Could not get address from coordinates:', error);
        // Keep the coordinates as fallback - we already set this value earlier
        statusElement.textContent += ' (Address lookup unavailable)';
        statusElement.style.color = '#f39c12'; // Warning color
    });
}

// Helper function to handle location errors
function handleLocationError(error, statusElement) {
    statusElement.style.color = '#e74c3c'; // Error color
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            statusElement.textContent = 'Location access denied. Please enable location services.';
            break;
        case error.POSITION_UNAVAILABLE:
            statusElement.textContent = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            statusElement.textContent = 'Location request timed out.';
            break;
        default:
            statusElement.textContent = 'Unknown error occurred while getting location.';
            break;
    }
    console.error(error);
}

// Improved form validation function for phone numbers
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phoneWithSpaces = document.getElementById('phone').value;
    const phone = phoneWithSpaces.replace(/\D/g, ''); // Remove non-digits
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value.trim();
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate name
    if (name === '') {
        errorMessage = 'Please enter your full name.';
        isValid = false;
    }
    
    // Validate phone (must be at least 10 digits and start with 0 or 254)
    else if (phone.length < 10 || !(phone.startsWith('0') || phone.startsWith('254'))) {
        errorMessage = 'Please enter a valid Kenyan phone number starting with 0 or 254.';
        isValid = false;
    }
    
    // Validate quantity
    else if (quantity === '') {
        errorMessage = 'Please select the number of bottles.';
        isValid = false;
    }
    
    // Validate address
    else if (address === '') {
        errorMessage = 'Please enter your delivery address.';
        isValid = false;
    }
    
    // Display error message if validation fails
    if (!isValid) {
        alert(errorMessage);
    }
    
    return isValid;
}

// Modal functions
function showModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal() {
    // Close all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside of modal content
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return; // Stop if validation fails
    }
    
    // Show loading modal
    showModal('loadingModal');
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.replace(/\D/g, ''), // Remove spaces and formatting
        email: document.getElementById('email').value.trim(),
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('address').value.trim(),
        notes: document.getElementById('notes').value.trim()
    };
    
    // Format phone number for backend
    if (formData.phone.startsWith('0')) {
        // Convert 07xx to 2547xx format
        formData.phone = '254' + formData.phone.substring(1);
    }
    
    if (appConfig.testMode) {
        // Simulate server response in test mode
        console.log('Test mode active - Form data:', formData);
        
        setTimeout(() => {
            console.log('Test mode - Order simulated successfully');
            
            // Hide loading and show confirmation
            closeModal();
            showModal('confirmationModal');
            
            // Reset form
            document.getElementById('orderForm').reset();
        }, appConfig.testDelay);
    } else {
        // Real API call for production
        fetch(appConfig.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            
            // Hide loading and show confirmation
            closeModal();
            showModal('confirmationModal');
            
            // Reset form
            document.getElementById('orderForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Hide loading modal
            closeModal();
            
            // Show error message
            alert(`There was an error submitting your order: ${error.message}`);
        });
    }
}

// Add event listener to form
document.getElementById('orderForm').addEventListener('submit', handleFormSubmission);