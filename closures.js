var fns = {},
    i;

function execAll(obj) {
    for (var fn in obj) {
        obj[fn]();
    }
}

// Bad. Outputs 3 3 3
for (i = 0; i < 3; i += 1) {
    fns[i] = function() {
        console.log(i);
    };
} 
execAll(fns);

// Bad. Outputs 3 3 3
for (i = 0; i < 3; i += 1) {
    fns[i] = function() {
        var c = i;
        console.log(c);
    };
} 
execAll(fns);

// Bad. Outputs 3 3 3
function bad() {
    for (i = 0; i < 3; i += 1) {
        fns[i] = function() {
            var c = i;
            console.log(c);
        };
    } 
}
bad();
execAll(fns);

// Good. Outputs 0 1 2
for (i = 0; i < 3; i += 1) {
    fns[i] = (function(c) { 
        return function() { console.log(c); }; 
    })(i)
} 
execAll(fns);

// Better. Outputs 0 1 2
for (i = 0; i < 3; i += 1) {
    fns[i] = closeOver(i);
} 
function closeOver(c) { 
    return function() { console.log(c); }; 
}
execAll(fns);

// Best?? Outputs 0 1 2
[0,1,2].forEach(function(i) {
    fns[i] = function() { console.log(i); };
});
execAll(fns);


