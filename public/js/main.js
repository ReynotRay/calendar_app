var TodoList = function() {
    this.items = [];
    this.itemList = $('#item-list');
    this.itemListTemplate = Handlebars.compile($("#item-list-template").html());
    this.input = $('#item-input');
    this.input.keydown(this.onAddInputKeydown.bind(this));
    this.main = $('#main');
    this.main.on('dblclick', 'li',
                 this.onEditItemClicked.bind(this));
    this.main.on('keydown', 'li input',
                 this.onEditInputKeydown.bind(this));
    this.main.on('focusout', 'li input',
                 this.onEditFocusOut.bind(this));
    this.main.on('click', 'li .delete-item',
                 this.onDeleteItemClicked.bind(this));
    this.getItems();
};

TodoList.prototype.onAddInputKeydown = function(event){
	if (event.which != 13) {
		return;
	}
	var input = $(event.target);
	var value = input.val().trim();
	if (value!== '') {
		this.addItem(value);
	}
	input.val('');
	event.preventDefault();
   };
TodoList.prototype.onEditItemClicked = function (event) {
	var item = $(event.target).parents('li');
	var display = item.children('.display');
	var input = item.children('input');
	var name = display.children('.name');
	input.show();
	input.focus();
	input.val(name.text());
	display.hide();
	event.preventDefault();
};
TodoList.prototype.onEditInputKeydown = function (event) {
	if(event.which != 13){
		return;
		}
	var input = $(event.target);
	input.blur();
};
TodoList.prototype.onEditFocusOut = function (event) {
	var item = $(event.target).parents('li');
	var id = item.data('id');
	var display = item.children('.display');
	var input = item.children('input');
	var name = display.children('.name');
	var value = input.val().trim();
	if (value != ''){
		this.editItem(id, value);
		name.text(value);
	}
	input.hide();
	display.show();
	event.preventDefault();
}
TodoList.prototype.onDeleteItemClicked = function (event){
	var id = $(event.target).parents('li').data('id');
    this.deleteItem(id);
}
TodoList.prototype.getItems = function () {
	var ajax = $.ajax('/items', {
		type: 'Get',
		dataType: 'json'
	});
	ajax.done(this.onGetItemsDone.bind(this));
};
 TodoList.prototype.addItem = function (name){
 	var item = {'name':name} ;
 	var ajax = $.ajax('/items', {
 		type:'POST',
 		data: JSON.stringify(item),
 		dataType:'json',
 		//what does content type and application/json mean
 		contentType:'application/json'
 	});
 	ajax.done(this.getItems.bind(this));
 };

 TodoList.prototype.deleteItem = function (id) {
 	var ajax = $.ajax('/items/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done(this.getItems.bind(this));
};
 TodoList.prototype.editItem = function (id,name) {
 	var item = {'name':name, 'id':id};
 	var ajax = $.ajax('/items/' + id, {
 		type:'PUT',
 		data:JSON.stringify(item),
 		dataType:'json',
 		 contentType: 'application/json'
 	});
 	ajax.done(this.getItems.bind(this));
 };
TodoList.prototype.onGetItemsDone = function(items) {
    this.items = items;
    this.updateItemsView();
};
TodoList.prototype.updateItemsView = function() {
    var context = {
        items: this.items
    };
    var itemList = $(this.itemListTemplate(context));
    this.itemList.replaceWith(itemList);
    this.itemList = itemList;
};

$(document).ready(function() {
    $('.header').hide();
    $('.calendar-wrap').hide();
    $('.register').hide();
    $('.register').delay(5000).fadeIn();
    $('.header').delay(5000).fadeIn();
    $('.calendar-wrap').delay(7000).fadeIn();
     var app = new TodoList();
});

