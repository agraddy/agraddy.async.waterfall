require('setimmediate');

var mod;

mod = function(list, cb) {
	var index = 0;
	var funcs = list;
	var finish = cb;
	loop();

	function loop() {
		var args = [].slice.call(arguments);

		args[args.length] = function() {
			var args2 = [].slice.call(arguments);
			index++;
			if(args2[0]) {
				// setImmediate here:
				setImmediate(function() {
					finish(args2[0]);
				});
			} else {
				if(index < funcs.length) {
					// setImmediate here:
					setImmediate(function() {
						loop.apply(this, args2.slice(1));
					});
				} else {
					// setImmediate here:
					setImmediate(function() {
						finish.apply(this, args2);
					});
				}
			}
		};

		funcs[index].apply(this, args);
	}

}

module.exports = mod;
