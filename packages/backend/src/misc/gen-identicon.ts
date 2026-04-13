/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Identicon generator
 * https://en.wikipedia.org/wiki/Identicon
 */

import { createCanvas } from 'canvas';
import gen from 'random-seed';

const size = 128; // px
const n = 5; // resolution
const margin = (size / 4);
const colors = [
	['#f56b1f', '#ffa45c'], // tangerine
	['#ff8533', '#ffd166'], // mango
	['#d4541a', '#f56b1f'], // burnt orange
	['#e15a16', '#ff8533'], // vivid orange
	['#c5571a', '#f28500'], // deep tangerine
	['#ff6b35', '#ffba49'], // sunset
	['#e17055', '#ffeaa7'], // coral peach
	['#d4380d', '#fa8c16'], // persimmon
	['#fa541c', '#ffa940'], // volcano
	['#ad4e00', '#fa8c16'], // amber
	['#cf1322', '#fa541c'], // ember
	['#7c2d12', '#f97316'], // charcoal-orange
	['#9a3412', '#fb923c'], // rust
	['#fb923c', '#fcd34d'], // honey
	['#dc2626', '#fbbf24'], // fire
	['#b45309', '#fde68a'], // wheat
	['#92400e', '#f59e0b'], // bronze
	['#7c2d12', '#fed7aa'], // bronze cream
	['#c2410c', '#fdba74'], // pumpkin
	['#ea580c', '#fef3c7'], // sun
];

const actualSize = size - (margin * 2);
const cellSize = actualSize / n;
const sideN = Math.floor(n / 2);

/**
 * Generate buffer of an identicon by seed
 */
export function genIdenticon(seed: string): Buffer {
	const rand = gen.create(seed);
	const canvas = createCanvas(size, size);
	const ctx = canvas.getContext('2d');

	const bgColors = colors[rand(colors.length)];

	const bg = ctx.createLinearGradient(0, 0, size, size);
	bg.addColorStop(0, bgColors[0]);
	bg.addColorStop(1, bgColors[1]);

	ctx.fillStyle = bg as any;
	ctx.beginPath();
	ctx.fillRect(0, 0, size, size);

	ctx.fillStyle = '#ffffff';

	// side bitmap (filled by false)
	const side: boolean[][] = new Array(sideN);
	for (let i = 0; i < side.length; i++) {
		side[i] = new Array(n).fill(false);
	}

	// 1*n (filled by false)
	const center: boolean[] = new Array(n).fill(false);

	// eslint:disable-next-line:prefer-for-of
	for (let x = 0; x < side.length; x++) {
		for (let y = 0; y < side[x].length; y++) {
			side[x][y] = rand(3) === 0;
		}
	}

	for (let i = 0; i < center.length; i++) {
		center[i] = rand(3) === 0;
	}

	// Draw
	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			const isXCenter = x === ((n - 1) / 2);
			if (isXCenter && !center[y]) continue;

			const isLeftSide = x < ((n - 1) / 2);
			if (isLeftSide && !side[x][y]) continue;

			const isRightSide = x > ((n - 1) / 2);
			if (isRightSide && !side[sideN - (x - sideN)][y]) continue;

			const actualX = margin + (cellSize * x);
			const actualY = margin + (cellSize * y);
			ctx.beginPath();
			ctx.fillRect(actualX, actualY, cellSize, cellSize);
		}
	}

	return canvas.toBuffer('image/png');
}
