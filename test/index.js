var tap = require('agraddy.test.tap')(__filename);

var waterfall = require('../');

waterfall([function(cb) {
	console.log('one!');
	cb(null, 'one');
}, function(one, cb) {
	console.log('two!');
	cb(null, 'one', 'two');
}, function(one, two, cb) {
	console.log('three!');
	cb(null, 'one', 'two', 'three');
}, function(one, two, three, cb) {
	console.log('four!');
	cb(null, 'two', 'three');
}], function(err, two, three) {
	console.log('five!');
	tap.assert.equal(typeof one, 'undefined', 'One should not exist.');
	tap.assert.equal(two, 'two', 'Two should get passed.');
	tap.assert.equal(three, 'three', 'Three should get passed.');
});

waterfall([function(cb) {
	cb(null, 'one');
}, function(one, cb) {
	cb(new Error('End early'), 'one', 'two');
}, function(one, two, cb) {
	cb(null, 'one', 'two', 'three');
}, function(one, two, three, cb) {
	cb(null, 'two', 'three');
}], function(err, two, three) {
	tap.assert.equal(err.message, 'End early', 'An error should short circuit.');
});

var i;
var list = [];
var func = function(cb) { cb() };
var order;
for(i = 0; i < 100; i++) {
	list.push(func);
}

order = 'before';
waterfall(list, function(err) {
	tap.assert.equal(order, 'after', 'Make sure it is actually async.');
});
order = 'after';


