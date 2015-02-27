var test = require('simple-test'),
    noisy = require('./noisy');

(function() {
   // Arrange.
   var expected = [
           noisy.preCallMsgPrefix + '0',
           noisy.postCallMsgPrefix + 'false'
       ],
       actual = [];
   
   // Act.
   noisy.simple(Boolean, actual)(0);
   
   // Assert.
   test.areEqual(
       expected,
       actual,
       'Noisy-simple Boolean(0) test'
   );
})();

(function() {
   // Arrange.
   var expected = [
           noisy.preCallMsgPrefix + '{"0":0}',
           noisy.postCallMsgPrefix + 'false'
       ],
       actual = [];
   
   // Act.
   noisy.flexible(Boolean, actual)(0);
   
   // Assert.
   test.areEqual(
       expected,
       actual,
       'Noisy-flexible Boolean(0) test'
   );
})();

(function() {
   // Arrange.
   var expected = [
           noisy.preCallMsgPrefix + '{"0":8,"1":2}',
           noisy.postCallMsgPrefix + '10'
       ],
       actual = [],
       sum = function(a, b) {
           return a + b;
       };
   
   // Act.
   noisy.flexible(sum, actual)(8, 2);
   
   // Assert.
   test.areEqual(
       expected,
       actual,
       'Noisy-flexible sum(8,2) test'
   );
})();