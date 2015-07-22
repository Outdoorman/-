angular.module('starter.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'zhaiyan',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'zhaiyan', type: 'text'},
                {name: 'source', type: 'text'},
                {name: 'show', type: 'text'},
                {name: 'date', type: 'text'},
                {name: 'like', type: 'integer'},
                {name: 'insert_time', type: 'text'}
            ]
        }
    ]
});