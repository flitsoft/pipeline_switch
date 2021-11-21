const { program } = require('commander');
const yaml = require('js-yaml');
const fs   = require('fs');

program
    .requiredOption('-p, --project <project_id>', 'project id')
    .requiredOption('-t, --type <type>', 'ci or cd')
    .requiredOption('-v, --value <type>', 'Value of ci or cd');

program.parse();


const options = program.opts();
const {project, type, value} = options;
const allowedTypes = ["ci", "cd"]
if (!(["ci", "cd"].includes(type) )){
    console.error(`Type must be either  ${allowedTypes}  instead got: ${type}`)
    process.exit(1)
}
let doc;
try {
    console.log("https://github.com/flitsoft/pipeline_switch")
    doc = yaml.load(fs.readFileSync('./config.yaml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}
if (!(project in doc)){
    console.error(`Project ${project} Not existing`)
    process.exit(1)
}

const {ci, cd} = doc[project]
if ((ci == null || cd == null)){
    console.error(`Yaml invalid ${project} No ci or cd`)
    process.exit(1)
}
const expectedValue = doc[project][type]

if (expectedValue !== value){
    console.error(`No matching value. Failing pipeline. Expecting "${expectedValue}" but got "${value}" instead`)
    process.exit(1)
}
console.log("PASSED. Good luck!")
