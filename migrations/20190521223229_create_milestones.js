/** 
   * The milestones table should have the following fields:
  description (string)
  date_achieved (date)
 */
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.string('description');
      table.datetime('date_achieved');
      table.increments('id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
