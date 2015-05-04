export default ngModule => {
  require('./common.css');

  require('./commonCtrl')(ngModule);
  require('./commonFactory')(ngModule);
};
