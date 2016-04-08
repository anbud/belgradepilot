Router.configure({
    fastRender: true,
    loadingTemplate: 'loading',
});

Router.route('/', {
    name: 'home',
    waitOn: function() {
        return [Meteor.subscribe('sources'),Meteor.subscribe('questions')];
    },
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