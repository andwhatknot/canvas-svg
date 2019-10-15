
export function ctxLogger(ctx: RenderingContext2D) {
	return new Proxy(ctx, {

		get(target, key) {

			const value = target[key];

			if (typeof value === 'function') {
				return (...args) => {

					const result = Reflect.apply(value, target, args);

					console.log('Call:', key, '()', args, '=>', result);

					return result;
				};
			}

			console.log('Get:', key, ':', value);

			return value;
		},

		set(target, key, value) {

			console.log('Set:', key, ':', value);

			target[key] = value;

			return true;
		}
	});
}

export function point(ctx: RenderingContext2D, x = 0, y = 0, radius = 10) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

export function angle(ctx: RenderingContext2D, x = 0, y = 0, size = 10) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + size * 2, y - size);
	ctx.lineTo(x + size * 2, y + size);
	ctx.lineTo(x, y);
	ctx.stroke();
}
