// Kampamba House - Booking System with Google Calendar Integration

// Configuration - UPDATE THESE VALUES
const GOOGLE_CALENDAR_CONFIG = {
    apiKey: 'YOUR_GOOGLE_API_KEY', // Replace with your Google API key
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com', // Replace with your Google Calendar ID
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scopes: 'https://www.googleapis.com/auth/calendar.readonly'
};

// Pricing information
const PRICING = {
    'hillview-double': 2000,
    'hillview-studio': 1500,
    'glamping': 1200,
    'wine-private': 1000,
    'wine-public': 1000,
    'photoshoot': 500,
    'hiking': 200
};

let calendar;
let bookedDates = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    initializeCalendar();
    loadGoogleCalendarAPI();
});

// Initialize booking form interactions
function initializeBookingForm() {
    const bookingType = document.getElementById('bookingType');
    const accommodationGroup = document.getElementById('accommodationGroup');
    const checkOutGroup = document.getElementById('checkOutGroup');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');

    // Show/hide fields based on booking type
    if (bookingType) {
        bookingType.addEventListener('change', function() {
            const value = this.value;

            if (value === 'accommodation') {
                accommodationGroup.style.display = 'block';
                checkOutGroup.style.display = 'block';
                document.getElementById('accommodation').required = true;
                checkOutInput.required = true;
            } else {
                accommodationGroup.style.display = 'none';
                checkOutGroup.style.display = 'none';
                document.getElementById('accommodation').required = false;
                checkOutInput.required = false;
            }

            updateBookingSummary();
        });
    }

    // Update summary when dates change
    if (checkInInput) {
        checkInInput.addEventListener('change', function() {
            // Set minimum checkout date to day after check-in
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.setDate() + 1);
            checkOutInput.min = checkInDate.toISOString().split('T')[0];

            updateBookingSummary();
            checkAvailability();
        });
    }

    if (checkOutInput) {
        checkOutInput.addEventListener('change', function() {
            updateBookingSummary();
            checkAvailability();
        });
    }

    // Update summary when accommodation changes
    const accommodationSelect = document.getElementById('accommodation');
    if (accommodationSelect) {
        accommodationSelect.addEventListener('change', updateBookingSummary);
    }

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
}

// Initialize FullCalendar
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');

    if (calendarEl && typeof FullCalendar !== 'undefined') {
        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
            },
            selectable: true,
            selectMirror: true,
            height: 'auto',
            events: [],
            eventColor: '#dc3545',
            eventDisplay: 'background',
            select: function(info) {
                document.getElementById('checkIn').value = info.startStr;
                if (info.end) {
                    const endDate = new Date(info.end);
                    endDate.setDate(endDate.getDate() - 1);
                    document.getElementById('checkOut').value = endDate.toISOString().split('T')[0];
                }
                updateBookingSummary();
            }
        });

        calendar.render();
    }
}

// Load Google Calendar API
function loadGoogleCalendarAPI() {
    gapi.load('client', initializeGoogleCalendar);
}

// Initialize Google Calendar
async function initializeGoogleCalendar() {
    try {
        await gapi.client.init({
            apiKey: GOOGLE_CALENDAR_CONFIG.apiKey,
            discoveryDocs: GOOGLE_CALENDAR_CONFIG.discoveryDocs
        });

        // Fetch events from Google Calendar
        await fetchCalendarEvents();
    } catch (error) {
        console.error('Error initializing Google Calendar:', error);
        // Calendar will still work, just won't show Google Calendar events
        showMessage('Calendar loaded. Note: Live availability sync is not configured yet.', 'info');
    }
}

// Fetch events from Google Calendar
async function fetchCalendarEvents() {
    try {
        const response = await gapi.client.calendar.events.list({
            calendarId: GOOGLE_CALENDAR_CONFIG.calendarId,
            timeMin: new Date().toISOString(),
            timeMax: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime'
        });

        const events = response.result.items || [];
        bookedDates = events;

        // Add events to calendar
        if (calendar) {
            const calendarEvents = events.map(event => ({
                title: 'Booked',
                start: event.start.date || event.start.dateTime,
                end: event.end.date || event.end.dateTime,
                display: 'background',
                backgroundColor: '#dc3545'
            }));

            calendar.removeAllEvents();
            calendar.addEventSource(calendarEvents);
        }
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        // Continue without Google Calendar events
    }
}

// Check availability for selected dates
function checkAvailability() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    if (!checkIn) return;

    const startDate = new Date(checkIn);
    const endDate = checkOut ? new Date(checkOut) : startDate;

    // Check if any booked dates overlap with selected dates
    let isAvailable = true;
    for (let event of bookedDates) {
        const eventStart = new Date(event.start.date || event.start.dateTime);
        const eventEnd = new Date(event.end.date || event.end.dateTime);

        if ((startDate >= eventStart && startDate < eventEnd) ||
            (endDate > eventStart && endDate <= eventEnd) ||
            (startDate <= eventStart && endDate >= eventEnd)) {
            isAvailable = false;
            break;
        }
    }

    // Show availability message
    const summaryDiv = document.getElementById('bookingSummary');
    if (summaryDiv && checkIn) {
        const availabilityMsg = isAvailable
            ? '<p style="color: #28a745; font-weight: 500;">✓ Selected dates appear to be available</p>'
            : '<p style="color: #dc3545; font-weight: 500;">✗ Selected dates may not be available. We will confirm upon receiving your request.</p>';

        const currentContent = document.getElementById('summaryContent').innerHTML;
        if (!currentContent.includes('available')) {
            document.getElementById('summaryContent').innerHTML += availabilityMsg;
        }
    }
}

