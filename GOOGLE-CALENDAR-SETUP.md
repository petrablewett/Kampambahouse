# Google Calendar Integration Setup Guide

This guide will help you set up Google Calendar integration for the Kampamba House booking system.

## Why Google Calendar?

The website integrates with Google Calendar to:
- Show real-time availability to potential guests
- Prevent double bookings
- Let you manage all bookings in one familiar place
- Sync across devices automatically

## Step-by-Step Setup

### Step 1: Create a Google Calendar

1. Go to [Google Calendar](https://calendar.google.com)
2. On the left side, click the **+** next to "Other calendars"
3. Select "Create new calendar"
4. Enter details:
   - **Name**: "Kampamba House Bookings" (or your preference)
   - **Description**: "Booking calendar for Kampamba House website"
   - **Time zone**: Select your time zone
5. Click **Create calendar**

### Step 2: Get Your Calendar ID

1. In Google Calendar, find your new calendar in the left sidebar
2. Click the three dots (⋮) next to the calendar name
3. Select **Settings and sharing**
4. Scroll down to **Integrate calendar**
5. Copy the **Calendar ID** (it looks like: `abc123@group.calendar.google.com`)
6. **Save this ID** - you'll need it later!

### Step 3: Make Calendar Public (Read-Only)

1. Still in Settings and sharing, scroll to **Access permissions**
2. Check the box: **"Make available to public"**
3. IMPORTANT: In the dropdown below, select **"See all event details"**
4. Click **OK** on the warning dialog
5. Leave all other permissions unchecked

> **Note**: This only allows people to VIEW the calendar (read-only). They cannot edit or add bookings.

### Step 4: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **Select a project** at the top
3. Click **NEW PROJECT**
4. Enter details:
   - **Project name**: "Kampamba House Website"
   - **Organization**: Leave as-is or select your organization
5. Click **CREATE**
6. Wait for the project to be created (takes a few seconds)
7. Make sure the new project is selected

### Step 5: Enable Google Calendar API

1. In the Google Cloud Console, click the hamburger menu (☰)
2. Navigate to **APIs & Services** > **Library**
3. Search for "Google Calendar API"
4. Click on **Google Calendar API**
5. Click **ENABLE**
6. Wait for the API to be enabled

### Step 6: Create API Key

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** at the top
3. Select **API key**
4. Your API key will be created and shown in a popup
5. **Copy this key immediately** - you'll need it!
6. Click **RESTRICT KEY** (recommended for security)

### Step 7: Restrict API Key (Recommended)

1. In the API key settings page:
   - **Name**: Change to "Kampamba House Website API Key"
   - **Application restrictions**:
     - Select "HTTP referrers (web sites)"
     - Add your website domain: `https://yourwebsite.com/*`
     - For testing, also add: `http://localhost:*`
   - **API restrictions**:
     - Select "Restrict key"
     - Check only **Google Calendar API**
2. Click **SAVE**

### Step 8: Update Website Configuration

1. Open the file: `js/booking.js` in a text editor
2. Find this section near the top:

```javascript
const GOOGLE_CALENDAR_CONFIG = {
    apiKey: 'YOUR_GOOGLE_API_KEY',
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com'
};
```

3. Replace:
   - `YOUR_GOOGLE_API_KEY` with the API key from Step 6
   - `YOUR_CALENDAR_ID@group.calendar.google.com` with the Calendar ID from Step 2

4. Save the file

### Step 9: Test the Integration

1. Upload your website or test locally
2. Go to the booking page
3. The calendar should display
4. Add a test booking to your Google Calendar
5. The calendar on the website should show it as unavailable (may take a minute to update)

## How to Use

### Adding Bookings

When someone books through the website or via phone/email:

1. Go to your Google Calendar
2. Click on the booking calendar
3. Create a new event:
   - **Title**: Guest name or "Booked - [Cottage Name]"
   - **Date**: Check-in to check-out dates
   - **All day**: Check this box
   - **Description**: Add booking details (name, phone, email, special requests)

The website will automatically show these dates as unavailable.

### Managing Bookings

- Edit events in Google Calendar to update bookings
- Delete events to free up dates
- Changes appear on the website within a few minutes
- Calendar syncs across all your devices

## Troubleshooting

### Calendar not showing on website

- Check that you correctly copied the API key and Calendar ID
- Verify the calendar is set to public
- Check browser console for errors (F12 → Console tab)
- Make sure Google Calendar API is enabled in Cloud Console

### Availability not updating

- Wait a few minutes - there can be a delay
- Refresh the page
- Check that events are set as "All day" events
- Verify events are in the correct calendar

### "API key not valid" error

- Verify you copied the entire API key correctly
- Check API restrictions allow Google Calendar API
- Make sure the key isn't restricted to wrong domains

## Security Notes

- Your API key is public (visible in browser) - this is normal for this type of integration
- The key is restricted to read-only access
- Only the Google Calendar API is allowed
- Nobody can edit your calendar through the website
- Consider domain restrictions to prevent unauthorized use

## Alternative: Skip Google Calendar

If you prefer not to set up Google Calendar:

1. Open `js/booking.js`
2. The calendar will still work for date selection
3. You'll manually check availability when you receive booking requests
4. The calendar won't show real-time availability from other sources

## Need Help?

If you get stuck:
- Check the [Google Calendar API documentation](https://developers.google.com/calendar)
- Visit the [Google Cloud Console Help Center](https://cloud.google.com/support)
- Email your web developer for assistance

---

**Estimated Setup Time**: 15-20 minutes

**Cost**: Free (Google Calendar and API are free for this usage level)
