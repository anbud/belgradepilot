Router.configure({
    fastRender: true,
    loadingTemplate: 'loading',
});

Router.route('/', {
    name: 'home',
    action: function() {
        this.render('home');
    }
});

Router.route('/register', {
    name: 'register',
    action: function() {
        this.render('register');
    }
});