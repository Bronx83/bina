
function lor(params, type) {
    //if(typeof(type) == "string" && type.includes("inputs"))
    {
        console.log((type ? type : "") + " : ");
        console.log(params)
    }
    return params;
}
var basicKeys = ["w","a","s","d"];
Array.prototype.random = function () { return (this[(Math.max(Math.random() * this.length - 1, 0).toFixed())]) } // [true, false].random() return true or false; [0, 2, 3].random() return 0 or 2 or 3
var arrRandom = function () { return [-1, 0, 1].random() };
function outputnull() {
    return null;
}
lor(arrRandom(), "arrrandom")
Array.prototype.fillNull = function () { return Array(this.length).fill(null) }
lor(Array(10).fillNull(), "fillnull");
class firstGeneration {
    constructor(num, inputs, outputs, parent) {
        this.num = num
        this.inputs = inputs;
        this.outputs = outputs;
        this.basicgen = Array(num).fillNull()
        this.generation = new Generation(this.num, inputs, outputs, this.basicgen, this.basicgen, true, this)
        this.parent = parent;
    }
}
class Generation {
    constructor(num, inputs, outputs, basicgen, basicgen2, mutation, parent) {
        this.inputs = inputs;
        this.outputs - outputs
        this.basicgen = basicgen
        this.basicgen2 = basicgen2
        this.mutation = mutation;
        var t = this;
        this.binots = Array(num).fillNull().map(function (v, i) {
            var mybina = new bina(inputs, outputs, basicgen.map(function (v, i) {
                if (t.mutation)
                    return [basicgen[i] ? basicgen[i] : Math.round(Math.random() * outputs.length), basicgen2[i] ? basicgen2[i] : Math.round(Math.random() * outputs.length), Math.round(Math.random() * outputs.length)].random()
                else
                    return [basicgen[i] ? basicgen[i] : Math.round(Math.random() * outputs.length), basicgen2[i] ? basicgen2[i] : Math.round(Math.random() * outputs.length)].random()
            }), t)
            mybina._id = i;
            mybina._parent = t;
            return mybina;
        });
        this.parent = parent;
    }
    update(bina) {
        bina._alive = true;
        bina._death = false;
    }
    default() {
        return new Generation(10, [0, 1, 2, 3], basicKeys, Array(10).fillNull(), Array(10).fillNull(), true)
    }
}
Generation.default = function () {
    return new Generation(10, [0, 1, 2, 3], basicKeys, Array(10).fillNull(), Array(10).fillNull(), true)
}
class bina {
    outputnull() {
        return null;
    }
    constructor(inputs, outputs, gen, parent) {
        if (typeof (inputs) == 'number')
            this.inputs = lor(Array(inputs).fillNull().map(function (v,i) { return arrRandom(); }), "inputs");
        else if (typeof (inputs) == 'object')
            this.inputs = inputs;
        if (typeof (outputs) == 'number')
            this.outputs = Array(outputs);
        else if (typeof (outputs) == 'object')
            this.outputs = outputs;
        this.gen = gen;
        this.parent = parent;
    }
    fitness(score, time) {
        return score / time;
    }
    geio(input, output) {
        lor(input, "in");
        lor(output, "op");
        return this.gen[input * output]
    }
    update(inputs) {
        //inputs = arr with one of the values [-1,0,1]
        var toreturn = []

        for (var index = 0; index < inputs.length; index++) {
            lor(this, "this")
            var inp = inputs[index] + 1 * lor(this.inputs[index] + 1, "inputs[index]")
            toreturn.push(lor(this.geio(index, inp), "logio"))
        }
        lor(toreturn, "toreturn");
        var outputs = this.outputs.map(function (v) { return v });
        for (var index = 0; index < this.outputs.length; index++) {
            outputs[index] = toreturn.filter(
                function (v, i) { if (v == index && v != outputnull()) { return true } }
            ).length > 0 ? this.outputs[index] : outputnull();
        }
        this._parent.update(this, true)
        return outputs.filter(function (v) { if (v != outputnull()) return true })
    }
}
Generation.default().binots.forEach(function (element) {
    lor(element, "element")
}, this);
lor((new firstGeneration(10, 10, process.argv[2].split(",") ? process.argv[2].split(",") : basicKeys)).generation.binots[0].update([0, 1, -1]), "first")