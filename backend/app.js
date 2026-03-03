const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/questions', (req, res, next) => {
    const question = req.body;
    console.log(question);
    res.status(201).json({
        message: 'Question added successfully!'
    });
});

app.get('/api/questions', (req, res, next) => {
    const questions = [
        {
            id: 1,
            category: 'Angular',
            question: 'What is Angular?',
            answer:
                'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
        },
        {
            id: 4,
            category: 'HTML',
            question: 'What is the DOM?',
            answer:
                'The Document Object Model (DOM) is a programming interface for web documents that represents the page so that programs can change the document structure, style, and content.',
        },
        {
            id: 5,
            category: 'CSS',
            question: 'What is the box model in CSS?',
            answer:
                'The CSS box model describes the rectangular boxes generated for elements in the document tree and consists of margins, borders, padding, and the actual content.',
        }
    ];
    res.status(200).json({
        message: 'Questions fetched successfully!',
        questions: questions
    });
});

module.exports = app;