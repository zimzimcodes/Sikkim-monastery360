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

// 360° panorama sources — paste your real iframe embed codes below
// Use full iframe embeds or direct src iframes (keep as strings)
const panoramaSources = {
	rumtek: {
		default: `<iframe src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noWi1qh5jxMZzabXbBqL2vsQd_A9N0RgJNoe0MMeKfOiROlmMXx1Rf5euDbotpEoRkW26k-MqvyzCdtjkRcGBlE0Ae-j81bUnjANKnKFj8izyOsExZoM1oYZ0sdJPvz5A6d7VA6eQ=s1360-w1360-h1020-rw" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'golden-stupa': `<iframe src="https://panoraven.com/en/embed/Fz2Jql4EEN
" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'prayer-hall': `<iframe src="https://panoraven.com/en/embed/Fz2Jql4EEN" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'meditation-area': `<iframe src="https://panoraven.com/en/embed/p4oPiL3aWE" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	},
	pemayangtse: {
		default: `<iframe src="PASTE_PEMAYANGTSE_MAIN_EMBED" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'main-hall': `<iframe src="https://panoraven.com/en/embed/bNdyKBHVou" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'sanghthok-palace': `<iframe src="https://panoraven.com/en/embed/Bo4868yjx7" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'chortens': `<iframe src="https://panoraven.com/en/embed/VI05vPsMt5" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	},
	tashiding: {
		default: `<iframe src="PASTE_TASHIDING_MAIN_EMBED" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'mani-stones': `<iframe src="https://panoraven.com/en/embed/vwmmwmDBKZ" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'chortens': `<iframe src="https://panoraven.com/en/embed/8aghUBWM9u" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'viewpoint': `<iframe src="https://panoraven.com/en/embed/MvFZBXLjm5" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	}
};

// Navigation Toggle
if (hamburger && navMenu) {
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		navMenu.classList.toggle('active');
	});
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		hamburger && hamburger.classList.remove('active');
		navMenu && navMenu.classList.remove('active');
	});
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		const targetId = link.getAttribute('href');
		if (targetId && targetId.startsWith('#')) {
			e.preventDefault();
			const targetSection = document.querySelector(targetId);
			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 80;
				window.scrollTo({ top: offsetTop, behavior: 'smooth' });
			}
		}
	});
});

// Monastery Showcase Carousel
const monasteryCards = document.querySelectorAll('.monastery-card');
let currentMonasteryIndex = 0;
function showNextMonastery() {
	if (monasteryCards.length === 0) return;
	monasteryCards[currentMonasteryIndex].classList.remove('active');
	currentMonasteryIndex = (currentMonasteryIndex + 1) % monasteryCards.length;
	monasteryCards[currentMonasteryIndex].classList.add('active');
}
if (monasteryCards.length > 1) {
	setInterval(showNextMonastery, 4000);
}

// Virtual Tour Modal
//
tourButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		const tourType = button.getAttribute('data-tour');
		openTourModal(tourType);
	});
});

