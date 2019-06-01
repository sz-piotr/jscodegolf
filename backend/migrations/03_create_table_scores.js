exports.up = async (knex) => {
  await knex.schema.createTable('scores', (table) => {
    table.increments('id');
    table.string('challenge').notNullable();
    table.string('player').notNullable();
    table.integer('score').notNullable();
    table.timestamp('time').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('scores');
};
