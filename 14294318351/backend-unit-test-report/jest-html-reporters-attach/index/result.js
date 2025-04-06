window.jest_html_reporters_callback__({"numFailedTestSuites":0,"numFailedTests":0,"numPassedTestSuites":9,"numPassedTests":26,"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":9,"numTotalTests":26,"startTime":1743956104599,"success":false,"testResults":[{"numFailingTests":0,"numPassingTests":7,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956111071,"runtime":6251,"slow":true,"start":1743956104820},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/auth/auth.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["AuthService"],"duration":17,"failureMessages":[],"fullName":"AuthService should be defined","status":"passed","title":"should be defined"},{"ancestorTitles":["AuthService","signUp"],"duration":6,"failureMessages":[],"fullName":"AuthService signUp should call create method of userService and return a access token","status":"passed","title":"should call create method of userService and return a access token"},{"ancestorTitles":["AuthService","signUp"],"duration":4,"failureMessages":[],"fullName":"AuthService signUp should call validateUser method of authService and return a access token","status":"passed","title":"should call validateUser method of authService and return a access token"},{"ancestorTitles":["AuthService","validateUser"],"duration":3,"failureMessages":[],"fullName":"AuthService validateUser should call findOneByEmail method of userService, verify password and return a user","status":"passed","title":"should call findOneByEmail method of userService, verify password and return a user"},{"ancestorTitles":["AuthService","validateUser"],"duration":22,"failureMessages":[],"fullName":"AuthService validateUser should throw UnauthorizedException if user is not found","status":"passed","title":"should throw UnauthorizedException if user is not found"},{"ancestorTitles":["AuthService","validateUser"],"duration":4,"failureMessages":[],"fullName":"AuthService validateUser should throw UnauthorizedException if password is incorrect","status":"passed","title":"should throw UnauthorizedException if password is incorrect"},{"ancestorTitles":["AuthService","token"],"duration":3,"failureMessages":[],"fullName":"AuthService token should return a access token","status":"passed","title":"should return a access token"}]},{"numFailingTests":0,"numPassingTests":5,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956111096,"runtime":6279,"slow":true,"start":1743956104817},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/user/user.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["UserService"],"duration":25,"failureMessages":[],"fullName":"UserService should be defined","status":"passed","title":"should be defined"},{"ancestorTitles":["UserService","create"],"duration":6,"failureMessages":[],"fullName":"UserService create should call findOneByEmail method of userService, hash password and return a user","status":"passed","title":"should call findOneByEmail method of userService, hash password and return a user"},{"ancestorTitles":["UserService","create"],"duration":13,"failureMessages":[],"fullName":"UserService create should throw DuplicateEmailException if user already exists","status":"passed","title":"should throw DuplicateEmailException if user already exists"},{"ancestorTitles":["UserService","findOneByEmail"],"duration":3,"failureMessages":[],"fullName":"UserService findOneByEmail should return a user by email","status":"passed","title":"should return a user by email"},{"ancestorTitles":["UserService","findOneById"],"duration":3,"failureMessages":[],"fullName":"UserService findOneById should return a user by id","status":"passed","title":"should return a user by id"}]},{"numFailingTests":0,"numPassingTests":4,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956111317,"runtime":6497,"slow":true,"start":1743956104820},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/user/user.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["UserController"],"duration":43,"failureMessages":[],"fullName":"UserController should be defined","status":"passed","title":"should be defined"},{"ancestorTitles":["UserController","create"],"duration":8,"failureMessages":[],"fullName":"UserController create should call create method of userService and return a user","status":"passed","title":"should call create method of userService and return a user"},{"ancestorTitles":["UserController","findOne"],"duration":3,"failureMessages":[],"fullName":"UserController findOne should call findOne method of userService and return a user","status":"passed","title":"should call findOne method of userService and return a user"},{"ancestorTitles":["UserController","findOneByEmail"],"duration":13,"failureMessages":[],"fullName":"UserController findOneByEmail should call findOneByEmail method of userService and return a user","status":"passed","title":"should call findOneByEmail method of userService and return a user"}]},{"numFailingTests":0,"numPassingTests":3,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956111567,"runtime":477,"slow":false,"start":1743956111090},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/category/category.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["CategoryService"],"duration":7,"failureMessages":[],"fullName":"CategoryService should be defined","status":"passed","title":"should be defined"},{"ancestorTitles":["CategoryService","create"],"duration":2,"failureMessages":[],"fullName":"CategoryService create should call create method of categoryRepository and return a category","status":"passed","title":"should call create method of categoryRepository and return a category"},{"ancestorTitles":["CategoryService","create"],"duration":10,"failureMessages":[],"fullName":"CategoryService create should throw DuplicateCategoryException if category already exists","status":"passed","title":"should throw DuplicateCategoryException if category already exists"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956111961,"runtime":629,"slow":false,"start":1743956111332},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/category/category.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["CategoryController"],"duration":5,"failureMessages":[],"fullName":"CategoryController should be defined","status":"passed","title":"should be defined"}]},{"numFailingTests":0,"numPassingTests":3,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956112096,"runtime":988,"slow":false,"start":1743956111108},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/auth/auth.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["AuthController"],"duration":11,"failureMessages":[],"fullName":"AuthController should be defined","status":"passed","title":"should be defined"},{"ancestorTitles":["AuthController","signUp"],"duration":3,"failureMessages":[],"fullName":"AuthController signUp should call signUp method of AuthService and return JWT token","status":"passed","title":"should call signUp method of AuthService and return JWT token"},{"ancestorTitles":["AuthController","signIn"],"duration":3,"failureMessages":[],"fullName":"AuthController signIn should call signIn method of AuthService and return JWT token","status":"passed","title":"should call signIn method of AuthService and return JWT token"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956112110,"runtime":141,"slow":false,"start":1743956111969},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/app.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["AppController"],"duration":5,"failureMessages":[],"fullName":"AppController should be defined","status":"passed","title":"should be defined"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956112122,"runtime":548,"slow":false,"start":1743956111574},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/transaction/transaction.controller.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["TransactionController"],"duration":8,"failureMessages":[],"fullName":"TransactionController should be defined","status":"passed","title":"should be defined"}]},{"numFailingTests":0,"numPassingTests":1,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1743956112204,"runtime":103,"slow":false,"start":1743956112101},"testFilePath":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src/transaction/transaction.service.spec.ts","failureMessage":null,"testResults":[{"ancestorTitles":["TransactionService"],"duration":2,"failureMessages":[],"fullName":"TransactionService should be defined","status":"passed","title":"should be defined"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":true,"collectCoverage":false,"collectCoverageFrom":["**/*.(t|j)s"],"coverageDirectory":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/reports/coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":3,"noStackTrace":false,"nonFlagArgs":[],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/node_modules/jest-html-reporters/index.js",{"publicPath":"./reports/html-report-unit","filename":"index.html","openReport":false}]],"rootDir":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/src","runTestsByPath":false,"seed":-1784353102,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"","testSequencer":"/home/runner/work/fullstack-testing-app/fullstack-testing-app/backend/node_modules/@jest/test-sequencer/build/index.js","testTimeout":30000,"updateSnapshot":"none","useStderr":false,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false},"endTime":1743956112266,"_reporterOptions":{"publicPath":"./reports/html-report-unit","filename":"index.html","expand":false,"pageTitle":"","hideIcon":false,"testCommand":"","openReport":false,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false,"stripSkippedTest":false},"logInfoMapping":{},"attachInfos":{}})