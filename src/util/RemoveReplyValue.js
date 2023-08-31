function removeReplyValue() {
    var allinputs = document.querySelectorAll('.blog-post-reply');
    var myLength = allinputs.length;
    var input;
  
    for (var i = 0; i < myLength; ++i) {
      input = allinputs[i];
      if (input.value) {
          input.value = "";
      }
    }
  }
export default removeReplyValue;