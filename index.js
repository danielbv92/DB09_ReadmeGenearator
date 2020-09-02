const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


// function that crats the array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Hello! What is the name of your Project?",
            name: "title"
        },
        {
            type: "input",
            message: `Cool! Please enter a brief description of your project.`,
            name: "description"
        },
        {
            type: "input",
            message: "Nice. Arer there any Installation instructions for this project? If not, enter NONE",
            name: "installation"
        },
        {
            type: "input",
            message: "Right on. How do you wish for your project to be used?",
            name: "usage"
        },
        {
            type: "input",
            message: "Are there any other contributers to your project?",
            name: "contribution"
        },
        {
            type: "input",
            message: "Are there any test instructors?",
            name: "test"
        },
        {
            type: "checkbox",
            message: "Please select a license.",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3"
            ],  
            name: "license"
        },
        {
            type: "input",
            message: "Who should receive credit for this work?",
            name: "credit"
        },
        {
            type: "input",
            message: "What is your GitHub username",
            name: "username"
        },
        {
            type: "input",
            message: "What is your email address",
            name: "email"
        },
    ]);
}

function generateMarkdown(response) {
    return `
# ${response.title}
# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage) 
- [Contributing](#contributing)
- [Test](#test)
- [Credits](#credits)
- [License](#license) 
- [Questions](#questions)
## Description:
![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")
    ${response.description}
## Installation:
    ${response.installation}
## Usage:
    ${response.usage}
## Contributing:
    ${response.contribution}
## Test:
    ${response.test}
## Credits:
    ${response.credit}
## License:
    For more information about the License, click on the link below.

    - [License](https://opensource.org/licenses/${response.license})

    ##Questions:

    [Github Profile] (https://github.com/danielbv92/${response.username})

    For further questions you can reach me at my email at:
    ${response.email}.



`;
}

// function to initialize program
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();