function openTourModal(tourType) {
	if (!modal) return;
	const tourTitle = document.getElementById('tour-title');
	const tourInfoPanel = document.getElementById('tour-info-panel');
	const tourTitles = {
		rumtek: 'Rumtek Monastery Virtual Tour',
		pemayangtse: 'Pemayangtse Monastery Virtual Tour',
		tashiding: 'Tashiding Monastery Virtual Tour'
	};
	if (tourTitle) tourTitle.textContent = tourTitles[tourType] || 'Virtual Tour';
	const tourInfo = {
		rumtek: `
			<h4>Rumtek Monastery</h4>
			<p>The Rumtek Monastery, also known as the Dharma Chakra Centre, is a Tibetan Buddhist monastery in Sikkim. It is the seat of the Karmapa lineage and a key monastery of the Kagyu tradition.</p>
			<h5>Key Features:</h5>
			<ul>
				<li>Golden Stupa containing relics of the 16th Karmapa</li>
				<li>Main prayer hall with intricate murals</li>
				<li>Monastery library with ancient texts</li>
				<li>Meditation halls for monks</li>
			</ul>
			<p><strong>Click on hotspots</strong> to explore different areas and learn more.</p>
		`,
		pemayangtse: `
			<h4>Pemayangtse Monastery</h4>
			<p>One of Sikkim's oldest monasteries from the Nyingma tradition, renowned for its architecture and spiritual legacy.</p>
			<h5>Key Features:</h5>
			<ul>
				<li>Sanghthok Palace seven-tiered structure</li>
				<li>Ancient murals and thangkas</li>
				<li>Prayer wheels and chortens</li>
				<li>Sacred relics and artifacts</li>
			</ul>
			<p><strong>Click on hotspots</strong> to discover its treasures.</p>
		`,
		tashiding: `
			<h4>Tashiding Monastery</h4>
			<p>A revered hilltop monastery famed for its spiritual significance and panoramic Himalayan views.</p>
			<h5>Key Features:</h5>
			<ul>
				<li>Sacred chortens and prayer wheels</li>
				<li>Panoramic Himalayan vistas</li>
				<li>Ancient stupas and monuments</li>
				<li>Peaceful meditation areas</li>
			</ul>
			<p><strong>Click on hotspots</strong> to explore the sacred grounds.</p>
		`
	};
	if (tourInfoPanel) {
		tourInfoPanel.innerHTML = tourInfo[tourType] || '<p>Tour information will be displayed here.</p>';
	}
	const panoramaView = document.getElementById('panorama-view');
	if (panoramaView) {
		panoramaView.innerHTML = `
			<div class="loading-spinner">
				<i class="fas fa-spinner fa-spin"></i>
				<p>Loading virtual tour...</p>
			</div>
		`;
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
			const hotspots = document.querySelectorAll('.hotspot');
			hotspots.forEach(hotspot => {
				hotspot.addEventListener('click', () => {
					const info = hotspot.getAttribute('data-info');
					showHotspotInfo(info);
				});
			});
		}, 1200);
	}
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}

function showHotspotInfo(info) {
	const tourInfoPanel = document.getElementById('tour-info-panel');
	const hotspotInfo = {
		'Golden Stupa': 'The Golden Stupa holds sacred relics and is deeply revered. It symbolizes the enlightened mind of the Buddha.',
		'Prayer Hall': 'The main prayer hall hosts daily prayers and ceremonies with exquisite murals depicting Buddhist teachings.',
		'Meditation Area': 'A serene area for personal meditation practice, fostering focus and spiritual development.'
	};
	if (!tourInfoPanel) return;
	const baseInfoHtml = tourInfoPanel.innerHTML;
	tourInfoPanel.innerHTML = `
		<h4>${info}</h4>
		<p>${hotspotInfo[info] || 'Information about this area will be displayed here.'}</p>
		<button class="btn btn-secondary" id="back-to-tour-info">Back to Tour Info</button>
	`;
	const backBtn = document.getElementById('back-to-tour-info');
	if (backBtn) backBtn.addEventListener('click', () => { tourInfoPanel.innerHTML = baseInfoHtml; });
}

// Close modal
if (closeModal && modal) {
	closeModal.addEventListener('click', () => {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto';
	});
}
window.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.style.display = 'none';
		document.body.style.overflow = 'auto';
	}
});

// Fullscreen
const fullscreenBtn = document.getElementById('fullscreen');
if (fullscreenBtn) {
	fullscreenBtn.addEventListener('click', () => {
		const panoramaView = document.getElementById('panorama-view');
		if (panoramaView && panoramaView.requestFullscreen) panoramaView.requestFullscreen();
	});
}

