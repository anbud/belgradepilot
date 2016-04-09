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

Router.route('/question/:id', {
    name: 'register',
    waitOn: function() {
        return Meteor.subscribe('question', this.params.id);
    },
    action: function() {
        this.render('question', {
            data: function() {
                return Questions.findOne();
            }
        });
    }
});