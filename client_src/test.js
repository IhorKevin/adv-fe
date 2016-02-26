/**
 * Created by MOZ on 26.02.2016.
 */
var posts = Data.getPosts();

var jsonTmpl = Handlebars.compile($('#to-json-tmpl').html());
var tableTmpl = Handlebars.compile($('#table-tmpl').html());

Handlebars.registerHelper('toJSON', function(data){
    return JSON.stringify(data, null, '\t');
});

Handlebars.registerHelper('toTable', function(elems, options){
    var string;

    $(elems).each(function(i, item){
        string += '<li class="wrapper__row">' + options.fn(item) + '</li>';
    });

    return string;
});

$('#json-box').html(jsonTmpl({posts: posts}));
$('#table-box').html(tableTmpl({posts: posts}));