// Calendar
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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
	if (!currentMonthElement || !calendarGrid) return;
	const firstDay = new Date(currentYear, currentMonth, 1);
	const lastDay = new Date(currentYear, currentMonth + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startingDay = firstDay.getDay();
	currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
	calendarGrid.innerHTML = '';
	['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
		const el = document.createElement('div');
		el.className = 'calendar-day-header';
		el.textContent = day;
		calendarGrid.appendChild(el);
	});
	for (let i = 0; i < startingDay; i++) {
		const empty = document.createElement('div');
		empty.className = 'calendar-day other-month';
		calendarGrid.appendChild(empty);
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const dayElement = document.createElement('div');
		dayElement.className = 'calendar-day';
		dayElement.textContent = day;
		const today = new Date();
		if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) dayElement.classList.add('today');
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
if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } generateCalendar(); });
if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } generateCalendar(); });
generateCalendar();

// Itinerary Tabs
tabButtons.forEach(button => {
	button.addEventListener('click', () => {
		const tabId = button.getAttribute('data-tab');
		tabButtons.forEach(btn => btn.classList.remove('active'));
		tabContents.forEach(content => content.classList.remove('active'));
		button.classList.add('active');
		const tabEl = document.getElementById(tabId);
		if (tabEl) tabEl.classList.add('active');
	});
});

// Gallery Filter
filterButtons.forEach(button => {
	button.addEventListener('click', () => {
		const filter = button.getAttribute('data-filter');
		filterButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
		galleryItems.forEach(item => {
			const category = item.getAttribute('data-category');
			item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
		});
	});
});

// Booking Form
if (bookingForm) {
	bookingForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const bookingData = {
			type: (document.getElementById('booking-type')).value || '',
			monastery: (document.getElementById('monastery')).value || '',
			date: (document.getElementById('visit-date')).value || '',
			groupSize: (document.getElementById('group-size')).value || '',
			requests: (document.getElementById('special-requests')).value || '',
			email: (document.getElementById('contact-info')).value || ''
		};
		showBookingConfirmation(bookingData);
		bookingForm.reset();
	});
}
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
			<div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
				<button id="close-booking-confirmation" class="btn btn-primary">Close</button>
			</div>
		</div>
	`;
	const confirmationDiv = document.createElement('div');
	confirmationDiv.innerHTML = confirmationMessage;
	confirmationDiv.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); z-index: 3000; max-width: 500px; width: 90%;`;
	document.body.appendChild(confirmationDiv);
	const closeBtn = document.getElementById('close-booking-confirmation');
	if (closeBtn) closeBtn.addEventListener('click', () => { confirmationDiv.remove(); });
}

// Event Reminder Buttons
eventButtons.forEach(button => {
	button.addEventListener('click', () => {
		const eventCard = button.closest('.event-card');
		if (!eventCard) return;
		const eventName = eventCard.querySelector('h4')?.textContent || 'Event';
		const eventDate = eventCard.querySelector('.day')?.textContent || '';
		const eventMonth = eventCard.querySelector('.month')?.textContent || '';
		button.textContent = 'Reminder Set!';
		button.style.background = 'var(--gradient-primary)';
		setTimeout(() => { button.textContent = 'Set Reminder'; button.style.background = 'var(--gradient-gold)'; }, 2000);
		alert(`Reminder set for ${eventName} on ${eventDate} ${eventMonth}!`);
	});
});

// Scroll Animations
function handleScrollAnimations() {
	const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
	elements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const elementVisible = 150;
		if (elementTop < window.innerHeight - elementVisible) element.classList.add('visible');
	});
}
window.addEventListener('scroll', handleScrollAnimations);
document.addEventListener('DOMContentLoaded', () => { handleScrollAnimations(); });

// Navbar scroll effect
window.addEventListener('scroll', () => {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(255, 255, 255, 0.98)';
		navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
	} else {
		navbar.style.background = 'rgba(255, 255, 255, 0.95)';
		navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
	}
});

