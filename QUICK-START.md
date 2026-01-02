# Quick Start Guide - Kampamba House Website

## 🎉 Your Website is Ready!

Your beautiful, boutique-style website for Kampamba House has been created. Follow these steps to get it live.

## 📁 What You Have

A complete website with:
- ✅ Homepage with hero section and about
- ✅ Accommodations page (3 cottage types)
- ✅ Experiences page (wine tasting & photoshoots)
- ✅ Gallery with filtering and lightbox
- ✅ Booking system with calendar integration
- ✅ Fully responsive mobile design
- ✅ Elegant earthy tones and boutique styling

## 🚀 Get Started in 3 Steps

### Step 1: View Your Website (2 minutes)

Open the website locally to see what you have:

**On Mac/Linux:**
```bash
cd kampamba-house
python3 -m http.server 8000
```

**On Windows:**
```bash
cd kampamba-house
python -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

### Step 2: Add Your Photos (30 minutes)

The most important step! Your website needs photos:

1. **Priority Photos** (add these first):
   - `images/hero.jpg` - Homepage background
   - `images/hillview-double.jpg` - Double cottage
   - `images/hillview-studio.jpg` - Studio cottage
   - `images/glamping.jpg` - Glamping cottage

2. See `images/IMAGE-REQUIREMENTS.txt` for complete list

**Photo Tips:**
- Use high-quality images (1920x1080px for heroes)
- Optimize for web (compress to 100-300 KB)
- Use tools like TinyPNG.com to compress

### Step 3: Update Your Contact Info (5 minutes)

Use Find & Replace in your text editor:

1. **Email**: Find `info@kampambahouse.com`
   → Replace with your real email

2. **Phone**: Find `+260 951 586 142`
   → Replace with your real phone number

3. **Bank Details** (in `booking.html`):
   - Replace `[Your Bank Name]`
   - Replace `[Your Account Number]`
   - Replace `[Branch Name]`
   - Replace `[Branch Code]`

## 📋 Complete Setup Checklist

For a full setup guide, see:
- `SETUP-CHECKLIST.md` - Complete checklist of all tasks
- `README.md` - Detailed documentation
- `GOOGLE-CALENDAR-SETUP.md` - Calendar integration guide

## 🌐 Deploy Your Website

### Option 1: Free Hosting (Recommended for Start)

**Netlify** (Easiest):
1. Go to [netlify.com](https://www.netlify.com)
2. Drag and drop your `kampamba-house` folder
3. Done! You get a free URL instantly
4. Add custom domain later

**GitHub Pages** (Free):
1. Create GitHub account
2. Create new repository
3. Upload your files
4. Enable GitHub Pages in settings

### Option 2: Paid Hosting

Upload to any web hosting service via FTP:
- Recommended: SiteGround, Bluehost, HostGator
- Upload all files keeping the folder structure
- Point your domain to the hosting

## ⚙️ Optional Advanced Setup

### Google Calendar Integration (20 minutes)
See `GOOGLE-CALENDAR-SETUP.md` for step-by-step guide.

**Benefits:**
- Real-time availability display
- Prevent double bookings
- Manage bookings from your phone

**Can skip this initially** - the booking form will still work!

### Form Backend (15 minutes)

To receive actual booking requests by email:

**Option A: Formspree** (Easiest)
1. Go to [formspree.io](https://formspree.io)
2. Create free account
3. Get your form endpoint
4. Update form in `booking.html`

**Option B: EmailJS** (Free tier available)
1. Go to [emailjs.com](https://www.emailjs.com)
2. Set up email service
3. Update `js/booking.js`

## 📱 Test Your Website

Before launching, test on:
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile phone (portrait and landscape)
- [ ] Tablet
- [ ] All navigation links work
- [ ] Booking form submits
- [ ] Gallery filtering works
- [ ] Images load properly

## 🎨 Customization

### Change Colors
Edit `css/styles.css` and modify the color variables:
```css
:root {
  --off-white: #FAF8F3;
  --light-brown: #C9B8A3;
  /* etc. */
}
```

### Update Text
Edit the HTML files directly to change:
- Cottage descriptions
- Pricing
- About section content
- Experience details

### Add More Gallery Images
- Add images to `images/gallery/`
- Copy a gallery item in `gallery.html`
- Update image path and category

## 📞 Need Help?

**Common Issues:**

**Q: Images not showing**
A: Make sure image filenames match exactly (case-sensitive!)
   Check that images are in the correct folders

**Q: Calendar not working**
A: It's okay! Calendar will still work for date selection
   Google Calendar integration is optional

**Q: How do I receive bookings?**
A: Set up Formspree or EmailJS (see Form Backend section)
   Or manually check the website won't actually send emails yet

**Q: Website looks broken on mobile**
A: Clear your browser cache and refresh
   Make sure you're viewing on an actual phone, not just resized browser

## 🎯 Your Launch Timeline

**Today (Essential):**
- [ ] Add minimum 4 cottage photos
- [ ] Add hero image
- [ ] Update contact email and phone
- [ ] Test website locally

**This Week (Important):**
- [ ] Add all photos to gallery
- [ ] Update bank details
- [ ] Set up form backend
- [ ] Deploy to hosting
- [ ] Test on mobile devices

**This Month (Nice to Have):**
- [ ] Set up Google Calendar
- [ ] Add custom domain
- [ ] Set up Google Analytics
- [ ] Promote on social media

## 🎊 Congratulations!

You now have a professional, boutique-style website for Kampamba House!

**Next Step:** Add your photos and deploy!

---

Questions? Check the README.md or contact your web developer.

**Enjoy your new website!** 🏡✨
