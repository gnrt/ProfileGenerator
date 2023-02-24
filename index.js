const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
// const render = require("./src/page-template.js");

let pageTemplate = require('./src/page-template.js');

let distPath = path.resolve(__dirname, 'dist');
let htmlPath = path.join(distPath, 'team.html');

let employeeMembers = [];
let employeeIds = [];

const printUsage = () => {
    console.log(`
    =================
    Team Profile Generator
    =================
    `);
};
printUsage();

const createManager = () => {
    console.log(`
    =================
    Add a New Manager
    =================
    `); 
    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the manager\'s name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the manager\'s name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the manager\'s id? (Required)',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter the manager\'s id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the manager\'s email? (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter the manager\'s email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the manager\'s office number? (Required)',
        validate: officeNumberInput => {
            if (officeNumberInput) {
                return true;
            } else {
                console.log('Please enter the manager\'s office number!');
                return false;
            }
        }
    }
])
.then(managerInput => {
    const { name, id, email, officeNumber } = managerInput;
    const manager = new Manager(name, id, email, officeNumber);
    employeeMembers.push(manager);
    employeeIds.push(id);
    createTeam();
});
};

const createTeam = () => {
return inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
    }
])
.then(userChoice => {
    switch (userChoice.choice) {
        case 'Add an Engineer':
            addEngineer();
            break;
        case 'Add an Intern':
            addIntern();
            break;
        default:
            buildTeam();
    }
});
};

const addEngineer = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the engineer\'s name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the engineer\'s name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the engineer\'s id? (Required)',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter the engineer\'s id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the engineer\'s email? (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter the engineer\'s email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineer\'s github name? (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter the engineer\'s github name!');
                return false;
            }
        }
    }
])
.then(engineerInput => {
    const { name, id, email, github } = engineerInput;
    const engineer = new Engineer(name, id, email, github);
    employeeMembers.push(engineer);
    employeeIds.push(id);
    createTeam();
});
};

const addIntern = () => {
return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the intern\'s name? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the intern\'s name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the intern\'s id? (Required)',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter the intern\'s id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the intern\'s email? (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter the intern\'s email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the intern\'s school? (Required)',
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log('Please enter the intern\'s school!');
                return false;
            }
        }
    }
])
.then(internInput => {
    const { name, id, email, school } = internInput;
    const intern = new Intern(name, id, email, school);
    employeeMembers.push(intern);
    employeeIds.push(id);
    createTeam();
});
};

const buildTeam = () => {
    let employeeHTML = '';
  
    employeeMembers.forEach(employee => {
      employeeHTML += pageTemplate[employee.getRole()](employee);
    });
  
    const finalHTML = pageTemplate.main(employeeHTML);
// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");
    fs.writeFileSync(htmlPath, finalHTML, 'utf-8');
    console.log(`Team Profile has been generated at ${htmlPath}`);
  };
//   function buildTeam() {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//       fs.mkdirSync(OUTPUT_DIR)
//     }
//     fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
//   }
//   createManager();
  createManager();