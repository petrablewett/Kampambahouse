# Instagram Integration Setup Guide

Your website is ready for Instagram integration! The links are already working, and you can optionally add a live Instagram feed.

## ✅ Already Configured

1. **Instagram Link**: https://instagram.com/kampambahouse
2. **Footer Links**: All pages now link to @kampambahouse
3. **Follow Section**: Homepage has "Follow Our Journey" section
4. **Feed Placeholder**: Ready for live Instagram posts

## Instagram Feed Integration Options

### Option 1: SnapWidget (Easiest - Free)

**Best for:** Simple, no-code solution

1. Go to [SnapWidget.com](https://snapwidget.com)
2. Click "Create Widget"
3. Select "Instagram" and choose "Grid" layout
4. Enter your Instagram username: `kampambahouse`
5. Customize:
   - Layout: Grid
   - Number of photos: 6
   - Spacing: Medium
   - Background: #FAF8F3 (off-white)
6. Click "Get Widget"
7. Copy the embed code
8. Open `index.html` and replace line 152-158 with the SnapWidget code

### Option 2: EmbedSocial (Feature-Rich)

**Best for:** Advanced customization

1. Go to [EmbedSocial.com](https://embedsocial.com)
2. Sign up for free account
3. Connect your Instagram account
4. Create an Instagram feed widget
5. Customize to match your website colors
6. Copy the embed code
7. Paste into `index.html` at line 152

### Option 3: Instagram's Official Embed

**Best for:** Control and authenticity

**Requirements:**
- Instagram Business or Creator account
- Facebook Page connected to Instagram

**Steps:**
1. Convert your Instagram to Business account (in Instagram settings)
2. Connect to a Facebook Page
3. Use Facebook's Page Plugin or Instagram Feed plugin
4. Get embed code from [Facebook Developers](https://developers.facebook.com/docs/instagram)

### Option 4: Curator.io (Premium)

**Best for:** Professional feeds with moderation

1. Sign up at [Curator.io](https://curator.io)
2. Create Instagram feed
3. Moderate which posts show
4. Get embed code
5. Add to website

## Quick Setup (Recommended: SnapWidget)

Here's the exact code placement:

1. Open `index.html`
2. Find line 152 (the Instagram feed placeholder)
3. Replace this section:
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 2rem;">
    <div style="background-color: #F5F1E8; padding: 3rem;">
        <!-- Placeholder content -->
    </div>
</div>
```

With your SnapWidget code (example):
```html
<!-- SnapWidget -->
<script src="https://snapwidget.com/js/snapwidget.js"></script>
<iframe src="https://snapwidget.com/embed/XXXXX" class="snapwidget-widget"
    style="border:none; width:100%; max-width:100%;"
    scrolling="no"></iframe>
```

## Styling Tips

Match your website aesthetic:
- **Background**: #FAF8F3 (off-white)
- **Border Color**: #C9B8A3 (light brown)
- **Spacing**: Match your website's grid (1-2rem gaps)
- **Hover Effect**: Subtle scale or opacity change

## Without Feed Integration

If you prefer to keep it simple:
- The "Follow @kampambahouse" button works perfectly
- Visitors click through to see your Instagram
- No additional setup needed
- Your current placeholder looks clean and professional

## Current Features Working Now

✅ Instagram icon in footer links to your profile
✅ "Follow @kampambahouse" button on homepage
✅ All social media links functional
✅ Opens in new tab
✅ Mobile-friendly

## Next Steps

1. **Test the Links**: Visit your website and click the Instagram links
2. **Choose Feed Option**: Decide if you want live posts displayed
3. **Update WhatsApp**: Replace `260XXXXXXXXX` with your actual WhatsApp number
4. **Update Facebook**: Confirm your Facebook page URL

## Support

- SnapWidget Support: https://snapwidget.com/support
- EmbedSocial Support: https://embedsocial.com/support
- Instagram Help: https://help.instagram.com

---

**Your Instagram is now integrated!** Visitors can find and follow you from any page on your website. 📷✨
