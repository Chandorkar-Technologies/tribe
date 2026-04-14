<!--
SPDX-FileCopyrightText: Tribe (Chandorkar Technologies)
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<SearchMarker path="/settings/invite" :label="'Invite friends'" :keywords="['invite', 'friends', 'share', 'refer']" icon="ti ti-user-plus">
	<div class="_gaps_m">
		<MkInfo>
			Grow Tribe together. Share your personal invite link with friends and family — they'll automatically follow you when they sign up.
		</MkInfo>

		<FormSection>
			<template #label>Your invite link</template>
			<div :class="$style.linkBox">
				<code :class="$style.link">{{ inviteUrl }}</code>
				<MkButton inline primary @click="copyLink">
					<i class="ti ti-copy"></i> {{ copied ? 'Copied!' : 'Copy' }}
				</MkButton>
			</div>
		</FormSection>

		<FormSection>
			<template #label>Share on</template>
			<div :class="$style.shareGrid">
				<a :class="[$style.shareBtn, $style.whatsapp]" :href="shareWhatsApp" target="_blank" rel="noopener">
					<i class="ti ti-brand-whatsapp"></i><span>WhatsApp</span>
				</a>
				<a :class="[$style.shareBtn, $style.telegram]" :href="shareTelegram" target="_blank" rel="noopener">
					<i class="ti ti-brand-telegram"></i><span>Telegram</span>
				</a>
				<a :class="[$style.shareBtn, $style.twitter]" :href="shareTwitter" target="_blank" rel="noopener">
					<i class="ti ti-brand-x"></i><span>X / Twitter</span>
				</a>
				<a :class="[$style.shareBtn, $style.linkedin]" :href="shareLinkedIn" target="_blank" rel="noopener">
					<i class="ti ti-brand-linkedin"></i><span>LinkedIn</span>
				</a>
				<a :class="[$style.shareBtn, $style.email]" :href="shareEmail">
					<i class="ti ti-mail"></i><span>Email</span>
				</a>
				<a :class="[$style.shareBtn, $style.sms]" :href="shareSms">
					<i class="ti ti-message"></i><span>SMS</span>
				</a>
			</div>
		</FormSection>

		<FormSection>
			<template #label>Scan with a phone</template>
			<div :class="$style.qrBox">
				<img :class="$style.qr" :src="qrUrl" alt="Invite QR" width="220" height="220">
				<p :class="$style.qrHelp">Show this at a meetup, print on a flyer, or drop in a WhatsApp group.</p>
			</div>
		</FormSection>

		<FormSection>
			<template #label>Preview message</template>
			<textarea :class="$style.messagePreview" v-model="customMessage" rows="6"></textarea>
			<p :class="$style.hint">Edit the message above. Share buttons use this text.</p>
		</FormSection>
	</div>
</SearchMarker>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { $i } from '@/i.js';
import { host } from '@@/js/config.js';
import { definePage } from '@/page.js';
import MkInfo from '@/components/MkInfo.vue';
import MkButton from '@/components/MkButton.vue';
import FormSection from '@/components/form/section.vue';
import SearchMarker from '@/components/MkSearchMarker.vue';
import * as os from '@/os.js';

const username = $i?.username ?? '';
const inviteUrl = computed(() => `https://${host}/invite/${username}`);

const defaultMessage = computed(() => `Hey! I just joined Tribe — India's open social web. No ads, no algorithm, your data stays yours.

Join me using my invite link: ${inviteUrl.value}`);

const customMessage = ref(defaultMessage.value);
const copied = ref(false);

const shareWhatsApp = computed(() => `https://wa.me/?text=${encodeURIComponent(customMessage.value)}`);
const shareTelegram = computed(() => `https://t.me/share/url?url=${encodeURIComponent(inviteUrl.value)}&text=${encodeURIComponent(customMessage.value)}`);
const shareTwitter  = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage.value)}`);
const shareLinkedIn = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(inviteUrl.value)}`);
const shareEmail    = computed(() => `mailto:?subject=${encodeURIComponent('Join me on Tribe')}&body=${encodeURIComponent(customMessage.value)}`);
const shareSms      = computed(() => `sms:?body=${encodeURIComponent(customMessage.value)}`);

const qrUrl = computed(() => `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inviteUrl.value)}&size=220x220&color=EE7F2D&bgcolor=FFFFFF&margin=10`);

async function copyLink() {
	await navigator.clipboard.writeText(inviteUrl.value);
	copied.value = true;
	setTimeout(() => { copied.value = false; }, 2000);
	os.success();
}

definePage(() => ({
	title: 'Invite friends',
	icon: 'ti ti-user-plus',
}));
</script>

<style lang="scss" module>
.linkBox {
	display: flex;
	gap: 12px;
	align-items: center;
	flex-wrap: wrap;
}
.link {
	flex: 1;
	min-width: 220px;
	background: var(--MI_THEME-bg);
	padding: 10px 14px;
	border-radius: 8px;
	border: 1px solid var(--MI_THEME-divider);
	font-size: 13px;
	word-break: break-all;
}

.shareGrid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 10px;
}
.shareBtn {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 14px 12px;
	border-radius: 10px;
	text-decoration: none;
	color: #fff;
	font-weight: 600;
	font-size: 14px;
	transition: transform 0.15s, opacity 0.15s;
}
.shareBtn:hover { transform: translateY(-1px); opacity: 0.92; }
.shareBtn i { font-size: 18px; }
.whatsapp { background: #25D366; }
.telegram { background: #229ED9; }
.twitter  { background: #111; }
.linkedin { background: #0A66C2; }
.email    { background: #666; }
.sms      { background: #8A2BE2; }

.qrBox {
	text-align: center;
	padding: 20px;
}
.qr {
	border-radius: 12px;
	background: #fff;
	padding: 12px;
	max-width: 220px;
}
.qrHelp {
	margin-top: 12px;
	font-size: 13px;
	color: var(--MI_THEME-fgTransparentWeak);
}

.messagePreview {
	width: 100%;
	padding: 12px;
	border-radius: 8px;
	border: 1px solid var(--MI_THEME-divider);
	background: var(--MI_THEME-panel);
	color: var(--MI_THEME-fg);
	font-size: 14px;
	font-family: inherit;
	resize: vertical;
}
.hint {
	font-size: 12px;
	color: var(--MI_THEME-fgTransparentWeak);
	margin: 4px 0 0;
}
</style>
