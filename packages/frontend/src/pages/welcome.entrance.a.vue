<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div v-if="meta" :class="$style.root">
	<div :class="$style.heroBg"></div>
	<MkFeaturedPhotos :class="$style.bg"/>
	<XTimeline v-if="meta.policies.ltlAvailable" :class="$style.tl"/>
	<div :class="$style.shape1"></div>
	<div :class="$style.shape2"></div>
	<div :class="$style.contents">
		<div :class="$style.logoWrapper">
			<div :class="$style.wordmark">Tribe</div>
			<div :class="$style.tagline">Find your people.</div>
		</div>
		<div :class="$style.hero">
			<h1 :class="$style.heroTitle">Find your people.</h1>
			<p :class="$style.heroSub">A federated social network for communities, voices, and movements. Open. Yours.</p>
		</div>
		<MkVisitorDashboard/>
		<div :class="$style.features">
			<div :class="$style.feature">
				<div :class="$style.featureIcon">🔥</div>
				<div :class="$style.featureTitle">Sparks, not shouting</div>
				<div :class="$style.featureDesc">Post what matters. Watch it travel. Re-spark what resonates.</div>
			</div>
			<div :class="$style.feature">
				<div :class="$style.featureIcon">🌍</div>
				<div :class="$style.featureTitle">Speak your language</div>
				<div :class="$style.featureDesc">140+ languages, built in. Follow anyone, understand everyone.</div>
			</div>
			<div :class="$style.feature">
				<div :class="$style.featureIcon">🏕️</div>
				<div :class="$style.featureTitle">Communities, not algorithms</div>
				<div :class="$style.featureDesc">No engagement bait. You follow people and tribes, in the order they post.</div>
			</div>
			<div :class="$style.feature">
				<div :class="$style.featureIcon">🔓</div>
				<div :class="$style.featureTitle">Yours to leave</div>
				<div :class="$style.featureDesc">Federated means portable. Take your followers anywhere.</div>
			</div>
		</div>
		<div :class="$style.bottomSpacer"></div>
	</div>
	<div v-if="instances && instances.length > 0" :class="$style.federation">
		<MarqueeText :duration="40">
			<MkA v-for="instance in instances" :key="instance.id" :class="$style.federationInstance" :to="`/instance-info/${instance.host}`" behavior="window">
				<img v-if="instance.iconUrl" :class="$style.federationInstanceIcon" :src="getInstanceIcon(instance)" alt=""/>
				<span class="_monospace">{{ instance.host }}</span>
			</MkA>
		</MarqueeText>
	</div>
	<footer :class="$style.footer">
		<a v-if="meta.termsOfServiceUrl" :href="meta.termsOfServiceUrl" target="_blank" rel="noopener">Terms</a>
		<a v-if="meta.privacyPolicyUrl" :href="meta.privacyPolicyUrl" target="_blank" rel="noopener">Privacy</a>
		<a v-if="meta.impressumUrl" :href="meta.impressumUrl" target="_blank" rel="noopener">Impressum</a>
		<a v-if="meta.donationUrl" :href="meta.donationUrl" target="_blank" rel="noopener">Support</a>
		<a href="/about">About</a>
	</footer>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as Misskey from 'misskey-js';
import XTimeline from './welcome.timeline.vue';
import MarqueeText from '@/components/MkMarquee.vue';
import MkFeaturedPhotos from '@/components/MkFeaturedPhotos.vue';
import { misskeyApiGet } from '@/utility/misskey-api.js';
import MkVisitorDashboard from '@/components/MkVisitorDashboard.vue';
import { getProxiedImageUrl } from '@/utility/media-proxy.js';
import { instance as meta } from '@/instance.js';

const instances = ref<Misskey.entities.FederationInstance[]>();

function getInstanceIcon(instance: Misskey.entities.FederationInstance): string {
	if (!instance.iconUrl) {
		return '';
	}

	return getProxiedImageUrl(instance.iconUrl, 'preview');
}

misskeyApiGet('federation/instances', {
	sort: '+pubSub',
	limit: 20,
	blocked: 'false',
}).then(_instances => {
	instances.value = _instances;
});
</script>

<style lang="scss" module>
.root {
	height: 100cqh;
	overflow: auto;
	overscroll-behavior: contain;
	position: relative;
}

