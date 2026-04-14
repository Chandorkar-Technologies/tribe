<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<PageWithHeader>
	<div class="_spacer" style="--MI_SPACER-w: 800px;">
		<div class="_gaps">
			<div class="_panel" :class="$style.link">
				<MkA to="/bubble-game">
					<img src="/client-assets/drop-and-fusion/logo.png" style="display: block; max-width: 100%; max-height: 200px; margin: auto;"/>
				</MkA>
			</div>
			<div class="_panel" :class="$style.link">
				<MkA to="/reversi">
					<img src="/client-assets/reversi/logo.png" style="display: block; max-width: 100%; max-height: 200px; margin: auto;"/>
				</MkA>
			</div>

			<div :class="$style.arcadeGrid">
				<a v-for="g in arcadeGames" :key="g.slug" :href="`/games/${g.slug}/`" target="_blank" rel="noopener" class="_panel" :class="[$style.link, $style.arcadeCard]">
					<span :class="$style.arcadeEmoji">{{ g.emoji }}</span>
					<span :class="$style.arcadeTitle">{{ g.title }}</span>
					<span :class="$style.arcadeDesc">{{ g.desc }}</span>
				</a>
			</div>
		</div>
	</div>
</PageWithHeader>
</template>

<script lang="ts" setup>
import { i18n } from '@/i18n.js';
import { definePage } from '@/page.js';

const arcadeGames = [
	{ slug: '2048',    emoji: '🔢', title: '2048',        desc: 'Slide tiles, make bigger numbers.' },
	{ slug: 'tetris',  emoji: '🧱', title: 'Tetris',      desc: 'Stack falling blocks, clear lines.' },
	{ slug: 'snake',   emoji: '🐍', title: 'Snake',       desc: "Eat, grow, don't crash." },
	{ slug: 'flappy',  emoji: '🐦', title: 'Flappy Bird', desc: 'One tap. Infinite pipes.' },
	{ slug: 'pacman',  emoji: '👻', title: 'Pac-Man',     desc: 'Eat dots, dodge ghosts.' },
];

definePage(() => ({
	title: 'Tribe Games',
	icon: 'ti ti-device-gamepad',
}));
</script>

<style module>
.link:focus-within {
	outline: 2px solid var(--MI_THEME-focus);
	outline-offset: -2px;
}

.arcadeGrid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 12px;
}

.arcadeCard {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24px 16px;
	text-decoration: none;
	color: inherit;
	transition: transform 0.15s;
}

.arcadeCard:hover {
	transform: translateY(-2px);
}

.arcadeEmoji {
	font-size: 48px;
	line-height: 1;
	margin-bottom: 10px;
}

.arcadeTitle {
	font-weight: 600;
	font-size: 16px;
	margin-bottom: 4px;
}

.arcadeDesc {
	font-size: 12px;
	opacity: 0.7;
	text-align: center;
}
</style>
