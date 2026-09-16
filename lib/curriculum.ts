export interface LessonProject {
  title: string;
  description: string;
  code: string;
  outcome: string;
}

export interface LessonDay {
  id: number;
  day: number;
  title: string;
  module: string;
  moduleId: string;
  description: string;
  docsLink: string;
  codeSnippet: string;
  summaryNotes: string[];
  projects?: LessonProject[];
  videoStartTime?: number;
  videoEndTime?: number;
  exercise: {
    prompt: string;
    starterCode: string;
    solutionCode: string;
    hint: string;
  };
}

export interface ModuleGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  days: LessonDay[];
}

export const CURRICULUM_DATA: LessonDay[] = [
  // MODULE 1: Basics & Data Types
  {
    id: 1,
    day: 1,
    title: "Introduction & JavaScript Comments",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Learn how to write single-line and multi-line comments in JavaScript to explain your code.",
    videoStartTime: 84,
    videoEndTime: 170,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#comments",
    codeSnippet: `// This is an inline single-line comment

/* 
  This is a multi-line comment
  JavaScript ignores comments during execution.
*/
let greeting = "Hello, JavaScript!";
console.log(greeting);`,
    summaryNotes: [
      "Inline comments begin with //",
      "Multi-line comments start with /* and end with */",
      "Comments are ignored by the JavaScript engine and are used for documentation and debugging."
    ],
    exercise: {
      prompt: "Add a single-line comment saying 'My first JS comment' and a multi-line comment above the variable declaration.",
      starterCode: `let myName = "Student";\nconsole.log(myName);`,
      solutionCode: `// My first JS comment\n/* \n   Student Name Variable \n*/\nlet myName = "Student";\nconsole.log(myName);`,
      hint: "Use // for single-line comments and /* */ for multi-line comments."
    }
  },
  {
    id: 2,
    day: 2,
    title: "Data Types & Declaring Variables",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Understand JavaScript's 7 fundamental data types and how to declare variables using var, let, and const.",
    videoStartTime: 170,
    videoEndTime: 275,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
    codeSnippet: `// 7 Data Types: undefined, null, boolean, string, symbol, number, object

var myName = "Beau"; // string
let age = 28; // number
const isLearning = true; // boolean
let unassigned; // undefined
let emptyValue = null; // null`,
    summaryNotes: [
      "JavaScript features primitive data types: String, Number, Boolean, Undefined, Null, Symbol, and Object.",
      "var allows function scope, while let and const provide block scope.",
      "const variables cannot be reassigned after declaration."
    ],
    exercise: {
      prompt: "Declare a string variable 'favoriteLanguage' equal to 'JavaScript' and a number 'years' equal to 1.",
      starterCode: `// Declare your variables below\n`,
      solutionCode: `let favoriteLanguage = "JavaScript";\nconst years = 1;\nconsole.log(favoriteLanguage, years);`,
      hint: "Use let or const to declare variables."
    }
  },
  {
    id: 3,
    day: 3,
    title: "Storing Values with Assignment Operator",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Learn how the assignment operator (=) assigns values from right to left.",
    videoStartTime: 275,
    videoEndTime: 380,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment",
    codeSnippet: `var a;
var b = 2;
console.log(a); // undefined

a = 7; // Assigns 7 to variable 'a'
b = a; // Assigns value of 'a' (7) to 'b'

console.log(a); // 7
console.log(b); // 7`,
    summaryNotes: [
      "The '=' sign is the assignment operator, not an equality operator.",
      "Assignment always evaluates the expression on the right first and stores it into the left variable.",
      "Uninitialized variables hold the value 'undefined'."
    ],
    exercise: {
      prompt: "Assign value 10 to variable 'x', then assign the value of 'x' to variable 'y'.",
      starterCode: `let x;\nlet y;\n// Assign values below\n`,
      solutionCode: `let x;\nlet y;\nx = 10;\ny = x;\nconsole.log(x, y);`,
      hint: "Assign x = 10 first, then y = x."
    }
  },
  {
    id: 4,
    day: 4,
    title: "Uninitialized Variables & Case Sensitivity",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Understand uninitialized variables resulting in NaN and camelCase naming conventions.",
    videoStartTime: 460,
    videoEndTime: 620,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations",
    codeSnippet: `// Variable declarations
var studlyCapVar;
var properCamelCase;
var titleCaseOver;

// Variable assignments (camelCase)
studlyCapVar = 10;
properCamelCase = "A String";
titleCaseOver = 9000;

console.log(studlyCapVar, properCamelCase, titleCaseOver);`,
    summaryNotes: [
      "JavaScript variable names are case sensitive: myVar and myvar are different variables.",
      "Best practice in JS is to use camelCase (e.g. studlyCapVar).",
      "Performing math on uninitialized variables yields NaN (Not a Number)."
    ],
    exercise: {
      prompt: "Fix the capitalization so all variables follow camelCase format.",
      starterCode: `var StUDLyCapVaR;\nvar TitleCaseOver;\n// Fix declaration and usage`,
      solutionCode: `var studlyCapVar = 10;\nvar titleCaseOver = 9000;\nconsole.log(studlyCapVar, titleCaseOver);`,
      hint: "First word lowercase, subsequent words capitalized (e.g., studlyCapVar)."
    }
  },
  {
    id: 5,
    day: 5,
    title: "Basic Math Operations",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Perform addition, subtraction, multiplication, division, incrementing, and decrementing.",
    videoStartTime: 620,
    videoEndTime: 1040,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#arithmetic_operators",
    codeSnippet: `let sum = 10 + 10;      // 20
let difference = 45 - 33; // 12
let product = 8 * 10;     // 80
let quotient = 66 / 33;   // 2

let myVar = 87;
myVar++; // Increment by 1 -> 88
myVar--; // Decrement by 1 -> 87`,
    summaryNotes: [
      "Use +, -, *, / for standard arithmetic.",
      "Use ++ to increment a variable by 1.",
      "Use -- to decrement a variable by 1."
    ],
    exercise: {
      prompt: "Create a variable 'count' set to 5, increment it twice, and multiply it by 3.",
      starterCode: `let count = 5;\n// Modify count below\n`,
      solutionCode: `let count = 5;\ncount++;\ncount++;\ncount = count * 3;\nconsole.log(count); // 21`,
      hint: "Use count++ to increment twice."
    }
  },
  {
    id: 6,
    day: 6,
    title: "Decimals, Remainder (Modulo) & Compound Assignment",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Work with float numbers, modulo operator (%), and shortcut operators (+=, -=, *=, /=).",
    videoStartTime: 1040,
    videoEndTime: 1660,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators",
    codeSnippet: `let remainder = 11 % 3; // 2 (11 divided by 3 has remainder 2)

let a = 3;
let b = 17;
let c = 12;

a += 12; // a = a + 12 (15)
b -= 9;  // b = b - 9  (8)
c *= 5;  // c = c * 5  (60)`,
    summaryNotes: [
      "The remainder operator (%) returns the remainder of integer division.",
      "Modulo is often used to check if a number is even (num % 2 === 0) or odd.",
      "Compound assignment operators (+=, -=, *=, /=) modify a variable in-place."
    ],
    exercise: {
      prompt: "Use compound operators to add 5 to 'num', multiply 'num' by 2, and find remainder when divided by 3.",
      starterCode: `let num = 10;\n// Modify num below\n`,
      solutionCode: `let num = 10;\nnum += 5; // 15\nnum *= 2; // 30\nlet rem = num % 3; // 0\nconsole.log(num, rem);`,
      hint: "Use num += 5 and num *= 2."
    }
  },
  {
    id: 7,
    day: 7,
    title: "String Variables, Escaping Quotes & Concatenation",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Create string literals, escape special characters, and join strings together.",
    videoStartTime: 1660,
    videoEndTime: 2360,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    codeSnippet: `var myFirstName = "Alan";
var myLastName = "Turing";

// Escaping quotes with backslash \\
var sampleStr = "I am a \\"double quoted\\" string inside \\"double quotes\\".";

// Alternatively use single quotes or backticks
var cleanStr = 'First line\\n\\t\\\\Second line';

// String concatenation
var ourStr = "I come first. " + "I come second.";
var myStr = "First part. ";
myStr += "Second part.";`,
    summaryNotes: [
      "Escape characters using backslash (\\\", \\', \\n, \\t, \\\\).",
      "Concatenate strings using the '+' or '+=' operator.",
      "Strings can be enclosed in double quotes, single quotes, or template backticks."
    ],
    exercise: {
      prompt: "Construct a string 'greeting' containing 'Hello, ' + your name + '!' using the '+' operator.",
      starterCode: `let name = "Developer";\nlet greeting;\n// Construct greeting below`,
      solutionCode: `let name = "Developer";\nlet greeting = "Hello, " + name + "!";\nconsole.log(greeting);`,
      hint: "Concatenate string literals with '+' operator."
    }
  },
  {
    id: 8,
    day: 8,
    title: "String Length & Bracket Notation",
    module: "Module 1: Basics & Data Types",
    moduleId: "basics-data-types",
    description: "Access individual characters in strings using zero-indexed bracket notation and .length.",
    videoStartTime: 2360,
    videoEndTime: 3080,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
    codeSnippet: `let firstName = "Ada";
let nameLength = firstName.length; // 3

// Zero-indexing: First character is index 0
let firstLetter = firstName[0]; // "A"
let lastLetter = firstName[firstName.length - 1]; // "a"

// String Immutability: String values cannot be altered character-by-character
let str = "Jello World";
// str[0] = "H"; // Error!
str = "Hello World"; // Must reassign entire string`,
    summaryNotes: [
      "Use .length property to retrieve string character count.",
      "Bracket notation [0] accesses the character at zero-indexed position.",
      "To find the last character, use str[str.length - 1].",
      "Strings are immutable in JavaScript."
    ],
    exercise: {
      prompt: "Find the 3rd character and the last character of string 'language' = 'JavaScript'.",
      starterCode: `let language = "JavaScript";\nlet thirdChar;\nlet lastChar;`,
      solutionCode: `let language = "JavaScript";\nlet thirdChar = language[2]; // 'v'\nlet lastChar = language[language.length - 1]; // 't'\nconsole.log(thirdChar, lastChar);`,
      hint: "Remember zero indexing: 3rd char is index 2."
    }
  },

  // MODULE 2: Arrays & Logic
  {
    id: 9,
    day: 9,
    title: "Storing Multiple Values with Arrays",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Store sequential items and nested (multi-dimensional) lists with JavaScript Arrays.",
    videoStartTime: 3080,
    videoEndTime: 3260,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    codeSnippet: `// Simple Array
let ourArray = ["John", 23];

// Multi-Dimensional (Nested) Array
let teams = [["Bulls", 23], ["White Sox", 45]];
console.log(teams[0]); // ["Bulls", 23]`,
    summaryNotes: [
      "Arrays allow storing multiple values in a single variable.",
      "Elements inside arrays can be of any data type, including other arrays."
    ],
    exercise: {
      prompt: "Create a nested array 'myList' containing two sub-arrays with a string and a number each.",
      starterCode: `// Declare myList below\n`,
      solutionCode: `let myList = [["Apples", 5], ["Bananas", 12]];\nconsole.log(myList);`,
      hint: "Use nested square brackets [ ['item', count] ]."
    }
  },
  {
    id: 10,
    day: 10,
    title: "Accessing & Modifying Array Data",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Access and mutate elements in single and multi-dimensional arrays using index brackets.",
    videoStartTime: 3260,
    videoEndTime: 3550,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    codeSnippet: `let ourData = [50, 60, 70];
let data = ourData[0]; // 50

// Arrays ARE mutable!
ourData[1] = 99; // [50, 99, 70]

// Multi-dimensional indexing
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let item = matrix[1][2]; // 6 (2nd sub-array, 3rd element)`,
    summaryNotes: [
      "Unlike strings, array elements can be modified directly by index.",
      "Multi-dimensional indexing uses consecutive bracket notations: matrix[row][col]."
    ],
    exercise: {
      prompt: "Change the first element of array 'scores' from 80 to 95 and log it.",
      starterCode: `let scores = [80, 85, 90];\n// Modify scores[0] below`,
      solutionCode: `let scores = [80, 85, 90];\nscores[0] = 95;\nconsole.log(scores);`,
      hint: "Use scores[0] = 95."
    }
  },
  {
    id: 11,
    day: 11,
    title: "Array Methods: push, pop, shift, unshift",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Master basic array manipulation methods to add and remove items from ends and beginnings of arrays.",
    videoStartTime: 3550,
    videoEndTime: 4050,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    codeSnippet: `let arr = ["Stimpy", "J", "cat"];

// push(): Append to end
arr.push(["happy", "joy"]); 

// pop(): Remove from end
let removedEnd = arr.pop(); 

// shift(): Remove from beginning
let removedStart = arr.shift(); 

// unshift(): Add to beginning
arr.unshift("Happy");`,
    summaryNotes: [
      "push() adds items to the end of an array.",
      "pop() removes and returns the last item.",
      "shift() removes and returns the first item.",
      "unshift() adds items to the start of an array."
    ],
    exercise: {
      prompt: "Use array methods to remove the first item and add 'JavaScript' to the end of 'topics'.",
      starterCode: `let topics = ["HTML", "CSS", "Python"];\n// Modify topics below`,
      solutionCode: `let topics = ["HTML", "CSS", "Python"];\ntopics.shift();\ntopics.push("JavaScript");\nconsole.log(topics); // ["CSS", "Python", "JavaScript"]`,
      hint: "Use topics.shift() then topics.push('JavaScript')."
    }
  },
  {
    id: 12,
    day: 12,
    title: "Boolean Values & If Statements",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Control program flow using true/false booleans and conditional if blocks.",
    videoStartTime: 5160,
    videoEndTime: 5380,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    codeSnippet: `function welcomeToBooleans() {
  return true; // Booleans are true or false (no quotes)
}

function ourTrueOrFalse(isItTrue) {
  if (isItTrue) {
    return "Yes, it's true";
  }
  return "No, it's false";
}

console.log(ourTrueOrFalse(true));`,
    summaryNotes: [
      "Booleans represent true or false values.",
      "if statements execute code blocks only when the condition evaluates to true."
    ],
    exercise: {
      prompt: "Write an if statement that checks if 'isRaining' is true, returning 'Take an umbrella'.",
      starterCode: `function checkWeather(isRaining) {\n  // Add if condition below\n}`,
      solutionCode: `function checkWeather(isRaining) {\n  if (isRaining) {\n    return "Take an umbrella";\n  }\n  return "Enjoy the sunshine";\n}\nconsole.log(checkWeather(true));`,
      hint: "Use `if (isRaining)` inside function."
    }
  },
  {
    id: 13,
    day: 13,
    title: "Equality Operators (== vs ===)",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Understand the difference between loose equality (==) with type conversion and strict equality (===).",
    videoStartTime: 5380,
    videoEndTime: 5760,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
    codeSnippet: `// Equality Operator (==) - coerces types
3 == '3'; // true

// Strict Equality Operator (===) - no type conversion
3 === '3'; // false (number vs string)
3 === 3;   // true

// Strict Inequality Operator (!==)
3 !== '3'; // true`,
    summaryNotes: [
      "== performs type conversion before comparison.",
      "=== checks both value AND data type strictly without conversion.",
      "Best practice: Always default to strict equality (=== and !==)."
    ],
    exercise: {
      prompt: "Compare 10 and '10' using both == and === and log results.",
      starterCode: `let num = 10;\nlet str = '10';\n// Log comparisons below`,
      solutionCode: `let num = 10;\nlet str = '10';\nconsole.log(num == str);  // true\nconsole.log(num === str); // false`,
      hint: "Compare with num == str and num === str."
    }
  },
  {
    id: 14,
    day: 14,
    title: "Logical Operators (AND &&, OR ||)",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Combine multiple boolean conditions with logical AND (&&) and logical OR (||).",
    videoStartTime: 6380,
    videoEndTime: 6620,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
    codeSnippet: `// Logical AND (&&): Both conditions must be true
function testLogicalAnd(val) {
  if (val >= 25 && val <= 50) {
    return "Yes, in range";
  }
  return "No";
}

// Logical OR (||): At least one condition must be true
function testLogicalOr(val) {
  if (val < 10 || val > 20) {
    return "Outside range";
  }
  return "Inside range";
}`,
    summaryNotes: [
      "Logical AND (&&) returns true only if BOTH operands evaluate to true.",
      "Logical OR (||) returns true if AT LEAST ONE operand evaluates to true."
    ],
    exercise: {
      prompt: "Write a function 'checkAge' returning 'Eligible' if age is between 18 and 65 inclusive.",
      starterCode: `function checkAge(age) {\n  // Write condition using && operator\n}`,
      solutionCode: `function checkAge(age) {\n  if (age >= 18 && age <= 65) {\n    return "Eligible";\n  }\n  return "Not Eligible";\n}\nconsole.log(checkAge(25));`,
      hint: "Use `if (age >= 18 && age <= 65)`."
    }
  },
  {
    id: 15,
    day: 15,
    title: "Else, Else If & Chaining Conditions",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Chain conditional logic with else and else if blocks in correct logical sequence.",
    videoStartTime: 6620,
    videoEndTime: 7250,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
    codeSnippet: `function testElseIf(val) {
  if (val > 10) {
    return "Greater than 10";
  } else if (val < 5) {
    return "Smaller than 5";
  } else {
    return "Between 5 and 10";
  }
}

// Order matters! Check small conditions first when using <
console.log(testElseIf(7));`,
    summaryNotes: [
      "else blocks execute when preceding if conditions evaluate to false.",
      "else if allows testing multiple alternative conditions in order.",
      "Logical order is critical: statements are evaluated top-to-bottom."
    ],
    exercise: {
      prompt: "Write a function 'scoreGrade' returning 'A' for score >= 90, 'B' for >= 80, 'C' for >= 70, and 'F' otherwise.",
      starterCode: `function scoreGrade(score) {\n  // Implement grade logic\n}`,
      solutionCode: `function scoreGrade(score) {\n  if (score >= 90) return "A";\n  else if (score >= 80) return "B";\n  else if (score >= 70) return "C";\n  else return "F";\n}\nconsole.log(scoreGrade(85));`,
      hint: "Check scores in descending order: >= 90, then >= 80, etc."
    }
  },
  {
    id: 16,
    day: 16,
    title: "Switch Statements & Default Options",
    module: "Module 2: Arrays & Logic",
    moduleId: "arrays-logic",
    description: "Replace long if-else chains with clear switch cases and default fallbacks.",
    videoStartTime: 7250,
    videoEndTime: 7850,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
    codeSnippet: `function caseInSwitch(val) {
  let answer = "";
  switch (val) {
    case 1:
      answer = "alpha";
      break;
    case 2:
      answer = "beta";
      break;
    case 3:
      answer = "gamma";
      break;
    default:
      answer = "stuff";
      break;
  }
  return answer;
}`,
    summaryNotes: [
      "switch statements match expression values strictly (===) against case statements.",
      "The 'break' keyword prevents fall-through into subsequent cases.",
      "The 'default' statement runs when no matching cases are found."
    ],
    exercise: {
      prompt: "Create a switch statement matching fruit names ('apple' -> 'Red', 'banana' -> 'Yellow', default -> 'Unknown').",
      starterCode: `function fruitColor(fruit) {\n  // Write switch statement below\n}`,
      solutionCode: `function fruitColor(fruit) {\n  switch (fruit) {\n    case "apple": return "Red";\n    case "banana": return "Yellow";\n    default: return "Unknown";\n  }\n}\nconsole.log(fruitColor("apple"));`,
      hint: "Use case 'apple': return 'Red'; break or direct return."
    }
  },

  // MODULE 3: Functions & Scope
  {
    id: 17,
    day: 17,
    title: "Writing Reusable Functions",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Define reusable blocks of code using function declarations and execute them.",
    videoStartTime: 4050,
    videoEndTime: 4180,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    codeSnippet: `function ourReusableFunction() {
  console.log("Heyya, World!");
}

// Invoke / Call the function
ourReusableFunction();
ourReusableFunction();`,
    summaryNotes: [
      "Functions organize reusable code logic into callable blocks.",
      "Call a function by appending parentheses () to its identifier name."
    ],
    exercise: {
      prompt: "Define a function 'sayHello' that logs 'Hello World' and call it twice.",
      starterCode: `// Write sayHello function below\n`,
      solutionCode: `function sayHello() {\n  console.log("Hello World");\n}\nsayHello();\nsayHello();`,
      hint: "Use `function sayHello() { ... }` then `sayHello()`."
    }
  },
  {
    id: 18,
    day: 18,
    title: "Function Arguments & Parameters",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Pass dynamic inputs to functions via parameters and process them.",
    videoStartTime: 4180,
    videoEndTime: 4290,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    codeSnippet: `function functionWithArgs(a, b) {
  console.log(a + b);
}

functionWithArgs(10, 5); // Outputs 15
functionWithArgs(7, 9);  // Outputs 16`,
    summaryNotes: [
      "Parameters are placeholder variables defined in function declarations.",
      "Arguments are actual values passed into the function upon invocation."
    ],
    exercise: {
      prompt: "Create a function 'multiply' taking two arguments x and y, logging their product.",
      starterCode: `// Define multiply function below\n`,
      solutionCode: `function multiply(x, y) {\n  console.log(x * y);\n}\nmultiply(4, 5); // 20`,
      hint: "Function signature: `function multiply(x, y)`."
    }
  },
  {
    id: 19,
    day: 19,
    title: "Global vs Local Scope in Functions",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Understand variable visibility, global scope, block/function scope, and local variable shadowing.",
    videoStartTime: 4290,
    videoEndTime: 4660,
    docsLink: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
    codeSnippet: `var outerOutfit = "T-Shirt"; // Global variable

function myOutfit() {
  var outerOutfit = "Sweater"; // Local variable shadows global
  return outerOutfit;
}

console.log(myOutfit());     // "Sweater"
console.log(outerOutfit);    // "T-Shirt"`,
    summaryNotes: [
      "Variables declared outside functions have global scope.",
      "Variables declared inside a function have local scope and are accessible only within that function.",
      "Local variables shadow (override) global variables with identical names inside their scope."
    ],
    exercise: {
      prompt: "Declare a global variable 'app' = 'Web', then declare a function with a local 'app' = 'Mobile' returning local app.",
      starterCode: `let app = "Web";\nfunction getApp() {\n  // Add local variable\n}`,
      solutionCode: `let app = "Web";\nfunction getApp() {\n  let app = "Mobile";\n  return app;\n}\nconsole.log(getApp()); // "Mobile"\nconsole.log(app);    // "Web"`,
      hint: "Declare `let app = 'Mobile'` inside getApp function body."
    }
  },
  {
    id: 20,
    day: 20,
    title: "Return Values & Undefined Return",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Pass computed outputs back from functions using the return keyword.",
    videoStartTime: 4660,
    videoEndTime: 4980,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    codeSnippet: `function minusSeven(num) {
  return num - 7;
}

console.log(minusSeven(10)); // 3

// Functions without an explicit return statement return 'undefined'
function addFive(num) {
  sum = sum + 5; // no return!
}
console.log(addFive(5)); // undefined`,
    summaryNotes: [
      "Use return to send calculated values back to the caller.",
      "Executing return instantly terminates function execution.",
      "Functions without return explicitly produce undefined."
    ],
    exercise: {
      prompt: "Create a function 'cube' returning the cube of a number (num * num * num).",
      starterCode: `function cube(num) {\n  // Return cube below\n}`,
      solutionCode: `function cube(num) {\n  return num * num * num;\n}\nconsole.log(cube(3)); // 27`,
      hint: "Use `return num ** 3;` or `return num * num * num;`."
    }
  },
  {
    id: 21,
    day: 21,
    title: "Stand in Line (Queue Concept)",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Build a queue data structure simulation using array push() and shift() in a function.",
    videoStartTime: 4980,
    videoEndTime: 5160,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
    codeSnippet: `function nextInLine(arr, item) {
  arr.push(item);      // Add item to end of queue
  return arr.shift();  // Remove and return item from front
}

let testArr = [1, 2, 3, 4, 5];

console.log("Before: " + JSON.stringify(testArr));
console.log(nextInLine(testArr, 6));
console.log("After: " + JSON.stringify(testArr));`,
    summaryNotes: [
      "A Queue is an abstract data structure where items are processed First-In, First-Out (FIFO).",
      "push() enqueues items at the back, shift() dequeues items from the front."
    ],
    exercise: {
      prompt: "Implement nextInLine function that pushes item to arr and shifts first element out.",
      starterCode: `function nextInLine(arr, item) {\n  // Code here\n}`,
      solutionCode: `function nextInLine(arr, item) {\n  arr.push(item);\n  return arr.shift();\n}\nconsole.log(nextInLine([1,2,3], 4)); // 1`,
      hint: "push item first, then return arr.shift()."
    }
  },
  {
    id: 22,
    day: 22,
    title: "Returning Booleans & Return Early Pattern",
    module: "Module 3: Functions & Scope",
    moduleId: "functions-scope",
    description: "Simplify conditional boolean returns and exit functions early on invalid conditions.",
    videoStartTime: 7850,
    videoEndTime: 8120,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
    codeSnippet: `// Anti-pattern:
function isLessOld(a, b) {
  if (a < b) return true;
  else return false;
}

// Clean pattern: Directly return boolean expression
function isLess(a, b) {
  return a < b;
}

// Return Early Pattern for Guard Clauses
function abTest(a, b) {
  if (a < 0 || b < 0) {
    return undefined; // Exit early!
  }
  return Math.round(Math.pow(Math.sqrt(a) + Math.sqrt(b), 2));
}`,
    summaryNotes: [
      "Comparison operators return boolean values directly: return a < b;",
      "Guard clauses use early returns to exit function execution when inputs are invalid."
    ],
    exercise: {
      prompt: "Refactor function to return boolean directly without if/else statements.",
      starterCode: `function isEqual(a, b) {\n  if (a === b) return true;\n  else return false;\n}`,
      solutionCode: `function isEqual(a, b) {\n  return a === b;\n}\nconsole.log(isEqual(5, 5)); // true`,
      hint: "Replace if/else block with `return a === b;`."
    }
  },

  // MODULE 4: Objects & Data Structures
  {
    id: 23,
    day: 23,
    title: "Build JavaScript Objects & Access Properties",
    module: "Module 4: Objects & Data Structures",
    moduleId: "objects-data",
    description: "Represent structured real-world data using JavaScript Objects, dot notation, and bracket notation.",
    videoStartTime: 8400,
    videoEndTime: 8800,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `let ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};

// Accessing properties with Dot Notation
let dogName = ourDog.name; // "Camper"

// Accessing properties with Bracket Notation (required for keys with spaces)
let myObj = {
  "an entree": "hamburger",
  "my side": "veggies"
};
let entreeValue = myObj["an entree"];`,
    summaryNotes: [
      "Objects store data in key-value pairs.",
      "Use dot notation (.property) when key is a valid identifier without spaces.",
      "Use bracket notation ['property'] when key contains spaces or special characters."
    ],
    exercise: {
      prompt: "Access the 'make' property of car object using dot notation and 'fuel type' using bracket notation.",
      starterCode: `let car = { make: "Toyota", "fuel type": "Hybrid" };\nlet make;\nlet fuel;`,
      solutionCode: `let car = { make: "Toyota", "fuel type": "Hybrid" };\nlet make = car.make;\nlet fuel = car["fuel type"];\nconsole.log(make, fuel);`,
      hint: "car.make for dot notation, car['fuel type'] for bracket notation."
    }
  },
  {
    id: 24,
    day: 24,
    title: "Updating, Adding & Deleting Object Properties",
    module: "Module 4: Objects & Data Structures",
    moduleId: "objects-data",
    description: "Mutate existing properties, insert new key-value pairs, and remove keys with delete keyword.",
    videoStartTime: 8920,
    videoEndTime: 9220,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `let ourDog = {
  "name": "Camper",
  "legs": 4,
  "bark": "bow-wow"
};

// Updating property
ourDog.name = "Happy Camper";

// Adding new property
ourDog.bark = "bow-wow!";
ourDog.color = "brown";

// Deleting property
delete ourDog.legs;
console.log(ourDog);`,
    summaryNotes: [
      "Object properties are updated by assignment: obj.key = value.",
      "Assigning to a non-existent property adds it to the object automatically.",
      "The delete keyword removes a property from an object."
    ],
    exercise: {
      prompt: "Update 'name' to 'JavaScript', add property 'difficulty' = 'Intermediate', and delete 'outdated'.",
      starterCode: `let course = { name: "JS", outdated: true };\n// Mutate course object below`,
      solutionCode: `let course = { name: "JS", outdated: true };\ncourse.name = "JavaScript";\ncourse.difficulty = "Intermediate";\ndelete course.outdated;\nconsole.log(course);`,
      hint: "Use dot notation assignments and `delete course.outdated`."
    }
  },
  {
    id: 25,
    day: 25,
    title: "Objects for Lookups & hasOwnProperty",
    module: "Module 4: Objects & Data Structures",
    moduleId: "objects-data",
    description: "Use objects as fast key-value lookup dictionaries and check key existence with hasOwnProperty.",
    videoStartTime: 9220,
    videoEndTime: 9520,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `// Replacing Switch with Object Lookup
function phoneticLookup(val) {
  let lookup = {
    "alpha": "Adams",
    "bravo": "Boston",
    "charlie": "Chicago"
  };
  return lookup[val] || "";
}

// Testing for properties with hasOwnProperty()
let myObj = { top: "hat", bottom: "pants" };

function checkObj(checkProp) {
  if (myObj.hasOwnProperty(checkProp)) {
    return myObj[checkProp];
  } else {
    return "Not Found";
  }
}
console.log(checkObj("top")); // "hat"`,
    summaryNotes: [
      "Objects can replace switch statements for O(1) key-value dictionary lookups.",
      "obj.hasOwnProperty(propName) returns true if the object contains propName as its own property."
    ],
    exercise: {
      prompt: "Write a lookup function 'getCapital' returning country capital using object lookup.",
      starterCode: `function getCapital(country) {\n  const capitals = { France: "Paris", Japan: "Tokyo" };\n  // Return capital or "Unknown"\n}`,
      solutionCode: `function getCapital(country) {\n  const capitals = { France: "Paris", Japan: "Tokyo" };\n  return capitals[country] || "Unknown";\n}\nconsole.log(getCapital("Japan")); // "Tokyo"`,
      hint: "Access capitals[country] or default to 'Unknown'."
    }
  },
  {
    id: 26,
    day: 26,
    title: "Manipulating Complex & Nested Objects",
    module: "Module 4: Objects & Data Structures",
    moduleId: "objects-data",
    description: "Work with complex JSON-like nested objects containing arrays and sub-objects.",
    videoStartTime: 9520,
    videoEndTime: 9960,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `let myStorage = {
  "car": {
    "inside": {
      "glove box": "maps",
      "passenger seat": "crumbs"
    },
    "outside": {
      "trunk": "jack"
    }
  }
};

// Chain dot & bracket notation
let gloveBoxContents = myStorage.car.inside["glove box"]; // "maps"

let myPlants = [
  { type: "flowers", list: ["rose", "tulip", "dandelion"] },
  { type: "trees", list: ["fir", "pine", "birch"] }
];
let secondTree = myPlants[1].list[1]; // "pine"`,
    summaryNotes: [
      "Access nested object properties by chaining dot/bracket notations.",
      "Access nested arrays by chaining bracket indices after object keys."
    ],
    exercise: {
      prompt: "Access 'tulip' from the myPlants nested array structure.",
      starterCode: `let myPlants = [\n  { type: "flowers", list: ["rose", "tulip"] }\n];\nlet flower;`,
      solutionCode: `let myPlants = [\n  { type: "flowers", list: ["rose", "tulip"] }\n];\nlet flower = myPlants[0].list[1];\nconsole.log(flower); // "tulip"`,
      hint: "myPlants[0].list[1]"
    }
  },
  {
    id: 27,
    day: 27,
    title: "Record Collection Project",
    module: "Module 4: Objects & Data Structures",
    moduleId: "objects-data",
    description: "Build a record collection updater function handling nested object mutations.",
    videoStartTime: 9960,
    videoEndTime: 10300,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `let collection = {
  2548: { album: "Slippery When Wet", artist: "Bon Jovi", tracks: ["Let It Rock"] },
  2468: { album: "1999", artist: "Prince", tracks: ["1999", "Little Red Corvette"] }
};

function updateRecords(id, prop, value) {
  if (value === "") {
    delete collection[id][prop];
  } else if (prop === "tracks") {
    collection[id][prop] = collection[id][prop] || [];
    collection[id][prop].push(value);
  } else {
    collection[id][prop] = value;
  }
  return collection;
}

updateRecords(2548, "artist", "Bon Jovi");`,
    summaryNotes: [
      "Practice updating nested objects based on conditional property checks.",
      "Ensure array properties are initialized before pushing items."
    ],
    exercise: {
      prompt: "Write logic to delete property when value is empty string, else assign property value.",
      starterCode: `function updateProp(obj, prop, val) {\n  // Implement logic\n}`,
      solutionCode: `function updateProp(obj, prop, val) {\n  if (val === "") delete obj[prop];\n  else obj[prop] = val;\n  return obj;\n}\nconsole.log(updateProp({ title: "JS" }, "title", ""));`,
      hint: "Check `val === ''` to delete."
    }
  },

  // MODULE 5: Loops & Iteration
  {
    id: 28,
    day: 28,
    title: "Iterate with While Loops",
    module: "Module 5: Loops & Iteration",
    moduleId: "loops-iteration",
    description: "Run code repeatedly while a specified boolean condition evaluates to true.",
    videoStartTime: 10300,
    videoEndTime: 10450,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
    codeSnippet: `let myArray = [];
let i = 0;

while (i < 5) {
  myArray.push(i);
  i++; // Increment loop control counter!
}

console.log(myArray); // [0, 1, 2, 3, 4]`,
    summaryNotes: [
      "while loops repeat as long as condition evaluates to true.",
      "Always ensure the loop condition will eventually become false to prevent infinite loops."
    ],
    exercise: {
      prompt: "Push numbers 5 down to 0 into 'numbers' array using a while loop.",
      starterCode: `let numbers = [];\nlet i = 5;\n// Write while loop below`,
      solutionCode: `let numbers = [];\nlet i = 5;\nwhile (i >= 0) {\n  numbers.push(i);\n  i--;\n}\nconsole.log(numbers); // [5, 4, 3, 2, 1, 0]`,
      hint: "Use condition `i >= 0` and decrement `i--`."
    }
  },
  {
    id: 29,
    day: 29,
    title: "Iterate with For Loops",
    module: "Module 5: Loops & Iteration",
    moduleId: "loops-iteration",
    description: "Execute loops with precise initialization, condition, and increment expressions.",
    videoStartTime: 10450,
    videoEndTime: 10890,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
    codeSnippet: `// Standard For Loop: for (initialization; condition; final-expression)
let ourArray = [];
for (let i = 1; i <= 5; i++) {
  ourArray.push(i);
}

// Iterate Odd Numbers
let oddArray = [];
for (let i = 1; i < 10; i += 2) {
  oddArray.push(i); // [1, 3, 5, 7, 9]
}

// Count Backwards
let backArray = [];
for (let i = 10; i > 0; i -= 2) {
  backArray.push(i); // [10, 8, 6, 4, 2]
}`,
    summaryNotes: [
      "For loops consist of three optional expressions: initialization, condition, and increment/decrement.",
      "Modify the step expression (e.g. i += 2) to skip values or count backwards."
    ],
    exercise: {
      prompt: "Fill array 'evens' with even numbers from 2 to 10 inclusive using a for loop.",
      starterCode: `let evens = [];\n// Write for loop below`,
      solutionCode: `let evens = [];\nfor (let i = 2; i <= 10; i += 2) {\n  evens.push(i);\n}\nconsole.log(evens); // [2, 4, 6, 8, 10]`,
      hint: "Initialize `i = 2`, condition `i <= 10`, step `i += 2`."
    }
  },
  {
    id: 30,
    day: 30,
    title: "Iterating Through Arrays with For Loops",
    module: "Module 5: Loops & Iteration",
    moduleId: "loops-iteration",
    description: "Traverse array elements using array.length and for loops.",
    videoStartTime: 10890,
    videoEndTime: 11050,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
    codeSnippet: `let myArr = [2, 3, 4, 5, 6];
let total = 0;

for (let i = 0; i < myArr.length; i++) {
  total += myArr[i];
}

console.log(total); // 20`,
    summaryNotes: [
      "Loop condition index < array.length processes every item in order.",
      "Iterating arrays is a fundamental building block for data processing."
    ],
    exercise: {
      prompt: "Compute the product of all elements in array [2, 3, 4] using a for loop.",
      starterCode: `let arr = [2, 3, 4];\nlet product = 1;\n// Calculate product below`,
      solutionCode: `let arr = [2, 3, 4];\nlet product = 1;\nfor (let i = 0; i < arr.length; i++) {\n  product *= arr[i];\n}\nconsole.log(product); // 24`,
      hint: "Use `product *= arr[i]` inside loop."
    }
  },
  {
    id: 31,
    day: 31,
    title: "Nesting For Loops & Do...While Loops",
    module: "Module 5: Loops & Iteration",
    moduleId: "loops-iteration",
    description: "Process multi-dimensional arrays with nested loops and understand do...while guaranteed execution.",
    videoStartTime: 11050,
    videoEndTime: 11420,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
    codeSnippet: `// Nesting For Loops
function multiplyAll(arr) {
  let product = 1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      product *= arr[i][j];
    }
  }
  return product;
}

// Do...While Loop: Always runs AT LEAST ONCE
let myArray = [];
let i = 10;
do {
  myArray.push(i);
  i++;
} while (i < 5);

console.log(myArray); // [10]`,
    summaryNotes: [
      "Nested loops iterate over outer array rows and inner sub-array columns.",
      "do...while loops execute their body once BEFORE evaluating the condition."
    ],
    exercise: {
      prompt: "Multiply all numbers in nested matrix [[1,2], [3,4]].",
      starterCode: `let matrix = [[1, 2], [3, 4]];\nlet product = 1;\n// Write nested loops`,
      solutionCode: `let matrix = [[1, 2], [3, 4]];\nlet product = 1;\nfor (let i = 0; i < matrix.length; i++) {\n  for (let j = 0; j < matrix[i].length; j++) {\n    product *= matrix[i][j];\n  }\n}\nconsole.log(product); // 24`,
      hint: "Outer loop i, inner loop j."
    }
  },

  // MODULE 6: Advanced Concepts & ES6
  {
    id: 32,
    day: 32,
    title: "Math.random(), Math.floor() & Random Ranges",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Generate pseudo-random decimal fractions, integers, and numbers within min/max bounds.",
    videoStartTime: 11750,
    videoEndTime: 12150,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
    codeSnippet: `// Random fraction [0, 1)
let randFraction = Math.random(); 

// Random whole number 0 to 19
let randInteger = Math.floor(Math.random() * 20); 

// Random whole number within a range [min, max]
function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

console.log(randomRange(5, 15));`,
    summaryNotes: [
      "Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).",
      "Math.floor() rounds a decimal number down to the nearest integer.",
      "Formula for range [min, max]: Math.floor(Math.random() * (max - min + 1)) + min."
    ],
    exercise: {
      prompt: "Write a function 'rollDice' returning a random integer between 1 and 6 inclusive.",
      starterCode: `function rollDice() {\n  // Return random number 1 to 6\n}`,
      solutionCode: `function rollDice() {\n  return Math.floor(Math.random() * 6) + 1;\n}\nconsole.log(rollDice());`,
      hint: "Math.floor(Math.random() * 6) + 1."
    }
  },
  {
    id: 33,
    day: 33,
    title: "parseInt Function & Radix",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Parse string inputs into numeric integers with standard decimal and binary radices.",
    videoStartTime: 12150,
    videoEndTime: 12420,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt",
    codeSnippet: `// Standard parseInt
let num1 = parseInt("007"); // 7

// parseInt with Radix (base)
// Radix 2 = binary
let num2 = parseInt("10011", 2); // 19
console.log(num2);`,
    summaryNotes: [
      "parseInt(string) converts string representations of numbers to integers.",
      "The radix specifies the numeral system base (e.g. 2 for binary, 16 for hex, 10 for decimal)."
    ],
    exercise: {
      prompt: "Parse binary string '111' into an integer using parseInt with radix 2.",
      starterCode: `let binaryStr = "111";\nlet decimalNum;`,
      solutionCode: `let binaryStr = "111";\nlet decimalNum = parseInt(binaryStr, 2);\nconsole.log(decimalNum); // 7`,
      hint: "Use `parseInt(binaryStr, 2)`."
    }
  },
  {
    id: 34,
    day: 34,
    title: "Ternary Operator (Conditional Operator)",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Write concise one-line conditional expressions using condition ? exprIfTrue : exprIfFalse.",
    videoStartTime: 12420,
    videoEndTime: 12720,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
    codeSnippet: `// Single Ternary Operator
function checkEqual(a, b) {
  return a === b ? "Equal" : "Not Equal";
}

// Multiple (Nested) Ternaries
function checkSign(num) {
  return num > 0 ? "positive" : num < 0 ? "negative" : "zero";
}

console.log(checkSign(-5)); // "negative"`,
    summaryNotes: [
      "Ternary syntax: condition ? expressionIfTrue : expressionIfFalse.",
      "Ternaries work as inline expressions, making code concise for quick assignments."
    ],
    exercise: {
      prompt: "Use ternary operator to return 'Pass' if score >= 50 else 'Fail'.",
      starterCode: `function getResult(score) {\n  // Return ternary expression\n}`,
      solutionCode: `function getResult(score) {\n  return score >= 50 ? "Pass" : "Fail";\n}\nconsole.log(getResult(75)); // "Pass"`,
      hint: "Use `return score >= 50 ? 'Pass' : 'Fail';`."
    }
  },
  {
    id: 35,
    day: 35,
    title: "var vs let vs const & Object.freeze",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Compare scopes of var and let, declare constants, and prevent object mutations with Object.freeze.",
    videoStartTime: 12720,
    videoEndTime: 13560,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
    codeSnippet: `// let & const are block-scoped ({})
function checkScope() {
  let i = "function scope";
  if (true) {
    let i = "block scope";
    console.log("Block i is: ", i); // "block scope"
  }
  console.log("Function i is: ", i); // "function scope"
}

// Mutating array assigned to const
const s = [5, 7, 2];
s[0] = 2; // Works! Mutation allowed.

// Object.freeze prevents mutations
const MATH_CONSTANTS = { PI: 3.14 };
Object.freeze(MATH_CONSTANTS);
// MATH_CONSTANTS.PI = 99; // Throws error in strict mode!`,
    summaryNotes: [
      "let and const enforce block scope ({}), avoiding variable leakage.",
      "const prevents variable reassignment, but objects/arrays assigned to const remain mutable.",
      "Use Object.freeze(obj) to make objects completely immutable."
    ],
    exercise: {
      prompt: "Freeze object 'config' so its property 'theme' cannot be altered.",
      starterCode: `const config = { theme: "light" };\n// Freeze config below`,
      solutionCode: `const config = { theme: "light" };\nObject.freeze(config);\nconsole.log(Object.isFrozen(config)); // true`,
      hint: "Use `Object.freeze(config)`."
    }
  },
  {
    id: 36,
    day: 36,
    title: "Arrow Functions & Default Parameters",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Write concise ES6 arrow functions, single-expression returns, and default parameters.",
    videoStartTime: 13560,
    videoEndTime: 14050,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
    codeSnippet: `// Anonymous function
const magic = () => new Date();

// Arrow function with parameters
const myConcat = (arr1, arr2) => arr1.concat(arr2);
console.log(myConcat([1, 2], [3, 4]));

// Arrow function with default parameter
const greeting = (name = "Developer") => \`Hello \${name}\`;
console.log(greeting()); // "Hello Developer"`,
    summaryNotes: [
      "Arrow functions () => {} offer concise syntax for inline functions.",
      "Single-line arrow functions implicitly return their evaluated expression.",
      "Default parameters provide fallback values when arguments are omitted."
    ],
    exercise: {
      prompt: "Convert function to single-line arrow function 'square' returning x * x.",
      starterCode: `const square = function(x) {\n  return x * x;\n};`,
      solutionCode: `const square = (x) => x * x;\nconsole.log(square(4)); // 16`,
      hint: "Use `const square = (x) => x * x;`."
    }
  },
  {
    id: 37,
    day: 37,
    title: "Rest Operator & Spread Operator",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Gather variable function arguments with Rest (...args) and unpack arrays with Spread (...arr).",
    videoStartTime: 14050,
    videoEndTime: 14350,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    codeSnippet: `// Rest Operator: Gathers parameters into an array
const sum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};
console.log(sum(1, 2, 3, 4)); // 10

// Spread Operator: Unpacks array elements in-place
const arr1 = ['JAN', 'FEB', 'MAR'];
let arr2 = [...arr1]; // Copy array contents cleanly
arr1[0] = 'potato';
console.log(arr2); // ['JAN', 'FEB', 'MAR']`,
    summaryNotes: [
      "Rest operator (...args) bundles multiple arguments into a true Array.",
      "Spread operator (...arr) expands array elements into places where zero or more arguments are expected."
    ],
    exercise: {
      prompt: "Use spread operator to clone array 'original' into 'copy'.",
      starterCode: `const original = [1, 2, 3];\nlet copy;`,
      solutionCode: `const original = [1, 2, 3];\nlet copy = [...original];\nconsole.log(copy); // [1, 2, 3]`,
      hint: "Use `[...original]`."
    }
  },
  {
    id: 38,
    day: 38,
    title: "Destructuring Assignment (Objects & Arrays)",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Unpack values cleanly from objects and arrays into distinct variables.",
    videoStartTime: 14350,
    videoEndTime: 15300,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
    codeSnippet: `const voxel = { x: 3.6, y: 7.4, z: 6.54 };

// Object Destructuring with custom variable names
const { x: a, y: b, z: c } = voxel; // a = 3.6, b = 7.4

// Nested Object Destructuring
const LOCAL_FORECAST = {
  today: { min: 72, max: 83 }
};
const { today: { max: maxToday } } = LOCAL_FORECAST;

// Array Destructuring & Swapping
let [q, r] = [1, 2, 3, 4]; // q = 1, r = 2
let [x, y] = [10, 20];
[x, y] = [y, x]; // Swap variables cleanly!`,
    summaryNotes: [
      "Destructuring extracts object properties or array positions directly into variables.",
      "Enables clean variable swapping [x, y] = [y, x] without temporary variables."
    ],
    exercise: {
      prompt: "Destructure 'name' and 'age' from person object { name: 'Alice', age: 25 }.",
      starterCode: `const person = { name: "Alice", age: 25 };\n// Destructure name and age`,
      solutionCode: `const person = { name: "Alice", age: 25 };\nconst { name, age } = person;\nconsole.log(name, age);`,
      hint: "Use `const { name, age } = person;`."
    }
  },
  {
    id: 39,
    day: 39,
    title: "Template Literals",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Create multi-line strings and interpolate variables cleanly using backticks (`...`).",
    videoStartTime: 15300,
    videoEndTime: 15480,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
    codeSnippet: `const person = {
  name: "Zodiac Hasbro",
  age: 56
};

// Template literal with backticks and \${expression}
const greeting = \`Hello, my name is \${person.name}!
I am \${person.age} years old.\`;

console.log(greeting);`,
    summaryNotes: [
      "Template literals use backtick (\`) delimiters.",
      "Interpolate expressions directly with \${expression}.",
      "Preserve multi-line formatting without \\n escape characters."
    ],
    exercise: {
      prompt: "Construct a string using template literals: 'Item: [name], Price: $[price]'.",
      starterCode: `const item = "Book";\nconst price = 15;\nlet summary;`,
      solutionCode: `const item = "Book";\nconst price = 15;\nlet summary = \`Item: \${item}, Price: $\${price}\`;\nconsole.log(summary);`,
      hint: "Use backticks \`Item: \${item}, Price: $\${price}\`."
    }
  },
  {
    id: 40,
    day: 40,
    title: "Simple Fields & Declarative Functions in Objects",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Use ES6 object literal shorthand for properties and concise function declarations.",
    videoStartTime: 15480,
    videoEndTime: 15760,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
    codeSnippet: `// Property Shorthand
const createPerson = (name, age, gender) => ({ name, age, gender });
console.log(createPerson("Zodiac", 56, "male"));

// Declarative Function Shorthand in Objects
const bicycle = {
  gear: 2,
  setGear(newGear) { // Concise method declaration (no 'function' keyword required)
    this.gear = newGear;
  }
};
bicycle.setGear(3);
console.log(bicycle.gear); // 3`,
    summaryNotes: [
      "ES6 object shorthand allows writing ({ name }) instead of ({ name: name }).",
      "Omit the 'function' keyword when defining methods inside object literals."
    ],
    exercise: {
      prompt: "Define a method 'greet()' inside person object using ES6 method shorthand.",
      starterCode: `const user = {\n  name: "Alex",\n  // Add concise greet method\n};`,
      solutionCode: `const user = {\n  name: "Alex",\n  greet() {\n    return \`Hi, I am \${this.name}\`;\n  }\n};\nconsole.log(user.greet());`,
      hint: "Use `greet() { return ...; }` inside object."
    }
  },
  {
    id: 41,
    day: 41,
    title: "ES6 Class Syntax & Constructor Functions",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Instantiate object prototypes using modern ES6 class syntax and constructor methods.",
    videoStartTime: 15760,
    videoEndTime: 15920,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
    codeSnippet: `class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}

const zeus = new SpaceShuttle('Jupiter');
console.log(zeus.targetPlanet); // "Jupiter"

class Vegetable {
  constructor(name) {
    this.name = name;
  }
}
const carrot = new Vegetable('carrot');
console.log(carrot.name); // "carrot"`,
    summaryNotes: [
      "The class keyword defines an object prototype blueprint.",
      "The constructor() method runs automatically when instantiating new objects with the 'new' keyword."
    ],
    exercise: {
      prompt: "Create a class 'Car' with a constructor setting property 'brand'. Instantiate with 'Tesla'.",
      starterCode: `// Define Car class below\n`,
      solutionCode: `class Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n}\nconst myCar = new Car("Tesla");\nconsole.log(myCar.brand); // "Tesla"`,
      hint: "Use `class Car { constructor(brand) { this.brand = brand; } }`."
    }
  },
  {
    id: 42,
    day: 42,
    title: "Getters and Setters in Classes",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Encapsulate private object state and control access with getter and setter methods.",
    videoStartTime: 15920,
    videoEndTime: 16120,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get",
    codeSnippet: `class Thermostat {
  constructor(tempFahrenheit) {
    this._tempFahrenheit = tempFahrenheit;
  }
  // getter
  get temperature() {
    return (5 / 9) * (this._tempFahrenheit - 32);
  }
  // setter
  set temperature(celsius) {
    this._tempFahrenheit = (celsius * 9.0) / 5 + 32;
  }
}

const thermos = new Thermostat(76);
let temp = thermos.temperature; // 24.44 in C (uses getter)
thermos.temperature = 26;        // sets temp (uses setter)
console.log(thermos.temperature); // 26`,
    summaryNotes: [
      "Getters (get key()) retrieve computed values without invoking method parentheses.",
      "Setters (set key(val)) mutate internal properties when assigned like standard variables.",
      "Convention: Prefix private/internal backing variables with an underscore (e.g. _temp)."
    ],
    exercise: {
      prompt: "Add getter 'info' to Book class returning '[title] by [author]'.",
      starterCode: `class Book {\n  constructor(title, author) {\n    this.title = title;\n    this.author = author;\n  }\n  // Add getter info\n}`,
      solutionCode: `class Book {\n  constructor(title, author) {\n    this.title = title;\n    this.author = author;\n  }\n  get info() {\n    return \`\${this.title} by \${this.author}\`;\n  }\n}\nconst b = new Book("JS Guide", "Beau");\nconsole.log(b.info);`,
      hint: "Use `get info() { return \`\${this.title} by \${this.author}\`; }`."
    }
  },
  {
    id: 43,
    day: 43,
    title: "JavaScript Modules: Import & Export",
    module: "Module 6: Advanced Concepts & ES6",
    moduleId: "advanced-es6",
    description: "Share code across files using ES6 module exports, named imports, and default exports.",
    videoStartTime: 16120,
    videoEndTime: 16900,
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    codeSnippet: `// --- string_functions.js ---
export const capitalizeString = str => str.toUpperCase();
export const lowercaseString = str => str.toLowerCase();

export default function subtract(x, y) {
  return x - y;
}

// --- main.js ---
import subtract, { capitalizeString, lowercaseString } from "./string_functions.js";
import * as MathUtils from "./string_functions.js";

console.log(capitalizeString("hello")); // "HELLO"
console.log(subtract(7, 4)); // 3`,
    summaryNotes: [
      "Use export to share functions, variables, or classes across module files.",
      "Use named imports inside curly braces: import { functionName } from './file.js'.",
      "Use export default for a fallback single main export per file, imported without curly braces."
    ],
    exercise: {
      prompt: "Write named export syntax for function 'add' and import syntax for importing 'add' from './math.js'.",
      starterCode: `// Write export statement\n// Write import statement`,
      solutionCode: `export const add = (x, y) => x + y;\nimport { add } from "./math.js";`,
      hint: "`export const add = ...` and `import { add } from './math.js'`."
    }
  }
];

