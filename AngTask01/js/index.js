function sum(value) {

    var aggr = value;

    function sum_inner(value_inner) {
        if(value_inner != null && value_inner != undefined) {
            aggr += value_inner;
            return sum_inner;
        }
        else {
            return aggr;
        }
    }

    return sum_inner;
}

console.log(sum(1)());
console.log(sum(1)(2)());
console.log(sum(1)(2)(3)());
console.log(sum(1)(2)(3)(4)());
console.log(sum(1)(2)(3)(4)(5)());
console.log(sum(1)(2)(3)(4)(5)(6)());
