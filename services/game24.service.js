"use strict";

module.exports = {
	name: "game24",
	actions: {
		calculate: {
			rest: {
				method: "GET",
				path: "/calculate",
			},
			params: {
				number: {
					type: "array",
					min: 4,
					max: 4,
					items: {
						type: "string",
						positive: true,
						integer: true,
					},
				},
			},
			async handler(ctx) {
				return this.calculateNumber(ctx.params.number);
			},
		},
	},

	methods: {
		calculateNumber(numbers) {
			const res = [];
			const ops = ["+", "-", "*", "/"];
			for (let i = 0; i < ops.length; i++) {
				for (let j = 0; j < ops.length; j++) {
					for (let k = 0; k < ops.length; k++) {
						const expressions = [
							`${numbers[0]}${ops[i]}${numbers[1]}${ops[j]}${numbers[2]}${ops[k]}${numbers[3]}`,
							`(${numbers[0]}${ops[i]}${numbers[1]})${ops[j]}${numbers[2]}${ops[k]}${numbers[3]}`,
							`${numbers[0]}${ops[i]}(${numbers[1]}${ops[j]}${numbers[2]}${ops[k]}${numbers[3]})`,
							`(${numbers[0]}${ops[i]}${numbers[1]}${ops[j]}${numbers[2]})${ops[k]}${numbers[3]}`,
							`(${numbers[0]}${ops[i]}${numbers[1]})${ops[j]}(${numbers[2]}${ops[k]}${numbers[3]})`,
						];
						expressions.forEach((e, i) => {
							if (eval(expressions[i]) == 24) {
								if (expressions[i] != undefined)
									res.push(expressions[i]);
							}
						});
					}
				}
			}

			let response = new Object();
			if(res.length != 0) {
				response.success = true;
			} else {
				response.success = false;
			}

			response.toDo = res;

			return response;
		},
	},
};
