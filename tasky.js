function Tasky(name, description, start, end, state){
  //Validation

  if(start instanceof Date) {
    throw new Error ("Show Start date in date format")
  }
  if(!(end instanceof Date)) {
    throw new Error ("show End date in date format")
  }
  if (end < start) {
    throw new Error ("End date must be higher or equal to the start date")
  }
  if (state != AllowdStates.Created &&
      state != AllowdStates.Started &&
      state != AllowdStates.Finished &&
      state != AllowdStates.Due) {
          throw new Error("Allowed states are Created Started Finished or Due")
      }
  if (!name) {
    throw new Error("Must provide a task name")
  }
  if (!description) {
    throw new Error("Must provide a task name")
  }
  this.name = name;
  this.description = description;
  this.start = start;
  this.end = end;
  this.state = state;
}

const AllowdStates = {
  Created: 0,
  Started: 1,
  Finished: 2,
  Due: 3,
}

module.exports = {Task,AllowdStates}