angular.module('starter.services', ['starter.config'])
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
 
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service example
.factory('zhaiyan', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM zhaiyan')
        .then(function(result){
        	console.log( DB.fetchAll(result)  );

        	console.log( DB.fetchAll(result)[0].zhaiyan  );
            //return true;
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM zhaiyan WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

        self.insert = function(zhaiyan, source,show,date,like,insert_time) {
        return DB.query('INSERT INTO zhaiyan (zhaiyan, source,show,date,like,insert_time) VALUES (?,?,?,?,?,?)', [zhaiyan, source,show,date,like,insert_time])
        .then(function(result){
        	console.log( result.ID );
            return result.ID;
        });
    };

      self.getLike  = function( like ) {
        return DB.query('SELECT * FROM zhaiyan WHERE like = ? '  ,[like] )
        .then(function(result){
        	console.log( DB.fetchAll(result)  );

        	console.log( DB.fetchAll(result)[0].zhaiyan  );
            //return true;
            return DB.fetchAll(result);
        });
    };

    self.remove = function(id) {
        return DB.query('DELETE FROM  zhaiyan WHERE id = ?', [id])
        .then(function(result){
        console.log(result);
            return true;
        });
    };

    self.count = function() {
        return DB.query('SELECT COUNT(1) as num FROM  zhaiyan WHERE like = 1')
        .then(function(result){
        console.log(result);
        return DB.fetchAll(result)[0].num;
        });
    };

    //return true;
    return self;
});