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
    name: 'question',
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

Router.route('/contact', {
    name: 'contact',
    action: function() {
        this.render('contact');
    }
});
Router.route('/ask', {
    name: 'ask',
    action: function() {
        this.render('ask');
    }
});

Router.route('/about', {
    name: 'about',
    action: function() {
        this.render('about');
    }
});
