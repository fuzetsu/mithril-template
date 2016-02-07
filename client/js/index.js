/* global app m util */
(function() {

  app.shared = {
    // put shared app vars in here
  };

  /**
   ** Layout
   **/

  // items that will appear in the nav
  // add auth: true if authentication is required to view navitem
  var navItems = [{
    name: 'Home',
    path: '/home',
    icon: 'home'
  }];

  // layout view generator
  var layout = function(title, state, content, nav) {
    var isLoggedIn = false; // add logic here to determine login state
    return m('div.layout', {
      className: state.isMenuOpen ? 'add-menu-offset' : ''
    }, [
      m('h1.header', [
        m('span.back-button', {
          onclick: function() {
            window.history.back();
          }
        }, app.mutil.icon('arrow-left')),
        m('span.menu-toggle', {
          onclick: function() {
            state.isMenuOpen = !state.isMenuOpen;
          }
        }, app.mutil.icon('bars')),
        title
      ]),
      m('div.content', content),
      m('div.menu', {
        className: state.isMenuOpen ? 'menu-open' : 'menu-closed'
      }, [
        navItems.map(function(item) {
          if ('auth' in item) {
            if ((isLoggedIn && item.auth === false) || (!isLoggedIn && item.auth === true)) {
              return;
            }
          }
          return app.mutil.route(item.path, [
            app.mutil.icon(item.icon), ' ', item.name
          ], '.menu-item' + (item.name === title ? '.active' : ''));
        })
      ])
    ]);
  };

  // second level template for layout pass component pertaining to route in order to generate page
  var l = function(title, component, args) {
    return {
      controller: function() {
        document.title = 'APP_NAME - ' + title;
        return {
          state: {
            isMenuOpen: false
          }
        };
      },
      view: function(ctrl) {
        return layout(title, ctrl.state, m(component, args || {}));
      }
    };
  };

  /**
   ** Routes
   **/

  // loads routes and mounts app
  app.loadRoutes = function() {

    var cmp = app.cmp;

    var mountElem = util.q('#app');
    var defaultRoute = '/home';

    // mode for routing ('hash', 'pathname', 'query')
    m.route.mode = 'pathname';

    // define application routes here
    m.route(mountElem, defaultRoute, {
      '/home': l('Home', cmp.Home)
    });

  };

  /**
   ** Module Loading
   **/

  var count = 0;
  var goal = 3;
  var libs = ['util'];
  var models = ['model-sample'];
  var components = ['home'];

  var done = function() {
    if (++count === goal) {
      app.loadRoutes();
    }
  };

  // create holders
  app.model = {};
  app.cmp = {};

  // start module load
  app.loadModules('/js/lib/', libs, done);
  app.loadModules('/js/models/', models, done);
  app.loadModules('/js/components/', components, done);

}());
