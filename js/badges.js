var user = localStorage.getItem('myStorage');

window.onload = function() {


  var badges = document.querySelector('.badge-container');
  var url = [];

  for (var i = 0; i < badges.children.length; i++) {
    url.push(badges.children[i].id)
  }

  function makeRequests() {

    url.forEach(function(e) {

      var requestURL = 'https://seveneleves.github.io/certificates-old/' + user + '/' + e + '.json';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'text';
      request.send();

      request.onload = function() {

        var certificateText = request.response;
        var certificate = JSON.parse(certificateText);

        if (certificate.validity !== true) {

          document.getElementById(e).classList.add('badge-deactivated');

        }

      }

    })

  }

  makeRequests();

}

function modal(e) {

  document.getElementById('modalBox').style.display = 'block';

  document.getElementById('main-content').style.filter = 'blur(4px)';

  document.getElementById('badge-icon').src = 'img/' + e.id + '.png';

  var requestURL = 'https://seveneleves.github.io/certificates-old/' + user + '/' + e.id + '.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'text';
  request.send();

  //Ajouter une condition : si requête échoue, alors voilà ce que tu fais. Else, la suite (à partir de request.onload). Cela rendrait toutes les requêtes sur validity obsolètes

  request.onload = function() {
    var certificateText = request.response
    var certificate = JSON.parse(certificateText);
    displayData(certificate);
  }

  document.getElementById('certificate-name').textContent = e.children[1].textContent;

  document.getElementById('certificate-category').textContent = e.title;

  document.getElementById('certificate-description').textContent = e.children[0].alt;

  function displayData(cert) {

    // document.getElementById('certificate-name').textContent = cert.name;
    // document.getElementById('certificate-category').textContent = cert.category;
    // document.getElementById('certificate-description').textContent = cert.description;
    document.getElementById('certificate-year').textContent = cert.year;
    document.getElementById('certificate-manager').textContent = cert.manager;
    document.getElementById('certificate-uo').textContent = cert.unit;

    for (var i = 0; i < cert.skills.length; i++) {
      document.getElementById('certificate-skill-type-' + i).textContent = cert.skills[i].type;
      document.getElementById('certificate-skill-comment-' + i).textContent = cert.skills[i].comment;

    }

    document.getElementById('certificate-link').href = requestURL;

    if (cert.validity !== true) {

      document.getElementById('checkmark').src = 'img/checkmark_false.png';
      document.getElementById('badge-icon').classList.add('badge-deactivated');

    } else {

        document.getElementById('checkmark').src = 'img/checkmark_true.png';

      }

  }

}

document.getElementById('close').addEventListener('click', function(e) {

  document.getElementById('modalBox').style.display = 'none';
  document.getElementById('main-content').style.filter = 'none';
  document.getElementById('badge-icon').classList.remove('badge-deactivated');

})
