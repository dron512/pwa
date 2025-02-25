function Circle(radius) {
    console.log(radius);
    this.name = '동그라미';
    return 'aa';
}

const ret1 = Circle(10);
const ret2 = new Circle(5);

console.log(ret1);
console.log(ret2);

// const circle = new Circle(5);