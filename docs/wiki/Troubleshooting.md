# Troubleshooting

## "Something went wrong" / generic error page

Most errors are temporary.

1. **Refresh the page.**
2. **Clear site data** (browser DevTools → Application → Clear storage) and log back in.
3. **Try a different browser** to rule out an extension or cached state.
4. **Check the Tribe status**: is anyone else reporting issues? Announcements appear on the home page.

If the problem persists, email info@gettribe.org with:
- Your username
- What you were trying to do
- The error ID shown on the page (a UUID)
- Your browser and OS

## A post didn't federate

The fediverse is eventually consistent. A post you made might take seconds to minutes to reach a remote server. Things that can delay or block it:

- The remote server is slow or offline
- Your post is too long for the remote server's instance limits
- The remote server has blocked gettribe.org (rare)
- The remote server is rate-limiting us temporarily

Usually it just arrives late — give it 10 minutes.

## Notifications not working

- Check **Settings → Notifications** → make sure the notification type is enabled.
- For browser push: visit **Settings → General → Service worker** and confirm push is enabled; your browser must also allow notifications for gettribe.org.

## Can't log in

- Reset your password from the login page.
- If you lost access to your email, contact info@gettribe.org from the recovery email.
- If you enabled 2FA and lost access, use a backup code.

## Something else

Email **info@gettribe.org** — include your username and any error IDs.
