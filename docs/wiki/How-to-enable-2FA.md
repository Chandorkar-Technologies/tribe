# How to enable 2FA (two-factor authentication)

Protecting your Tribe account with 2FA means that even if someone steals your password, they still can't log in without the second factor.

## Steps

1. Go to **Settings → Security → Two-factor authentication**.
2. Click **Enable**.
3. Scan the QR code with an authenticator app:
   - [Aegis Authenticator](https://getaegis.app/) (Android, open-source — recommended)
   - [Raivo OTP](https://raivo-otp.com/) (iOS)
   - Google Authenticator, Microsoft Authenticator, 1Password, Bitwarden, etc. all work
4. Enter the 6-digit code from the app to confirm.
5. **Save your backup codes** somewhere safe (password manager, printed). If you lose your phone and don't have backup codes, you can't log in.

## Passkeys / Security keys

Tribe also supports WebAuthn / passkeys. Same menu:

1. Settings → Security → Security keys
2. Register your Yubikey, device passkey, or platform authenticator.

We recommend enabling both TOTP and a passkey for redundancy.

## Troubleshooting

- **Lost your phone?** Use a backup code, then regenerate 2FA from a fresh device.
- **Lost your backup codes too?** Contact info@gettribe.org from the email on the account. We'll verify identity and reset.
