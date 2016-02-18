/**
 * Created by MOZ on 19.02.2016.
 */

$(document).ready(function(){

    var post = Data.getCurrentPost();

    var postTemplate = Handlebars.compile( $( '#post-page-tmpl' ).html() );

    function renderPost() {
        $('.content').html(
            postTemplate({
                imgUrl: post.imgUrl,
                description: post.description,
                author: Data.getUser(post.userId).name
            })
        );
    }

    renderPost();
});