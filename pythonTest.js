var ps = require('python-shell')

var options = {
  mode: 'text',
  pythonPath: '',
  pythonOptions: ['-u'],
  scriptPath: '',
  args: ['value1', 'value2', 'value3']
}

ps.PythonShell.run('test.py', options, function (err, results) {
  if (err) throw err

  //test.py는 리스트를 보냄
  var pythonResult = results[0].slice(1, results[0].length - 1).split(',')
  console.log(pythonResult[0])
})