export const MODULES_DATA: ModuleGroup[] = [
  {
    id: "basics-data-types",
    title: "Module 1: Basics & Data Types",
    description: "Comments, variables, data types, arithmetic, strings & bracket notation",
    icon: "CodeOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "basics-data-types")
  },
  {
    id: "arrays-logic",
    title: "Module 2: Arrays & Logic",
    description: "Arrays, methods, booleans, comparison operators & conditional logic",
    icon: "TableOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "arrays-logic")
  },
  {
    id: "functions-scope",
    title: "Module 3: Functions & Scope",
    description: "Functions, arguments, global vs local scope, return values & queues",
    icon: "FunctionOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "functions-scope")
  },
  {
    id: "objects-data",
    title: "Module 4: Objects & Data Structures",
    description: "JavaScript objects, dot/bracket notation, mutations & nested structures",
    icon: "AppstoreOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "objects-data")
  },
  {
    id: "loops-iteration",
    title: "Module 5: Loops & Iteration",
    description: "While loops, for loops, nesting loops & do...while execution",
    icon: "SyncOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "loops-iteration")
  },
  {
    id: "advanced-es6",
    title: "Module 6: Advanced Concepts & ES6",
    description: "Random numbers, parseInt, ternaries, ES6 arrow functions, rest/spread, destructuring, classes & modules",
    icon: "RocketOutlined",
    days: CURRICULUM_DATA.filter((d) => d.moduleId === "advanced-es6")
  }
];

