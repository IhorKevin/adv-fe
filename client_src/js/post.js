/**
 * Created by MOZ on 19.02.2016.
 */

$(document).ready(function () {

    var post = Data.getCurrentPost();

    var postTemplate = Handlebars.compile( $( '#post-page-tmpl' ).html());
    Handlebars.registerPartial( 'post-comment', $( '#post-comment-tmpl' ).html() );
    Handlebars.registerPartial( 'post-related', $( '#post-related-tmpl' ).html() );

    function renderPost() {
        $('.content').html(
            postTemplate({
                imgUrl: post.imgUrl,
                description: post.description,
                author: Data.getUser(post.userId).name,
                comments: Data.getPostComments(),
                related: Data.getRelatedPosts()
            })
        );
    }

    renderPost();

});
