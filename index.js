let natural = require("natural");

// var nounInflector = new natural.NounInflector();

// console.log(nounInflector.pluralize("goose"));
// console.log(nounInflector.singularize("radii"));

// //str distance
// let str1 = "Kirti Bhosale";
// let str2 = "Kirti Bhosal";
// let str3 = "Mango";

// console.log("str1 and str2:", natural.JaroWinklerDistance(str1, str2));
// console.log("str2 and str3:", natural.JaroWinklerDistance(str2, str3));

// specify categories
var classifier = new natural.BayesClassifier();
var trainingData = [
    {text: 'So many sneakers starting at $40', label: 'promotion'},
    {text: 'BOGO FREE. 2 days only.', label: 'promotion'},
    {text: 'Top picks, Made For You', label: 'promotion'},
    {text: 'Last call for $18 off!', label: 'promotion'},
    {text: 'Last chance! Leather & Suede under $68', label: 'promotion'},
    {text: 'Don\'t miss out. Surprise Sale ends Friday', label: 'promotion'},
    {text: 'Your statement is available online', label: 'inbox'},
    {text: 'Confirm your account on Heroku', label: 'inbox'},
    {text: 'Project next steps', label: 'inbox'},
    {text: 'Order confirmation', label: 'inbox'},
    {text: 'Action Required: Survey due Friday', label: 'inbox'},
    {text: 'Your tickets for Justin Bieber', label: 'inbox'}
];

var testData = [
    {text: 'Files due today', label: 'inbox'},
    {text: 'Sale on tops', label: 'promotion'},
    {text: 'Getting started on Heroku', label: 'inbox'},
    {text: 'Prices drop Friday on your favorite looks', label: 'promotion'}
];

// Training the classifier with the training data
trainingData.forEach(item => {
    classifier.addDocument(item.text, item.label);
});
classifier.train();

// Testing the classifier with the test data
testData.forEach(item => {
    var labelGuess = classifier.classify(item.text);
    console.log('\n', item.text);
    console.log('Label:', labelGuess);
    console.log(classifier.getClassifications(item.text));
});