// Inject helper styles (virtual tour placeholder, booking confirmation, calendar headers)
(function injectHelperStyles() {
	const style = document.createElement('style');
	style.textContent = `
		.virtual-tour-placeholder { width: 100%; height: 100%; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); position: relative; display: flex; align-items: center; justify-content: center; flex-direction: column; color: var(--text-light); }
		.tour-controls-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
		.hotspot { position: absolute; width: 30px; height: 30px; cursor: pointer; z-index: 10; }
		.hotspot-marker { width: 100%; height: 100%; background: var(--gradient-primary); border-radius: 50%; border: 3px solid var(--white); box-shadow: 0 0 10px rgba(0,0,0,0.3); animation: pulse 2s infinite; }
		@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
		.tour-instructions { position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 1rem; border-radius: 10px; font-size: 0.9rem; }
		.booking-confirmation { text-align: center; }
		.booking-details { background: var(--light-gold); padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: left; }
		.calendar-day-header { padding: 1rem; text-align: center; font-weight: bold; background: var(--primary-red); color: var(--white); }
	`;
	document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => { console.log('Monastery360 interactivity initialized'); });

// Override openTourModal with 360° iframe implementation using panoramaSources
// Paste your iframe URLs into panoramaSources at the top of this file
openTourModal = function(tourType) {
    if (!modal) return;
    const tourTitle = document.getElementById('tour-title');
    const tourInfoPanel = document.getElementById('tour-info-panel');
    const panoramaView = document.getElementById('panorama-view');

    const tourTitles = {
        rumtek: 'Rumtek Monastery Virtual Tour',
        pemayangtse: 'Pemayangtse Monastery Virtual Tour',
        tashiding: 'Tashiding Monastery Virtual Tour'
    };
    if (tourTitle) tourTitle.textContent = tourTitles[tourType] || 'Virtual Tour';

    // Load default 360 embed if available, else loader
    if (panoramaView) {
        const def = panoramaSources[tourType]?.default;
        panoramaView.innerHTML = def ? def : `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading virtual tour...</p>
            </div>
        `;
    }

    // Info panel
    if (tourInfoPanel) {
        const infoByTour = {
            rumtek: `<h4>Rumtek Monastery</h4><p>Seat of the Karmapa lineage with Golden Stupa, prayer halls and library.</p>`,
            pemayangtse: `<h4>Pemayangtse Monastery</h4><p>Historic Nyingma monastery with murals, Sanghthok Palace and chortens.</p>`,
            tashiding: `<h4>Tashiding Monastery</h4><p>Revered hilltop monastery with sacred chortens, mani stones and vistas.</p>`
        };
        tourInfoPanel.innerHTML = infoByTour[tourType] || '<p>Click hotspots to explore more.</p>';
    }

    // Build hotspots overlay using keys from mapping
    if (panoramaView) {
        const hs = panoramaSources[tourType]?.hotspots || {};
        const hotspotHtml = `
            <div class="tour-controls-overlay">
                ${Object.keys(hs).map((k, i) => {
                    const pos = [
                        'style="top: 28%; left: 22%;"',
                        'style="top: 60%; right: 24%;"',
                        'style="bottom: 28%; left: 50%;"'
                    ][i % 3];
                    const label = k.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    return `
                        <div class="hotspot" data-key="${k}" ${pos} title="${label}">
                            <div class="hotspot-marker"></div>
                        </div>
                    `;
                }).join('')}
                <div class="tour-instructions">
                    <p>📍 Click hotspots to switch viewpoints</p>
                </div>
            </div>
        `;
        panoramaView.insertAdjacentHTML('beforeend', hotspotHtml);

        const hotspots = panoramaView.querySelectorAll('.hotspot');
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', () => {
                const key = hotspot.getAttribute('data-key');
                const embed = panoramaSources[tourType]?.hotspots?.[key];
                if (embed) {
                    panoramaView.innerHTML = embed + hotspotHtml;
                }
            });
        });
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};
