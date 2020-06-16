const activity2020 = require('./project');

const allGulpTasks = Object.assign({},
  activity2020
);
Object.keys(allGulpTasks).forEach(key => {
  exports[key] = allGulpTasks[key];
});
