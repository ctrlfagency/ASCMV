// Autocomplete script par Thibaut LOMBARD
// Copyleft  - 2016 - 2017 
// License GNU - GPL3
var getData = function (request, response) {
						        	$.ajax({
											url : "https://api.ascmv.net/search/api/mode/classiclimit-ALL/q/"+request.term+"/limit/10/callback/?",
											dataType:"jsonp",
											jsonp:"callback",
											success:function(data)
												{
											response(data.aya);
												}
											});
							};
var $_searchQuery = $('#search-text');
$.ui.autocomplete.prototype._renderItem = function (ul, item) {
    var re = new RegExp($.trim(this.term.toLowerCase()));
    var t = item.label.replace(re, "<b>" + $.trim(this.term.toLowerCase()) + "</b>");
    return $("<li></li>")
        //.data("item.autocomplete", item)
        .append("<i>" + t.substring(0, 50) + "..</i>")
        .appendTo(ul);
};
$_searchQuery.autocomplete({
			source: getData
});
