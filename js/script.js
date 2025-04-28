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

// Update the HTML pattern attribute for the phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    phoneInput.setAttribute('pattern', '(254|0)[0-9]{9}');
    phoneInput.setAttribute('placeholder', '0722 123 456 or 254722 123 456');
});

// Geolocation function
function getLocation() {
    const status = document.getElementById('locationStatus');
    const addressField = document.getElementById('address');
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
        return;
    }

    status.textContent = 'Locating...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Use Google Maps Geocoding API to get the address
            const geocoder = new google.maps.Geocoder();
            const latlng = {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            };
            
            geocoder.geocode({ 'location': latlng }, function(results, geocodeStatus) {
                if (geocodeStatus === 'OK') {
                    if (results[0]) {
                        // Get the formatted address
                        const formattedAddress = results[0].formatted_address;
                        addressField.value = formattedAddress;
                        status.textContent = 'Location found successfully!';
                        status.style.color = '#27ae60';
                    } else {
                        status.textContent = 'No address found for this location';
                        status.style.color = '#e74c3c';
                    }
                } else {
                    status.textContent = 'Could not convert coordinates to address';
                    status.style.color = '#e74c3c';
                    // Fallback to coordinates
                    addressField.value = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
                }
            });
        },
        (error) => {
            status.textContent = 'Unable to retrieve location: ' + error.message;
            status.style.color = '#e74c3c';
            console.error(error);
        }
    );
}

// Form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value.replace(/\D/g, ''), // Remove spaces and formatting
        email: document.getElementById('email').value,
        quantity: document.getElementById('quantity').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value
    };
    
    // Format phone number for backend
    if (formData.phone.startsWith('0')) {
        // Convert 07xx to 2547xx format
        formData.phone = '254' + formData.phone.substring(1);
    }
    
    // Send data to backend
    fetch('https://yourdomain.com/api/create-order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        
        // Show confirmation modal
        document.getElementById('confirmationModal').style.display = 'flex';
        
        // Reset form
        document.getElementById('orderForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        alert('There was an error submitting your order. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});