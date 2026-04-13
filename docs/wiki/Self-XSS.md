# Self-XSS — why the browser console warns you

If you open your browser's developer console while logged into Tribe, you'll see a loud warning:

> **STOP!**
> This is a browser feature intended for developers. If someone told you to paste something here, they are trying to steal your account.

## What is Self-XSS?

**Self-XSS** (self cross-site scripting) is a scam where an attacker tricks you into pasting malicious JavaScript into your own browser's developer console. When you do, the script runs with full access to your logged-in session — it can:

- Post on your behalf
- Read your DMs
- Steal your access tokens
- Change your password and lock you out

## Common scam patterns

- "Paste this code to unlock a hidden feature!"
- "Paste this to follow 1000 people instantly!"
- "Paste this to get a verified badge!"
- "Customer support asked me to paste this to fix my account!"

**There is no hidden feature. Tribe support will never ask you to paste anything into the console.**

## Rule

**Never paste code into your browser's developer console unless you 100% understand what it does.** If you're not a developer debugging something yourself, the correct answer is always: don't.

## I already pasted something — what now?

1. **Log out of all sessions**: Settings → Security → Active sessions → Log out all.
2. **Change your password**.
3. **Check your posts, follows, and DMs** for anything you didn't do; delete and apologise if needed.
4. **Re-enable 2FA** if you had it (pasting scripts can disable it).
5. **Scan your device for malware** if the prompt came from a browser extension or downloaded file.
