/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'autoPortfolio';
const collection = 'journey';
// The current database to use.
use(database);

// Create a new collection.
db.createCollection(collection);
db.getCollection(collection)
.insertMany([
        {_id:1,year:'2021', content:'Started working as QA Tester.'},
        {_id:2,year:'2021', content:'Started learning to read UML diagrams.'},
        {_id:3,year:'2021', content:'Finished Udemy online course on UML.'},
        {_id:4,year:'2021', content:'Started youtube online course on Postman.'},
        {_id:5,year:'2021', content:'Started using Postman for testing.'},
        {_id:6,year:'2021', content:'Finished Udemy course on Soap UI.'},
        {_id:7,year:'2021', content:'Started Udemy course on Soap UI.'},
        {_id:8,year:'2021', content:'Was taught to work with TFS.'},
        {_id:9,year:'2021', content:'Started writing testcases in TFS.'},
        {_id:10,year:'2021', content:'Started learning JavaScript.'},
        {_id:11,year:'2022', content:'Started automating BE test in Postman.'},
        {_id:12,year:'2023', content:'Ended Udemy online course in JavaScript.'},
        {_id:13,year:'2024', content:'Learned automating E2E tests using Cypress.'},
        {_id:14,year:'2024', content:'Started using Cypress for automating E2E tests.'},
        {_id:15,year:'2025', content:'Started studying for ISTQB Foundation Level 4.0 certification.'},
        {_id:16,year:'2025', content:'Gained ISTQB Foundation Level 4.0 certification on 14.2.2025.'},
        {_id:17,year:'2025', content:'Started learning Typescript in July.'},
        {_id:18,year:'2025', content:'Finished learning Typescript in July.'},
        {_id:19,year:'2025', content:'Started learning for pl-900 in mid July.'}
    ])