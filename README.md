# Kampamba House Website

A beautiful, boutique-style website for Kampamba House - a self-catering rural retreat in the outskirts of Lusaka, Zambia.

## Features

- **Elegant Design**: Crisp, chic boutique hotel aesthetic with earthy tones (off-white and light brown)
- **Responsive Layout**: Fully mobile-friendly design
- **Accommodations Showcase**: Three cottage types with detailed information
- **Booking System**: Integrated with Google Calendar for real-time availability
- **Gallery**: Filterable image gallery with lightbox
- **Experiences**: Wine tasting and photoshoot services
- **Contact Forms**: Booking request forms with deposit information

## Room Categories

1. **Hill View Double Cottage** - K2,000/night
2. **Hill View Studio Cottage** - K1,500/night
3. **Glamping Cottage** - K1,200/night

## Experiences

- **Private Wine Tasting**: K1,000/person (minimum 8 people)
- **Public Wine Tasting**: K1,000/person (last Saturday of each month)
- **Photoshoots**: K500/session (3 hours)

## Setup Instructions

### 1. Add Your Photos

Replace the placeholder image paths with your actual photos. You'll need images for:

**Main Images:**
- `images/hero.jpg` - Homepage hero background
- `images/about.jpg` - About section image
- `images/accommodations-hero.jpg` - Accommodations page hero
- `images/experiences-hero.jpg` - Experiences page hero
- `images/gallery-hero.jpg` - Gallery page hero
- `images/booking-hero.jpg` - Booking page hero

**Cottage Images:**
- `images/hillview-double.jpg` - Hill View Double Cottage main
- `images/hillview-studio.jpg` - Hill View Studio Cottage main
- `images/glamping.jpg` - Glamping Cottage main

**Experience Images:**
- `images/wine-tasting.jpg` - Wine tasting experience
- `images/photoshoot.jpg` - Photoshoot location

**Gallery Images (in `images/gallery/` folder):**
- `hillview-double-1.jpg`, `hillview-double-interior.jpg`, `hillview-double-bedroom.jpg`
- `hillview-studio-1.jpg`, `hillview-studio-interior.jpg`
- `glamping-1.jpg`, `glamping-interior.jpg`
- `grounds-1.jpg`, `grounds-2.jpg`, `grounds-3.jpg`, `sunset.jpg`
- `wine-tasting-1.jpg`, `wine-tasting-2.jpg`
- `photoshoot-1.jpg`, `photoshoot-2.jpg`
- `outdoor-seating.jpg`, `veranda.jpg`

Create the gallery folder:
```bash
mkdir -p images/gallery
```

### 2. Configure Google Calendar Integration

To enable real-time availability checking:

1. **Create a Google Calendar**:
   - Go to [Google Calendar](https://calendar.google.com)
   - Create a new calendar for Kampamba House bookings
   - Note the Calendar ID (found in Calendar Settings)

2. **Get Google API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable the Google Calendar API
   - Create credentials (API Key)
   - Restrict the API key to Calendar API only

3. **Update Configuration**:
   Open `js/booking.js` and update:
   ```javascript
   const GOOGLE_CALENDAR_CONFIG = {
       apiKey: 'YOUR_GOOGLE_API_KEY',
       calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com'
   };
   ```

4. **Make Calendar Public** (for read-only access):
   - In Google Calendar settings, make the calendar public
   - Set "See all event details" permission

### 3. Update Contact Information

Update the following in all HTML files (in the footer and contact sections):

- Email: Replace `info@kampambahouse.com` with your actual email
- Phone: Replace `+260 951 586 142` with your actual phone number
- Add your social media links (Facebook, Instagram, WhatsApp)

### 4. Bank Details (Already Configured)

Your bank details are already set up in `booking.html`:
- **Bank:** FNB
- **Account:** BLEWETT BURGESS LIMITED
- **Account Number:** 63119024402
- **Branch:** CAIRO ROAD (260050)
- **Swift Code:** FIRNZMLX

### 5. Set Up Form Backend (Optional)

Currently, the booking form simulates submission. To actually receive bookings:

**Option 1: Email Service (Recommended for simplicity)**
- Use a service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com)
- Update the form action in `booking.html`

**Option 2: Custom Backend**
- Update the `simulateFormSubmission` function in `js/booking.js`
- Create an API endpoint to receive form data
- Send email notifications when bookings are received

Example with fetch API:
```javascript
function simulateFormSubmission(data) {
    return fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
```

## Deployment

### Option 1: Static Hosting (Free)

Deploy to services like:
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Free tier with custom domain support
- **Vercel**: Free hosting with excellent performance

### Option 2: Traditional Web Hosting

1. Upload all files to your web hosting via FTP
2. Ensure the directory structure is maintained
3. Point your domain to the hosting

### Option 3: Local Testing

To test locally:
```bash
# Using Python 3
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Then open: http://localhost:8000
```

## File Structure

```
kampamba-house/
├── index.html              # Homepage
├── accommodations.html     # Cottage listings
├── experiences.html        # Wine tasting & photoshoots
├── gallery.html           # Photo gallery
├── booking.html           # Booking system
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── script.js          # Main JavaScript
│   ├── booking.js         # Booking system logic
│   └── gallery.js         # Gallery filtering & lightbox
├── images/                # Your photos go here
│   └── gallery/           # Gallery images
└── README.md              # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Typography

The website uses elegant serif fonts similar to House & Garden and Vogue:
- **Headings**: Cormorant Garamond (Google Fonts)
- **Body Text**: Lato (Google Fonts)
- Fallbacks to Georgia and system fonts

## Color Palette

- Off White: `#FAF8F3`
- Cream: `#F5F1E8`
- Light Brown: `#C9B8A3`
- Medium Brown: `#A68968`
- Dark Brown: `#6B5744`

## Support

For technical support or questions:
- Email: info@kampambahouse.com
- Phone: +260 951 586 142

## License

© 2026 Kampamba House. All rights reserved.

---

**Next Steps:**
1. Add your professional photos
2. Configure Google Calendar integration
3. Update contact information
4. Update bank details
5. Set up form backend
6. Test on multiple devices
7. Deploy to hosting service
8. Add custom domain
