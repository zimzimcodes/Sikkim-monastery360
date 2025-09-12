// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tourButtons = document.querySelectorAll('.tour-btn');
const modal = document.getElementById('tour-modal');
const closeModal = document.querySelector('.close');
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const bookingForm = document.getElementById('booking-form');
const eventButtons = document.querySelectorAll('.event-btn');

// Global Variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Monastery Showcase Carousel
const monasteryCards = document.querySelectorAll('.monastery-card');
let currentMonasteryIndex = 0;

function showNextMonastery() {
    monasteryCards[currentMonasteryIndex].classList.remove('active');
    currentMonasteryIndex = (currentMonasteryIndex + 1) % monasteryCards.length;
    monasteryCards[currentMonasteryIndex].classList.add('active');
}

// Auto-rotate monastery showcase
setInterval(showNextMonastery, 4000);

// Virtual Tour Modal
tourButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const tourType = button.getAttribute('data-tour');
        openTourModal(tourType);
    });
});

function openTourModal(tourType) {
    const tourTitle = document.getElementById('tour-title');
    const tourInfoPanel = document.getElementById('tour-info-panel');
    
    // Set tour title based on type
    const tourTitles = {
        'rumtek': 'Rumtek Monastery Virtual Tour',
        'pemayangtse': 'Pemayangtse Monastery Virtual Tour',
        'tashiding': 'Tashiding Monastery Virtual Tour'
    };
    
    tourTitle.textContent = tourTitles[tourType] || 'Virtual Tour';
    
    // Set tour information
    const tourInfo = {
        'rumtek': `
            <h4>Rumtek Monastery</h4>
            <p>The Rumtek Monastery, also known as the Dharma Chakra Centre, is a Tibetan Buddhist monastery located in the Indian state of Sikkim. It is the seat of the Karmapa lineage and one of the most important monasteries in the Kagyu tradition.</p>
            <h5>Key Features:</h5>
            <ul>
                <li>Golden Stupa containing relics of the 16th Karmapa</li>
                <li>Main prayer hall with intricate murals</li>
                <li>Monastery library with ancient texts</li>
                <li>Meditation halls for monks</li>
            </ul>
            <p><strong>Click on hotspots</strong> to explore different areas and learn more about the monastery's history and significance.</p>
        `,
        'pemayangtse': `
            <h4>Pemayangtse Monastery</h4>
            <p>Pemayangtse Monastery is one of the oldest and most important monasteries in Sikkim. It belongs to the Nyingma tradition and is known for its beautiful architecture and spiritual significance.</p>
            <h5>Key Features:</h5>
            <ul>
                <li>Sanghthok Palace with seven-tiered structure</li>
                <li>Ancient murals and thangkas</li>
                <li>Prayer wheels and chortens</li>
                <li>Sacred relics and artifacts</li>
            </ul>
            <p><strong>Click on hotspots</strong> to discover the monastery's rich history and spiritual treasures.</p>
        `,
        'tashiding': `
            <h4>Tashiding Monastery</h4>
            <p>Tashiding Monastery is a sacred site located on a hilltop, known for its spiritual significance and beautiful natural surroundings. It is an important pilgrimage destination for Buddhists.</p>
            <h5>Key Features:</h5>
            <ul>
                <li>Sacred chortens and prayer wheels</li>
                <li>Panoramic views of the Himalayas</li>
                <li>Ancient stupas and monuments</li>
                <li>Peaceful meditation areas</li>
            </ul>
            <p><strong>Click on hotspots</strong> to explore the sacred grounds and learn about the monastery's spiritual importance.</p>
        `
    };
    
    tourInfoPanel.innerHTML = tourInfo[tourType] || '<p>Tour information will be displayed here.</p>';
    
    // Simulate loading virtual tour
    const panoramaView = document.getElementById('panorama-view');
    panoramaView.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading virtual tour...</p>
        </div>
    `;
    
    // Simulate tour loading
    setTimeout(() => {
        panoramaView.innerHTML = `
            <div class="virtual-tour-placeholder">
                <div class="tour-controls-overlay">
                    <div class="hotspot" style="top: 30%; left: 20%;" data-info="Golden Stupa">
                        <div class="hotspot-marker"></div>
                    </div>
                    <div class="hotspot" style="top: 60%; right: 25%;" data-info="Prayer Hall">
                        <div class="hotspot-marker"></div>
                    </div>
                    <div class="hotspot" style="bottom: 30%; left: 50%;" data-info="Meditation Area">
                        <div class="hotspot-marker"></div>
                    </div>
                </div>
                <div class="tour-instructions">
                    <p>🖱️ Click and drag to explore the 360° view</p>
                    <p>📍 Click on hotspots for more information</p>
                </div>
            </div>
        `;
        
        // Add hotspot functionality
        const hotspots = document.querySelectorAll('.hotspot');
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', () => {
                const info = hotspot.getAttribute('data-info');
                showHotspotInfo(info);
            });
        });
    }, 2000);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showHotspotInfo(info) {
    const tourInfoPanel = document.getElementById('tour-info-panel');
    const hotspotInfo = {
        'Golden Stupa': 'The Golden Stupa contains sacred relics and is the most revered structure in the monastery. It represents the enlightened mind of the Buddha.',
        'Prayer Hall': 'The main prayer hall is where monks gather for daily prayers and ceremonies. The walls are adorned with beautiful murals depicting Buddhist teachings.',
        'Meditation Area': 'This peaceful area is used for individual meditation practice. The serene environment helps practitioners focus on their spiritual development.'
    };
    
    tourInfoPanel.innerHTML = `
        <h4>${info}</h4>
        <p>${hotspotInfo[info] || 'Information about this area will be displayed here.'}</p>
        <button onclick="document.getElementById('tour-info-panel').innerHTML = tourInfoPanel.innerHTML" class="btn btn-secondary">Back to Tour Info</button>
    `;
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fullscreen functionality
document.getElementById('fullscreen').addEventListener('click', () => {
    const panoramaView = document.getElementById('panorama-view');
    if (panoramaView.requestFullscreen) {
        panoramaView.requestFullscreen();
    }
});

// Calendar Functionality
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const events = {
    2024: {
        1: { 15: 'Losar Festival', 22: 'Buddha Purnima' },
        2: { 8: 'Saga Dawa', 15: 'Monastery Tour' },
        3: { 10: 'Prayer Ceremony', 25: 'Cultural Event' },
        4: { 5: 'Meditation Retreat', 18: 'Heritage Walk' },
        5: { 12: 'Festival Celebration', 28: 'Monk Ceremony' },
        6: { 8: 'Spiritual Gathering', 20: 'Monastery Visit' },
        7: { 15: 'Rain Retreat', 30: 'Cultural Program' },
        8: { 10: 'Monk Ordination', 22: 'Festival Event' },
        9: { 5: 'Prayer Session', 18: 'Heritage Tour' },
        10: { 12: 'Meditation Workshop', 25: 'Cultural Festival' },
        11: { 8: 'Monastery Ceremony', 20: 'Spiritual Retreat' },
        12: { 15: 'Year-end Celebration', 28: 'New Year Preparation' }
    }
};

function generateCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.background = 'var(--primary-red)';
        dayHeader.style.color = 'var(--white)';
        dayHeader.style.fontWeight = 'bold';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if today
        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Check if has event
        if (events[currentYear] && events[currentYear][currentMonth + 1] && events[currentYear][currentMonth + 1][day]) {
            dayElement.classList.add('has-event');
            dayElement.title = events[currentYear][currentMonth + 1][day];
        }
        
        dayElement.addEventListener('click', () => {
            if (events[currentYear] && events[currentYear][currentMonth + 1] && events[currentYear][currentMonth + 1][day]) {
                showEventDetails(events[currentYear][currentMonth + 1][day], day, currentMonth + 1, currentYear);
            }
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function showEventDetails(eventName, day, month, year) {
    alert(`Event: ${eventName}\nDate: ${day}/${month}/${year}\n\nClick "Set Reminder" on the event card below to get notified about this event.`);
}

// Calendar navigation
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

// Initialize calendar
generateCalendar();

// Itinerary Tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Gallery Filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Booking Form
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const bookingData = {
        type: document.getElementById('booking-type').value,
        monastery: document.getElementById('monastery').value,
        date: document.getElementById('visit-date').value,
        groupSize: document.getElementById('group-size').value,
        requests: document.getElementById('special-requests').value,
        email: document.getElementById('contact-info').value
    };
    
    // Simulate booking process
    showBookingConfirmation(bookingData);
});

function showBookingConfirmation(data) {
    const confirmationMessage = `
        <div class="booking-confirmation">
            <h3>Booking Confirmation</h3>
            <p>Thank you for your booking request!</p>
            <div class="booking-details">
                <p><strong>Experience:</strong> ${data.type}</p>
                <p><strong>Monastery:</strong> ${data.monastery}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Group Size:</strong> ${data.groupSize}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            </div>
            <p>We will contact you within 24 hours to confirm your booking and provide payment details.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Close</button>
        </div>
    `;
    
    const confirmationDiv = document.createElement('div');
    confirmationDiv.innerHTML = confirmationMessage;
    confirmationDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 3000;
        max-width: 500px;
        width: 90%;
    `;
    
    document.body.appendChild(confirmationDiv);
    bookingForm.reset();
}

