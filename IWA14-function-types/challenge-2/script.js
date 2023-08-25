
function add(x, y) {
    console.log(x + y);
}

function multiply(x, y) {
    console.log(x * x * x * x * y);
}

function internal() {
    if (this.internal.c === 8) {
        add(this.internal.b, this.internal.c);
    } else if (this.internal.c === 3) {
        multiply(this.internal.b, this.internal.c);
    }
}


// Not allowed to change below this

const example1 = {
    internal: {
        a: 2,
        b: 4,
        c: 8,
    },
    add,
    multiply,
    calculate: internal
}

const example2 = {
    internal: {
        a: 2,
        b: 2,
        c: 3,
    },
    add,
    multiply,
    calculate: internal
}

example1.calculate()
example2.calculate()