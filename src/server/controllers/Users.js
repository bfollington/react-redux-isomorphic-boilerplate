import Boom from "boom";

function getAll() {
    return db.User.findAll();
}

var users = {
    "all": {
        method: 'GET',
        path: '/api/user/{id}',
        handler: (request, reply) => {
            getAll().then( res => {
                reply(res);
            });
        },
        config: {
            description: 'Say hello!',
            notes: 'The user parameter defaults to \'stranger\' if unspecified',
            tags: ['api', 'greeting']
        }
    },
    "update": {
        method: "POST",
        path: "/api/user",
        handler: function(req, reply) {
            var params = req.payload;

            if (params.id) {
                var user;
                db.User.findById(params.id)
                .then( user => user.update(params) )
                .then( () => reply(user) );

            } else {
                db.User.create(params)
                .then( user => reply(user) );
            }

        }
    }

};

export default users;
