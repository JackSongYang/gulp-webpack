const activity2020 = require('./activity_2020');
const activity2021 = require('./activity_2021');

const allGulpTasks = Object.assign({},
  activity2020,
  activity2021
);
Object.keys(allGulpTasks).forEach(key => {
  exports[key] = allGulpTasks[key];
});