// Update booking summary
function updateBookingSummary() {
    const bookingType = document.getElementById('bookingType').value;
    const accommodation = document.getElementById('accommodation').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    if (!bookingType || !checkIn) {
        document.getElementById('bookingSummary').style.display = 'none';
        return;
    }

    let summaryHTML = '<div style="line-height: 2;">';

    // Calculate total based on booking type
    let total = 0;
    let nights = 0;

    if (bookingType === 'accommodation' && accommodation && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        if (nights > 0) {
            const pricePerNight = PRICING[accommodation];
            total = pricePerNight * nights;

            const cottageName = document.getElementById('accommodation').selectedOptions[0].text.split(' - ')[0];
            summaryHTML += `<p><strong>Accommodation:</strong> ${cottageName}</p>`;
            summaryHTML += `<p><strong>Check-in:</strong> ${formatDate(checkIn)}</p>`;
            summaryHTML += `<p><strong>Check-out:</strong> ${formatDate(checkOut)}</p>`;
            summaryHTML += `<p><strong>Nights:</strong> ${nights}</p>`;
            summaryHTML += `<p><strong>Rate:</strong> K${pricePerNight.toLocaleString()}/night</p>`;
        }
    } else if (bookingType === 'wine-private') {
        const guests = parseInt(adults) + parseInt(children || 0);
        total = PRICING['wine-private'] * guests;
        summaryHTML += `<p><strong>Experience:</strong> Private Wine Tasting</p>`;
        summaryHTML += `<p><strong>Date:</strong> ${formatDate(checkIn)}</p>`;
        summaryHTML += `<p><strong>Guests:</strong> ${guests}</p>`;
        summaryHTML += `<p><strong>Rate:</strong> K${PRICING['wine-private'].toLocaleString()}/person</p>`;
        if (guests < 8) {
            summaryHTML += `<p style="color: #dc3545; margin-top: 1rem;"><strong>Note:</strong> Minimum 8 people required for private wine tasting</p>`;
        }
    } else if (bookingType === 'wine-public') {
        const guests = parseInt(adults) + parseInt(children || 0);
        total = PRICING['wine-public'] * guests;
        summaryHTML += `<p><strong>Experience:</strong> Public Wine Tasting Event</p>`;
        summaryHTML += `<p><strong>Date:</strong> ${formatDate(checkIn)}</p>`;
        summaryHTML += `<p><strong>Guests:</strong> ${guests}</p>`;
        summaryHTML += `<p><strong>Rate:</strong> K${PRICING['wine-public'].toLocaleString()}/person</p>`;
    } else if (bookingType === 'photoshoot') {
        total = PRICING['photoshoot'];
        summaryHTML += `<p><strong>Experience:</strong> Photoshoot Session</p>`;
        summaryHTML += `<p><strong>Date:</strong> ${formatDate(checkIn)}</p>`;
        summaryHTML += `<p><strong>Duration:</strong> 3 hours</p>`;
    }

    // Add guests info if accommodation
    if (bookingType === 'accommodation') {
        summaryHTML += `<p><strong>Guests:</strong> ${adults} adult(s)`;
        if (children > 0) summaryHTML += `, ${children} child(ren)`;
        summaryHTML += `</p>`;
    }

    // Add total
    if (total > 0) {
        const deposit = total * 0.5;
        summaryHTML += `<hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--light-brown);">`;
        summaryHTML += `<p><strong style="font-size: 1.2rem;">Total:</strong> <strong style="font-size: 1.2rem; color: var(--medium-brown);">K${total.toLocaleString()}</strong></p>`;
        summaryHTML += `<p style="font-size: 0.95rem; color: var(--text-light);">50% Deposit Required: K${deposit.toLocaleString()}</p>`;
    }

    summaryHTML += '</div>';

    document.getElementById('summaryContent').innerHTML = summaryHTML;
    document.getElementById('bookingSummary').style.display = 'block';
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate wine tasting minimum guests
    const bookingType = document.getElementById('bookingType').value;
    if (bookingType === 'wine-private') {
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value || 0);
        if ((adults + children) < 8) {
            showMessage('Private wine tasting requires a minimum of 8 people.', 'error');
            return;
        }
    }

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending request...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual backend API call)
    try {
        // In production, send data to your backend
        await simulateFormSubmission(data);

        // Show success message
        showMessage(
            'Booking request submitted successfully! We will confirm availability and contact you within 24 hours at ' + data.email,
            'success'
        );

        // Reset form
        e.target.reset();
        document.getElementById('bookingSummary').style.display = 'none';
        document.getElementById('accommodationGroup').style.display = 'none';

    } catch (error) {
        showMessage('An error occurred. Please try again or contact us directly.', 'error');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // In production, replace this with:
        // fetch('/api/booking', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        setTimeout(resolve, 1500);
    });
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.backgroundColor = type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1';
    messageDiv.style.color = type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460';
    messageDiv.style.border = `1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'}`;

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide after 10 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 10000);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
