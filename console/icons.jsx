// STARS Admin Console — icon set. 1.6px geometric line icons.
const I = {};
const mk = (paths) => ({ size = 18, sw = 1.6, ...p } = {}) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', ...p },
    paths.map((d, i) => React.createElement('path', { key: i, d })));
const mkR = (children) => ({ size = 18, sw = 1.6, ...p } = {}) =>
  React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', ...p }, children);

I.dashboard = mkR([
  React.createElement('rect', { key:1, x:3, y:3, width:7, height:9, rx:1.5 }),
  React.createElement('rect', { key:2, x:14, y:3, width:7, height:5, rx:1.5 }),
  React.createElement('rect', { key:3, x:14, y:12, width:7, height:9, rx:1.5 }),
  React.createElement('rect', { key:4, x:3, y:16, width:7, height:5, rx:1.5 }),
]);
I.campaigns = mk(['M3 11l16-6v14L3 13z', 'M7 12v5a2 2 0 0 0 4 0v-3']);
I.builder = mkR([
  React.createElement('path', { key:1, d:'M4 6h10' }),
  React.createElement('circle', { key:2, cx:18, cy:6, r:2 }),
  React.createElement('path', { key:3, d:'M20 12H10' }),
  React.createElement('circle', { key:4, cx:6, cy:12, r:2 }),
  React.createElement('path', { key:5, d:'M4 18h10' }),
  React.createElement('circle', { key:6, cx:18, cy:18, r:2 }),
]);
I.rules = mkR([
  React.createElement('circle', { key:1, cx:6, cy:6, r:2.5 }),
  React.createElement('circle', { key:2, cx:6, cy:18, r:2.5 }),
  React.createElement('circle', { key:3, cx:18, cy:12, r:2.5 }),
  React.createElement('path', { key:4, d:'M8.5 6H13a3 3 0 0 1 3 3v1M8.5 18H13a3 3 0 0 0 3-3v-1' }),
]);
I.rewards = mkR([
  React.createElement('rect', { key:1, x:3, y:8, width:18, height:13, rx:2 }),
  React.createElement('path', { key:2, d:'M3 12h18M12 8v13' }),
  React.createElement('path', { key:3, d:'M12 8S9.5 3.5 7 5s1 3 5 3c4 0 7.5 1.5 5-1S12 8 12 8z' }),
]);
I.segments = mkR([
  React.createElement('circle', { key:1, cx:9, cy:8, r:3.2 }),
  React.createElement('path', { key:2, d:'M3.5 19a5.5 5.5 0 0 1 11 0' }),
  React.createElement('path', { key:3, d:'M16 6a3 3 0 0 1 0 5.6M18 19a5 5 0 0 0-3-4.6' }),
]);
I.analytics = mkR([
  React.createElement('path', { key:1, d:'M4 19V5M4 19h16' }),
  React.createElement('rect', { key:2, x:8, y:11, width:3, height:5 }),
  React.createElement('rect', { key:3, x:14, y:7, width:3, height:9 }),
]);
I.integrations = mk(['M9 3v6M15 3v6', 'M7 9h10v3a5 5 0 0 1-10 0z', 'M12 17v4']);
I.search = mkR([ React.createElement('circle',{key:1,cx:11,cy:11,r:7}), React.createElement('path',{key:2,d:'m20 20-3-3'}) ]);
I.bell = mk(['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.5 21a2 2 0 0 1-3 0']);
I.plus = mk(['M12 5v14M5 12h14']);
I.chevDown = mk(['m6 9 6 6 6-6']);
I.chevUp = mk(['m6 15 6-6 6 6']);
I.chevRight = mk(['m9 6 6 6-6 6']);
I.check = mk(['m5 12 5 5L20 7']);
I.checkSm = mk(['m5 12 5 5L20 7']);
I.x = mk(['M18 6 6 18M6 6l12 12']);
I.star = mk(['m12 3 2.5 6 6.5.5-5 4.2 1.6 6.3L12 17l-5.6 3 1.6-6.3-5-4.2 6.5-.5z']);
I.users = mk(['M3.5 19a5.5 5.5 0 0 1 11 0', 'M16 6a3 3 0 0 1 0 5.6M18 19a5 5 0 0 0-3-4.6']);
I.activity = mk(['M22 12h-4l-3 9L9 3l-3 9H2']);
I.target = mkR([ React.createElement('path',{key:1,d:'m9 11 3 3 8-8'}), React.createElement('path',{key:2,d:'M20 12a8 8 0 1 1-5-7.4'}) ]);
I.vault = mk(['M3 21V8l9-5 9 5v13', 'M3 21h18M9 21v-6h6v6']);
I.warn = mk(['M12 9v4M12 17h.01', 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z']);
I.info = mkR([ React.createElement('circle',{key:1,cx:12,cy:12,r:9}), React.createElement('path',{key:2,d:'M12 11v5M12 8h.01'}) ]);
I.arrowUp = mk(['M7 17 17 7M9 7h8v8']);
I.arrow = mk(['M5 12h14M13 6l6 6-6 6']);
I.filter = mk(['M4 6h16M7 12h10M10 18h4']);
I.calendar = mkR([ React.createElement('rect',{key:1,x:3,y:4.5,width:18,height:16,rx:2}), React.createElement('path',{key:2,d:'M3 9h18M8 3v3M16 3v3'}) ]);
I.bolt = mk(['M13 2 4 14h7l-1 8 9-12h-7l1-8z']);
I.pause = mkR([ React.createElement('rect',{key:1,x:7,y:5,width:3.5,height:14,rx:1}), React.createElement('rect',{key:2,x:13.5,y:5,width:3.5,height:14,rx:1}) ]);
I.list = mk(['M8 6h13M8 12h13M8 18h13','M3 6h.01M3 12h.01M3 18h.01']);
I.dots = mkR([ React.createElement('circle',{key:1,cx:5,cy:12,r:1.6}), React.createElement('circle',{key:2,cx:12,cy:12,r:1.6}), React.createElement('circle',{key:3,cx:19,cy:12,r:1.6}) ]);

window.I = I;
