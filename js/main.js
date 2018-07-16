function GitLabEnhancementSuite(options) {

  // Configuration ////////////////////////////////////////////////////////////

  var defaults = {};

  $.each(GitLabEnhancementSuiteOptions, function() {
    defaults[this.name] = this['default'];
  });

  options = $.extend({}, defaults, options);

  // Utilities ////////////////////////////////////////////////////////////////

  $.extend({
    option: function (option, handler) {
      if (options[option] !== false) {
        handler();
      }
    },
    endsWith: function (haystack, needle) {
      return haystack.length >= needle.length &&
        haystack.substr(haystack.length - needle.length) == needle;
    },
    pathnameEndsWith: function (suffix) {
      return $.endsWith(window.location.pathname, suffix);
    },
  });

  // Features /////////////////////////////////////////////////////////////////

  $.option('allow_collaboration', function () {
    if ($.pathnameEndsWith('/merge_requests/new')) {
      $('#allow_collaboration').prop('checked', true);
    }
  });

  $.option('remove_source_branches', function () {
    if ($.pathnameEndsWith('/merge_requests/new')) {
      $('#merge_request_force_remove_source_branch').prop('checked', true);
    }
  });
}
