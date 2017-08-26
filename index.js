//פונקציה שמקבלת פראמטר ומדפיסה אותו ומחזירה אותו, נועד לעבוד כמו "פרוקסי" למשתנים
function lor(params, type) {
    if(typeof(type) == "string" && type.includes("first"))
    {
        console.log((type ? type : "") + " : ");
        console.log(params)
    }
    return params;
}

var basicKeys = ["w","a","s","d"]; // כמה אאוטפוט ברירת מחדל
// מחזיר אלמנט רנדומלי ממערך
Array.prototype.random = function () { return (this[(Math.max(Math.random() * this.length - 1, 0).toFixed())]) } // [true, false].random() return true or false; [0, 2, 3].random() return 0 or 2 or 3
var arrRandom = function () { return [-1, 0, 1].random() }; }// בסיס גנטי לכאורה, מחזירה רנדומלית
lor(arrRandom(), "arrrandom") // בדיקה של הפונקציה הקודמת
function outputnull() {
    return null;
}// אאוטטפוט לא קיים, מיועד לנוירונוים עם תשובה "ריקה"

// למלא מערך בנאלים, סיבות באגים\נוחות
Array.prototype.fillNull = function () { return Array(this.length).fill(null) }

lor(Array(10).fillNull(), "fillnull");
//בדיקה של הפונקציה הקודמת

// קלאס דור ראשון
class firstGeneration {
    // מקבל מספר אוכלוסיה, אינפוטס אפשריים, אאוטפוטס אפשריים, אפשרי: אובייקט הורה
    constructor(num, inputs, outputs, parent) {
        this.num = num
        this.inputs = inputs;
        this.outputs = outputs;
        this.basicgen = Array((inputs+1)*(outputs+1)).fillNull() // מילוי מערך נאליי של גנים
        this.generation = new Generation(this.num, inputs, outputs, this.basicgen, this.basicgen, true, this) //יצירת דור
        this.parent = parent; // הגדרת הורה המשתנה
    }
} // קלאס ניהול דורות
class Generation {
    // מקבל מספר אוכלוסיה, אינפוטים אפשריים, אאוטפוטים אפשריים, בסיס גנטי 1, בסיס גנטי 2, מוטציה:כן\לא, הורה
    constructor(num, inputs, outputs, basicgen, basicgen2, mutation, parent) {
        this.inputs = inputs;
        this.outputs - outputs
        this.basicgen = basicgen
        this.basicgen2 = basicgen2
        this.mutation = mutation;
        var t = this;
        // יצירת אוכלוסיה
        this.binots = Array(num).fillNull().map(function (v, i) {
            // יצירת בינה
            var mybina = new bina(inputs, outputs, basicgen.map(function (v, i) {
                // שילוב שני הבסיסי הגנטים הקודמים, אם מוטציה אז להוסיף מוטציה אפשרית
                if (t.mutation) 
                    return [basicgen[i] ? basicgen[i] : Math.round(Math.random() * outputs.length), basicgen2[i] ? basicgen2[i] : Math.round(Math.random() * outputs.length), Math.round(Math.random() * outputs.length)].random()
                else
                    return [basicgen[i] ? basicgen[i] : Math.round(Math.random() * outputs.length), basicgen2[i] ? basicgen2[i] : Math.round(Math.random() * outputs.length)].random()
            }), t)
            mybina._id = i; // לשימוש קלאס דור
            mybina._parent = t; // כנל
            return mybina;
        });
        this.parent = parent; //הורה
    }
    update(bina) {
        //עדכון בינה תיאורטית, האם היא חיה או לא
        bina._alive = true;
        bina._death = false;
    }
    default() { // ברירת מחדל
        return new Generation(10, [0, 1, 2, 3], basicKeys, Array(10).fillNull(), Array(10).fillNull(), true)
    }
}
// דיפולט של דור
Generation.default = function () {
    return new Generation(10, [0, 1, 2, 3], basicKeys, Array(10).fillNull(), Array(10).fillNull(), true)
}
//קלאס בינה מלאכותית
class bina {
    // נאל של אאוטפוט
    outputnull() {
        return null;
    }
    // מקבל אינפוטים כמספר או מערך, פלטים גם, גנים אפשרי, הורה
    constructor(inputs, outputs, gen, parent) {
        if (typeof (inputs) == 'number') // אם מקבלים מספר אינפוטים כמספר
            this.inputs = lor(Array(inputs).fillNull().map(function (v,i) { return arrRandom(); }), "inputs");
        else if (typeof (inputs) == 'object') //אם כמערך (אובייקט)
            this.inputs = inputs;
        if (typeof (outputs) == 'number') // אאוטפוטים אפשריי כמספר
            this.outputs = Array(outputs);
        else if (typeof (outputs) == 'object') //אם כמערך (אובייקט)
            this.outputs = outputs;
        this.gen = gen; 
        this.parent = parent;
    }
    // חישוב פיטנס
    fitness(score, time) {
        return score / time;
    }
    // קבלת גן ספציפי לפי אינפוט מסויים ואאוטפוט מסוים
    geio(input, output) {
        lor(input, "in");
        lor(output, "op");
        return this.gen[input * output] //TODO: דורש שינוי כלשהו אני די בטוח 
    }
    // לכאן מכניסים עדכונים של קלט
    update(inputs) {
        //inputs = arr with one of the values [-1,0,1]
        var toreturn = []
        // רץ על האינפוטים שקיבלנו
        for (var index = 0; index < inputs.length; index++) {
            lor(this, "this")
            //inputs[index] + 1 * lor(this.inputs[index] + 1, "inputs[index]") 
            var inp = lor(this.inputs[index] + 1, "inputs[index]") // חישוב גן האאוטפוט של האינפוט
            toreturn.push(lor(this.geio(index, inp), "logio")) // החזרת פלט המתבקש ושמירתו בצד
        }
        lor(toreturn, "toreturn");
        var outputs = this.outputs.map(function (v) { return v });
        for (var index = 0; index < this.outputs.length; index++) {// לרוץ על כל הפלטים האפשריים
            outputs[index] = toreturn.filter( // מיון למחוק ריקים
                function (v, i) { if (v == index && v != outputnull()) { return true } }
            ).length > 0 ? this.outputs[index] : outputnull();
        }
        this._parent.update(this, true)// עדכון ההורה
        return outputs.filter(function (v) { if (v != outputnull()) return true }) // החזרה אחרי פילטר
    }
}
// בדיקה
Generation.default().binots.forEach(function (element) {
    lor(element, "element")
}, this);
// שימוש כשורת פקודה לבדיקה מהירה:
// node index.js input1,input2,input3,input4,... return w/a/s/d
lor((new firstGeneration(10, 10, process.argv[2].split(",") ? process.argv[2].split(",") : basicKeys)).generation.binots[0].update([0, 1, -1]), "first")
