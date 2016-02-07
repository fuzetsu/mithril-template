window.util = {
  throttle: function(callback, limit) {
    var wait = false;
    return function() {
      if (!wait) {
        callback.apply(null, arguments);
        wait = true;
        setTimeout(function() {
          wait = false;
        }, limit);
      }
    };
  },
  titleCase: function(str) {
    return str.replace(/[a-z0-9]+/gi, function(word) {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    });
  },
  q: function(q, c) {
    return (c || document).querySelector(q);
  },
  qq: function(q, c) {
    return [].slice.call((c || document).querySelectorAll(q));
  },
  iif: function(expr, val1, val2) {
    return expr ? val1 : val2;
  },
  cookie: {
    set: function(key, value, expiry) {
      document.cookie = key + '=' + value + ';expires=' + expiry;
    },
    get: function(key) {
      var found = document.cookie.split('; ').filter(function(cookie) {
        return cookie.split('=')[0] === key;
      })[0];
      if (found) return found.split('=')[1];
    },
    remove: function(key) {
      document.cookie = key + '=delete;expires=' + new Date(Date.now() - 100).toUTCString();
    }
  }
};

app.mutil = {
  requestWithLoader: function(obj) {
    var loaders = util.qq('.loader');
    loaders.forEach(function(loader) {
      loader.style.display = 'block';
    });
    return m.request(obj).then(function(data) {
      loaders.forEach(function(loader) {
        loader.style.display = 'none';
      });
      return data;
    });
  },
  table: function(props, rows) {
    return m('table' + props, rows.map(function(row) {
      return m('tr', row.map(function(cell) {
        return m('td', cell);
      }));
    }));
  },
  route: function(href, children, props) {
    return m('a' + (props || ''), {
      config: m.route,
      href: href
    }, children);
  },
  icon: function(name, children) {
    return m('i.fa.fa-' + name, children);
  }
};
