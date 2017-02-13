var fbp = require('..');

const IP_COUNT = process.argv[2] || '100000';
const COPIER_COUNT = Number.parseInt(process.argv[3] || 1, 10);
// --- define network ---
var network = new fbp.Network();

var gendata = network.defProc('./examples/components/gendata.js', 'Gen');
network.initialize(gendata, 'COUNT', IP_COUNT);

var previous = gendata;
var next;
for (var i = 0; i < COPIER_COUNT; i += 1) {
  next = network.defProc('./components/copier.js', 'Copy'+i);
  network.connect(previous, 'OUT', next, 'IN', 5);
  previous = next;
}


var disc = network.defProc('./components/discard.js', 'Disc');
network.connect(previous, 'OUT', disc, 'IN', 5);



// --- run ---
var fiberRuntime = new fbp.FiberRuntime();
var start = +(new Date());
network.run(fiberRuntime, {trace: false, silent: true}, function () {
  var elapsed = +(new Date()) - start;

  console.log(IP_COUNT+ ',' + elapsed/IP_COUNT + ',' + (COPIER_COUNT+1));

});
