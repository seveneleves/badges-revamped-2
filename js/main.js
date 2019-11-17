window.onload = function() {

  document.forms['user-form'].reset();

  var nameList = document.getElementById('user-select');

  nameList.addEventListener('change', function(el) {

    if (el.target.value !== 'default') {

      var selectedUser = el.target.value;
      localStorage.setItem("myStorage", selectedUser);
      document.getElementById('link-to-badges').style.display = 'block';

    }

  })

}