// Event Reminder Buttons
eventButtons.forEach(button => {
    button.addEventListener('click', () => {
        const eventCard = button.closest('.event-card');
        const eventName = eventCard.querySelector('h4').textContent;
        const eventDate = eventCard.querySelector('.day').textContent;
        const eventMonth = eventCard.querySelector('.month').textContent;
        
        // Simulate setting reminder
        button.textContent = 'Reminder Set!';
        button.style.background = 'var(--gradient-primary)';
        
        setTimeout(() => {
            button.textContent = 'Set Reminder';
            button.style.background = 'var(--gradient-gold)';
        }, 2000);
        
        alert(`Reminder set for ${eventName} on ${eventDate} ${eventMonth}!`);
    });
});

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add CSS for virtual tour placeholder
const style = document.createElement('style');
style.textContent = `
    .virtual-tour-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: var(--text-light);
    }
    
    .tour-controls-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .hotspot {
        position: absolute;
        width: 30px;
        height: 30px;
        cursor: pointer;
        z-index: 10;
    }
    
    .hotspot-marker {
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 50%;
        border: 3px solid var(--white);
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .tour-instructions {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        font-size: 0.9rem;
    }
    
    .tour-instructions p {
        margin: 0.5rem 0;
    }
    
    .booking-confirmation {
        text-align: center;
    }
    
    .booking-confirmation h3 {
        color: var(--primary-red);
        margin-bottom: 1rem;
    }
    
    .booking-details {
        background: var(--light-gold);
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        text-align: left;
    }
    
    .booking-details p {
        margin: 0.5rem 0;
    }
    
    .calendar-day-header {
        padding: 1rem;
        text-align: center;
        font-weight: bold;
        background: var(--primary-red);
        color: var(--white);
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Monastery360 - Digital Heritage Platform loaded successfully!');
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.tour-card, .transport-card, .event-card, .gallery-item');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize tooltips for calendar events
    const calendarDays = document.querySelectorAll('.calendar-day.has-event');
    calendarDays.forEach(day => {
        day.addEventListener('mouseenter', () => {
            const eventName = day.title;
            if (eventName) {
                // You could add a custom tooltip here
            }
        });
    });
});
