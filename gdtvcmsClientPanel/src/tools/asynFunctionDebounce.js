/*
* @Author: acer
* @Date:   2017-11-28 18:33:19
* @Last Modified by:   acer
* @Last Modified time: 2017-11-29 14:21:49
*/


export default function (action) {
	let wait = null;
	let inProgress = false;
	const callback = function () {
		inProgress = false;
		if (wait) {
			fn.apply(wait.self, wait.arg);
		}
		return !!wait;
	};
	const fn = function (...arg) {
		wait = null;
		if (inProgress) { wait = { arg, self: this }; return ; }
		inProgress = true;
		arg.push(callback);
		action.apply(this, arg);
	}
	return fn;
}