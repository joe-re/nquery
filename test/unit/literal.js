var should = require('should');
var Parser = require(__dirname + '/../../lib/parser');

function inspect(obj) {
  console.log(require('util').inspect(obj, false, 10, true));  
}

describe('literal test',function(){
  
  it('string literal test', function() {
    var sql, ast;

    sql = "SELECT 'single str' ,\"double string \", ' escape \\n \\t \\u0002'";
    ast = Parser.parse(sql);
    //inspect(ast.columns);
    ast.columns.should.eql([ 
      { expr: { type: 'string', value: 'single str' }, as: null },
      { expr: { type: 'string', value: 'double string ' }, as: null },
      { expr: { type: 'string',value: ' escape \n \t \u0002' }, as: null } 
    ])
  });   

  it('numeric literal test', function() {
    var sql, ast;

    sql = "SELECT 1 ,2.5, -4.6, 1e2, 1e-10";
    ast = Parser.parse(sql);
    //inspect(ast.columns);
    ast.columns.should.eql([ 
      { expr: { type: 'number', value: 1 },     as: null },
      { expr: { type: 'number', value: 2.5 },   as: null },
      { expr: { type: 'number', value: -4.6 },  as: null },
      { expr: { type: 'number', value: 100 },   as: null },
      { expr: { type: 'number', value: 1e-10 }, as: null } 
    ])
  });   

  it('bool&null literal test', function() {
    var sql, ast;

    sql = "SELECT false, True, null";
    ast = Parser.parse(sql);
    //inspect(ast.columns);
    ast.columns.should.eql([ 
      { expr: { type: 'bool', value: false },     as: null },
      { expr: { type: 'bool', value: true },      as: null },
      { expr: { type: 'null', value: null },      as: null }
    ])
  });   
})