export function getComprehensiveExplanation(lesson: LessonDay): string {
  switch (lesson.id) {
    case 1:
      return "Comments in JavaScript provide essential inline and block-level documentation to explain code logic, highlight intent, and assist during debugging. Inline single-line comments begin with two forward slashes (//) to annotate specific lines of code, while multi-line block comments start with /* and end with */ to encapsulate multi-paragraph documentation. During execution, the JavaScript engine completely ignores comments during code compilation and tokenization, ensuring zero runtime performance penalty while keeping your codebase maintainable and collaborative.";

    case 2:
      return "Variables serve as named memory storage containers in JavaScript that hold data values for reference, manipulation, and state management throughout your application. Variable declarations are managed using three distinct keywords: var (function-scoped, hoisted to the top of its scope), let (block-scoped and reassignable), and const (block-scoped and immutable identifier binding). JavaScript categorizes data into 7 primitive types and reference objects: String (textual sequences), Number (integers and floating-point decimals), Boolean (logical true or false), Undefined (declared variables lacking an assigned value), Null (intentional absence of value), Symbol (unique and immutable primitive keys), BigInt (arbitrary precision large integers), and Object (complex key-value reference structures).";

    case 3:
      return "The assignment operator (=) is used to store values inside variables by evaluating code from right to left. Unlike mathematical equality, the single equals sign takes the fully evaluated expression on its right-hand side and assigns the resulting value into the memory location specified by the variable on its left. Uninitialized variables automatically hold an initial value of undefined until an explicit assignment takes place, and primitive assignments copy raw values directly between variables.";

    case 4:
      return "Managing variable lifecycle requires understanding uninitialized variable states, strict identifier case sensitivity, and standardized naming conventions. Attempting mathematical calculations on uninitialized variables that hold undefined yields NaN (Not a Number), signaling invalid mathematical operations. Furthermore, JavaScript variable names are strictly case-sensitive, meaning myVar, MyVar, and MYVAR point to entirely distinct memory locations. Developers adhere to standard camelCase formatting (studlyCapVar) to maintain clean, readable, and idiomatic JavaScript code across teams.";

    case 5:
      return "Arithmetic operators enable basic mathematical computations and numeric variable transformations. Standard binary operators include Addition (+), Subtraction (-), Multiplication (*), and Division (/), following standard operator precedence rules. Additionally, JavaScript provides unary operators: the increment operator (++) increases a numeric variable by 1, while the decrement operator (--) decreases a numeric variable by 1, offering shorthand syntax for updating counter variables.";

    case 6:
      return "Advanced numeric calculations involve floating-point decimals, the remainder (modulo) operator, and compound assignment shorthand. Floating-point numbers represent fractional decimal values. The remainder operator (%) calculates the integer remainder left over after dividing one number by another, commonly used to test number parity (even vs odd) or constrain values within cyclical boundaries. Compound assignment operators (+=, -=, *=, /=) combine arithmetic evaluation with variable reassignment in a single concise operation.";

    case 7:
      return "String variables store textual data as sequences of characters enclosed within double quotes (\"), single quotes ('), or backticks (`). Special characters inside strings are escaped using the backslash (\\) symbol—such as \\\" for quotes, \\n for line breaks, \\t for tab indents, and \\\\ for literal backslashes. Text fragments can be concatenated (joined together) using the binary addition operator (+) or appended incrementally using the compound string addition operator (+=).";

    case 8:
      return "Strings can be inspected and indexed to extract specific character data using zero-indexed bracket notation and the .length property. The .length property returns the total character count of a string. Individual characters are accessed via bracket notation (str[0] for the first character, str[str.length - 1] for the final character). Crucially, JavaScript strings are immutable—individual characters cannot be altered directly via index assignment (str[0] = 'X' fails), requiring full string re-assignment to modify text content.";

    case 9:
      return "Arrays are ordered collections of data items enclosed in square brackets ([...]), allowing developers to store multiple values within a single variable name. Arrays can contain elements of any data type—including strings, numbers, booleans, objects, and other arrays. Multi-dimensional (nested) arrays contain sub-arrays as elements, establishing matrix-like structures and hierarchical lists for organized data representation.";

    case 10:
      return "Array elements are accessed and mutated using zero-indexed bracket notation. Unlike strings, JavaScript arrays are mutable—their items can be directly modified by assigning a new value to a specific index (arr[0] = 99). Accessing elements in multi-dimensional arrays involves chaining bracket indices (matrix[row][col]), where the first bracket selects the inner sub-array and the second bracket selects the element within that sub-array.";

    case 11:
      return "JavaScript provides built-in array modification methods for pushing, popping, shifting, and unshifting elements. The push() method appends one or more items to the end of an array, while pop() removes and returns the last item. To work at the beginning of an array, shift() removes and returns the first element (shifting remaining indices down), whereas unshift() prepends new elements to the front of the array.";

    case 12:
      return "Boolean values represent logical truth states, consisting exclusively of true or false. Conditional if statements use booleans to control program execution flow—running a specified block of code inside curly braces {} only when the given condition evaluates to true (or a truthy value), and bypassing the block when the condition evaluates to false.";

    case 13:
      return "Equality operators compare values with key differences in type coercion. The loose equality operator (==) performs implicit type coercion, converting operand data types (e.g. string '3' to number 3) before comparing values. In contrast, the strict equality operator (===) evaluates both value AND data type without coercion, returning false if types differ. Modern JavaScript development strongly recommends default usage of strict equality (===) and strict inequality (!==).";

    case 14:
      return "Logical operators combine multiple boolean conditions to form complex conditional evaluations. The logical AND operator (&&) requires both the left and right operands to evaluate to true for the overall expression to pass. The logical OR operator (||) requires at least one operand to evaluate to true. Both operators utilize short-circuit evaluation, halting evaluation as soon as the outcome is deterministically known.";

    case 15:
      return "Chaining conditional logic allows programs to evaluate multiple sequential branches using if, else if, and else statements. The else if statement tests secondary alternative conditions when preceding conditions evaluate to false, while the final else block serves as a default catch-all fallback. Conditions are executed in strict top-to-bottom sequence, making logical ordering essential when checking range thresholds.";

    case 16:
      return "Switch statements replace verbose if-else if chains when comparing a single expression against multiple fixed values. A switch block evaluates an input against defined case labels using strict equality (===). The break keyword halts switch execution to prevent fall-through into subsequent cases, while the default label provides a fallback case executed when no matching cases are matched.";

    case 17:
      return "Functions encapsulate reusable blocks of code that perform specific tasks, preventing code duplication across applications. Defined using the function keyword followed by a unique name, parameters, and a code body inside {} blocks, functions are executed (invoked) by writing the function name followed by parentheses (fnName()).";

    case 18:
      return "Functions can accept dynamic inputs to process data flexibly using parameters and arguments. Parameters are placeholder variables specified inside the function declaration signature (function greet(name)). Arguments are the concrete data values passed into the function when it is invoked (greet('Alice')), mapping sequentially to parameter variables during execution.";

    case 19:
      return "Scope defines the accessibility and visibility region of variables in JavaScript. Global scope applies to variables declared outside any function, making them accessible everywhere. Local (function) scope restricts variables declared inside a function body so they exist only during function execution. Variable shadowing occurs when a local variable shares the same identifier as a global variable, overriding the global value within that local scope.";

    case 20:
      return "Functions return calculated values back to their call site using the return keyword. Executing a return statement immediately passes the specified value back to the caller and terminates function execution. Functions that complete execution without encountering an explicit return statement automatically return undefined by default.";

    case 21:
      return "A Queue is an abstract linear data structure operating on a First-In, First-Out (FIFO) principle, where new elements enter at the back and old elements exit from the front. In JavaScript, queues are implemented using array methods: push() enqueues items at the array tail, while shift() dequeues and returns the item at the array head.";

    case 22:
      return "Clean conditional function design emphasizes direct boolean returns and early exit guard clauses. Comparison expressions (a === b) evaluate directly to boolean true or false, eliminating redundant if (condition) return true; else return false; blocks. Guard clauses utilize return early patterns to check and exit on invalid inputs or edge cases at the start of a function, keeping core execution logic clean and unnested.";

    case 23:
      return "JavaScript Objects store collections of related data using key-value pairs enclosed in curly braces ({}). Keys (properties) represent property names, while values hold data or functions. Properties are accessed using dot notation (obj.propName) when keys are valid identifier strings without spaces, or bracket notation (obj['prop name']) when property keys contain spaces, hyphens, or dynamic variable references.";

    case 24:
      return "Objects are mutable data structures whose property values can be updated, inserted, or removed at runtime. Updating a property uses simple assignment (obj.name = 'New Name'). Assigning a value to a non-existent property name automatically inserts the key-value pair into the object. To remove a property key and its value entirely, use the delete operator (delete obj.oldProp).";

    case 25:
      return "Objects function as efficient O(1) dictionary lookup tables, serving as performant alternatives to long switch or if-else statements. Property existence on an object is checked using the built-in .hasOwnProperty('key') method, which returns true if the object directly owns the specified key without inspecting prototype inheritance.";

    case 26:
      return "Complex data modeling involves nesting objects within objects and embedding arrays inside object structures. Traversing nested data requires chaining dot notation, bracket notation, and array index accessors (user.address.street or data[0].tags[1]) to cleanly navigate deep JSON structures.";

    case 27:
      return "Working with dynamic object databases requires conditional mutations, handling optional nested properties, and safe array initialization. Practiced in the classic Record Collection algorithm, developers check whether property values are empty to perform delete operations, or initialize array properties (obj[id].tracks = obj[id].tracks || []) prior to pushing new items.";

    case 28:
      return "The while loop repeatedly executes a block of code inside {} as long as a specified boolean condition evaluates to true. Loop control variables must be updated inside the loop body (e.g. incrementing i++ or decrementing i--) to guarantee the condition eventually evaluates to false, preventing catastrophic infinite loop freezes.";

    case 29:
      return "The for loop provides a structured control header for iterating a specific number of times. Composed of three optional expressions separated by semicolons—initialization (let i = 0), condition (i < 10), and final expression (i++)—for loops allow precise step increments, backward counting (i--), or custom skips (i += 2).";

    case 30:
      return "Traversing arrays using for loops is a core paradigm for data processing. By initializing a loop counter at i = 0 and testing i < array.length, the loop visits every sequential index from the first element to the last, allowing summation, transformation, and filtering of array data.";

    case 31:
      return "Nested for loops iterate over multi-dimensional arrays by utilizing an outer loop for rows and an inner loop for sub-array columns. Additionally, do...while loops guarantee that the code block executes AT LEAST ONCE before evaluating the termination condition at the bottom.";

    case 32:
      return "Math.random() generates pseudo-random floating-point numbers in the range [0, 1) (inclusive of 0, exclusive of 1). Combined with Math.floor() (which rounds decimals down to the nearest integer), developers generate random whole integers within specified ranges using the formula Math.floor(Math.random() * (max - min + 1)) + min.";

    case 33:
      return "The parseInt() function parses string representations of numbers and converts them into integer values. parseInt() accepts an optional second argument known as the radix (base num system), which explicitly specifies whether to parse numbers in decimal (radix 10), binary (radix 2), hexadecimal (radix 16), or octal (radix 8).";

    case 34:
      return "The ternary operator (conditional operator) provides a concise one-line shorthand for if-else expressions using the syntax condition ? expressionIfTrue : expressionIfFalse. Ternaries act as inline expressions, making them ideal for conditional assignments and template string interpolations, and can be nested for multi-condition branching.";

    case 35:
      return "Modern JavaScript variable declaration distinguishes between var, let, and const. While var is function-scoped, let and const enforce strict block scope ({} boundaries). const prevents variable identifier reassignment, though objects and arrays assigned to const remain mutable; complete immutability is enforced using Object.freeze(obj).";

    case 36:
      return "ES6 arrow functions provide concise syntax for function expressions using () => {}. Single-line arrow functions feature implicit returns, automatically returning the evaluated expression without requiring explicit return keywords. Default parameters ((param = defaultValue)) allow functions to specify fallback values when arguments are omitted.";

    case 37:
      return "The rest operator (...args) gathers an arbitrary number of incoming function parameters into a true Array instance inside the function body. Conversely, the spread operator (...array) expands array elements or object properties in-place, allowing clean array copying, merging, and passing array elements into function calls.";

    case 38:
      return "Destructuring assignment provides clean syntax to unpack values from objects and positional elements from arrays directly into distinct variables. Object destructuring (const { name, age } = person) extracts properties by key name, array destructuring (const [a, b] = list) extracts items by index position, and array destructuring facilitates one-line variable swapping ([x, y] = [y, x]).";

    case 39:
      return "Template literals simplify string formatting using backtick delimiters (`...`) instead of quote marks. Template literals support embedded expression interpolation using ${expression} syntax, allowing clean variable insertion and preserving multi-line text formatting without requiring explicit escape characters like \\n.";

    case 40:
      return "ES6 introduces object literal enhancements including property value shorthand and concise declarative method syntax. Property shorthand allows writing { name, age } when variable names match key identifiers. Declarative method shorthand permits defining object methods directly (greet() { ... }) without writing the function keyword.";

    case 41:
      return "ES6 class syntax provides clean syntactic sugar over prototype-based object inheritance. Classes define object structure blueprints, featuring a constructor() method that executes automatically when instantiating new object instances using the new keyword.";

    case 42:
      return "Getters (get prop()) and setters (set prop(val)) encapsulate object properties within ES6 classes. Getters intercept property read access to execute logic and return computed values, while setters intercept assignment writes to validate or transform incoming values before updating internal backing variables (conventionally prefixed with an underscore, e.g. _property).";

    case 43:
      return "JavaScript ES6 Modules enable code organization across separate files using export and import statements. Modules use named exports (export const fn = ...) for multiple functions/variables and export default for primary module fallbacks, importing them via import { fn } from './module.js' or import defaultFn from './module.js'.";

    default:
      return `${lesson.description} ${lesson.summaryNotes.join(" ")}`;
  }
}

