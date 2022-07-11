const assert = require('assert');
const models = require('../../../../core/server/models');

describe('Unit: models/comment', function () {
    before(function () {
        models.init();
    });

    it('has a default status of "published"', function () {
        const model = models.Comment.forge();
        assert(model.defaults().status === 'published');
    });

    describe('defaultRelations', function () {
        it('Adds the default relations to read and edit methods', function () {
            for (const method of ['findAll', 'findPage', 'edit', 'findOne']) {
                const options = {};
                models.Comment.defaultRelations(method, options);
                assert.deepEqual(options.withRelated, [
                    'member',
                    'likes',
                    'replies',
                    'replies.member',
                    'replies.likes'
                ]);
            }

            {
                const options = {};
                models.Comment.defaultRelations('add', options);
                assert(!options.withRelated);
            }
        });
    });

    describe('permissible', function () {
        it('Returns true when the user has permission', function () {
            const result = models.Comment.permissible(
                models.Comment.forge(),
                'edit',
                {},
                [],
                [],
                true,
                false,
                false
            );

            assert(result);
        });
    });
});
