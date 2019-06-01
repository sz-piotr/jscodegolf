exports.up = async (knex) => {
  await knex.schema.dropTable('challenge');
};

exports.down = async (knex) => {
  await knex.schema.createTable('challenge', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description').notNullable();
  });
};