// Right-side "firelight" ambient background — visible when no featured photos are set.
// Sits behind MkFeaturedPhotos so admin uploads still override it.
.heroBg {
	position: fixed;
	inset: 0;
	z-index: 0;
	background:
		radial-gradient(ellipse 60% 50% at 85% 30%, rgba(255, 183, 77, 0.55), transparent 60%),
		radial-gradient(ellipse 50% 60% at 95% 75%, rgba(245, 107, 31, 0.45), transparent 65%),
		radial-gradient(ellipse 40% 40% at 70% 95%, rgba(212, 84, 26, 0.35), transparent 60%),
		linear-gradient(135deg, #fff7f0 0%, #ffe5cc 35%, #ffcc99 70%, #ff9966 100%);
}

// Subtle tribal / bonfire silhouette pattern on top of the gradient
.heroBg::after {
	content: '';
	position: absolute;
	inset: 0;
	background-image:
		radial-gradient(circle at 78% 40%, rgba(255, 255, 255, 0.06) 2px, transparent 2.5px),
		radial-gradient(circle at 88% 60%, rgba(255, 255, 255, 0.05) 3px, transparent 3.5px),
		radial-gradient(circle at 65% 80%, rgba(255, 255, 255, 0.04) 2px, transparent 2.5px);
	background-size: 120px 120px, 180px 180px, 90px 90px;
	opacity: 0.8;
	pointer-events: none;
}

.bg {
	position: fixed;
	top: 0;
	right: 0;
	width: 80vw;
	height: 100vh;
	z-index: 1;
}

.tl {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 64px;
	margin: auto;
	padding: 128px 0;
	width: 500px;
	height: calc(100% - 256px);
	overflow: hidden;
	z-index: 2;
	-webkit-mask-image: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 128px, rgba(0,0,0,1) calc(100% - 128px), rgba(0,0,0,0) 100%);
	mask-image: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 128px, rgba(0,0,0,1) calc(100% - 128px), rgba(0,0,0,0) 100%);

	@media (max-width: 1200px) {
		display: none;
	}
}

.shape1 {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: var(--MI_THEME-accent);
	clip-path: polygon(0% 0%, 45% 0%, 20% 100%, 0% 100%);
	z-index: 3;
	pointer-events: none;
}
.shape2 {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: var(--MI_THEME-accent);
	clip-path: polygon(0% 0%, 25% 0%, 35% 100%, 0% 100%);
	opacity: 0.5;
	z-index: 3;
	pointer-events: none;
}

.contents {
	position: relative;
	z-index: 10;
	width: min(520px, calc(100% - 32px));
	margin-left: 128px;
	padding: 40px 0 80px 0;

	@media (max-width: 1200px) {
		margin: auto;
	}
}

.logoWrapper {
	color: var(--MI_THEME-fgOnAccent);
	margin-bottom: 72px;
	user-select: none;
}

.wordmark {
	font-size: 40px;
	font-weight: 800;
	letter-spacing: -0.02em;
	line-height: 1;
}

.tagline {
	margin-top: 6px;
	font-size: 14px;
	opacity: 0.9;
	letter-spacing: 0.01em;
}

.hero {
	margin-bottom: 28px;
	color: var(--MI_THEME-fg);
}

.heroTitle {
	font-size: clamp(32px, 4vw, 48px);
	font-weight: 800;
	letter-spacing: -0.02em;
	line-height: 1.05;
	margin: 0 0 14px 0;
	color: var(--MI_THEME-fg);
}

.heroSub {
	font-size: 16px;
	line-height: 1.45;
	margin: 0;
	opacity: 0.85;
	max-width: 460px;
}

.features {
	margin-top: 36px;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;

	@media (max-width: 520px) {
		grid-template-columns: 1fr;
	}
}

.feature {
	background: color(from var(--MI_THEME-panel) srgb r g b / 0.95);
	-webkit-backdrop-filter: blur(12px);
	backdrop-filter: blur(12px);
	border-radius: var(--MI-radius-md);
	padding: 16px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.featureIcon {
	font-size: 26px;
	line-height: 1;
	margin-bottom: 10px;
}

.featureTitle {
	font-size: 14px;
	font-weight: 700;
	margin-bottom: 4px;
	color: var(--MI_THEME-fg);
}

.featureDesc {
	font-size: 12.5px;
	line-height: 1.4;
	opacity: 0.75;
	color: var(--MI_THEME-fg);
}

.bottomSpacer {
	height: 80px;
}

.federation {
	position: fixed;
	bottom: 56px;
	left: 0;
	right: 0;
	margin: auto;
	background: color(from var(--MI_THEME-panel) srgb r g b / 0.7);
	-webkit-backdrop-filter: var(--MI-blur, blur(15px));
	backdrop-filter: var(--MI-blur, blur(15px));
	border-radius: var(--MI-radius-ellipse);
	overflow: clip;
	width: 800px;
	padding: 8px 0;
	z-index: 20;

	@media (max-width: 900px) {
		display: none;
	}
}

.federationInstance {
	display: inline-flex;
	align-items: center;
	vertical-align: bottom;
	padding: 6px 12px 6px 6px;
	margin: 0 10px 0 0;
	background: var(--MI_THEME-panel);
	border-radius: var(--MI-radius-ellipse);
}

.federationInstanceIcon {
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-right: 5px;
	border-radius: var(--MI-radius-ellipse);
}

.footer {
	position: fixed;
	bottom: 16px;
	left: 0;
	right: 0;
	display: flex;
	gap: 18px;
	justify-content: center;
	font-size: 12.5px;
	z-index: 20;

	a {
		color: var(--MI_THEME-fg);
		text-decoration: none;
		opacity: 0.75;

		&:hover {
			opacity: 1;
			color: var(--MI_THEME-accent);
		}
	}
}
</style>
