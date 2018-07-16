function isGitLabInstance() {
  var elem = document.querySelector('meta[property="og:site_name"]');

  if (elem === null) {
    return false;
  }

  return elem.getAttribute('content') === 'GitLab';
}

function inject(content, callback) {
  var elem = document.createElement('script');

  if (content.indexOf('/') === 0) {
    elem.src = chrome.extension.getURL(content);
  } else {
    elem.textContent = content;
  }

  elem.onload = function () {
    this.parentNode.removeChild(this);
    typeof callback === 'function' && callback.apply(this);
  };

  (document.head || document.documentElement).appendChild(elem);
};

if (isGitLabInstance()) {
  chrome.storage.sync.get(null, function(items) {
    inject('/pages/options.js', function() {
      inject('/js/jquery.js', function() {
        inject('/js/main.js', function() {
          inject('var GLES = new GitLabEnhancementSuite(' + JSON.stringify(items) + ');');
        });
      });
    });
  });
}
