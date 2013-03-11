$(document).ready(function() 
{ 
    //
    // all the model
    /////////////////////////////////
    var profile_id = $('body').data('resumator_profile_id');

    //
    // all the view elements
    /////////////////////////////////
    var view_root = $('#user_view');
    var view_name = $('#user_view_name');
    var view_nickname = $('#user_view_nickname');
    var view_bio = $('#user_view_bio');
    var view_profile = $('#user_view_profile');
    var view_profile_edit = $('#user_view_profile_edit');
    var view_profile_form = $('#user_view_profile_form');
    var view_link_container = $('#user_view_links');
    var view_link = $('#user_view_link');
    var view_link_edit = $('#user_view_link_edit');
    var view_link_name = $('#user_view_link_name');
    var view_link_url = $('#user_view_link_url');
    var view_link_form = $('#user_view_link_form');

    //
    // all the buttons
    /////////////////////////////////
    var button_profile_edit = $('#user_view_edit_profile');
    var button_profile_edit_save = $('#user_view_profile_edit_save');
    var button_profile_edit_cancel = $('#user_view_profile_edit_cancel');
    var button_link_save = $('#user_view_link_edit_save');
    var button_link_cancel = $('#user_view_link_edit_cancel');
    var button_link_add = $('#user_view_add_link');
    var button_link_edit = $('#user_view_edit_link');
    var button_link_remove = $('#user_view_remove_link');

    //
    // all the controllers
    /////////////////////////////////
    function on_button_profile_edit(e)
    { 
        var data = e.data;

        var nickname_field = view_profile_edit.find('input[name=nickname]');
        nickname_field.val(data.nickname);

        var bio_field = view_profile_edit.find('input[name=bio]');
        bio_field.val(data.profile.bio);

        button_profile_edit.hide();
        view_profile.hide();
        view_profile_edit.show();
    }

    function on_button_profile_edit_save(e)
    { 
        var uid = e.data.uid;
        var data = new Object();
        $.each(view_profile_form.serializeArray(), function(_, pair) 
        {
            data[pair.name] = pair.value;
        });

        var url = "/api/user/" + uid;
        var r = $.ajax( { url: url, type: 'PUT', data: data });
        r.done(function(user) { render(user); });
        r.fail(function() { console.log("can't save profile "); });
    }

    function on_button_profile_edit_cancel(e)
    { 
        button_profile_edit.show();
        view_profile.show();
        view_profile_edit.hide();
    }

    function on_button_link_save(e)
    { 
        var link_id  = null;
        if (e.data.link !== null)
        {
           link_id = e.data.link_id;
        } 

        var data = new Object();
        $.each(view_link_form.serializeArray(), function(_, pair) 
        {
            data[pair.name] = pair.value;
        });

        var url = null;
        var type = null;
        if (link_id !== null)
        {
            url = "/api/user/" + profile_id + "/link/" + link_id;
            type = "PUT";
        }
        else
        {
            url = "/api/user/" + profile_id + "/links";
            type = "POST";
        }
        var r = $.ajax( { url: url, type: type, data: data });
        r.done(function(user) { render(user); });
        r.fail(function() { console.log("can't save link "); });
    }


    function on_button_link_cancel(e)
    { 

        var link = e.data.link;
        var parent_element = e.data.parent_element;
        if (link !== null)
        {
            parent_element.show();
        }
        view_link_edit.hide();
        button_link_add.show();
    }

    function on_button_link_add(e) 
    { 
        var url_field = view_link_edit.find('input[name=url]');
        url_field.val('');

        var name_field = view_link_edit.find('input[name=name]');
        name_field.val('');

        view_link_container.append(view_link_edit);

        var event_data = {'link': null, parent_element: null};
        button_link_cancel.click(event_data, on_button_link_cancel);
        button_link_save.click(event_data, on_button_link_save);

        button_link_add.hide();
        view_link_edit.show();
    }

    function on_button_link_edit(e)
    { 
        var link = e.data.link;
        var parent_element = e.data.parent_element;

        parent_element.before(view_link_edit);
        parent_element.hide();

        var event_data = {'link': link, parent_element: parent_element};

        button_link_add.hide();
         
        button_link_cancel.click(event_data, on_button_link_cancel);
        button_link_save.click(event_data, on_button_link_save);

        var url_field = view_link_edit.find('input[name=url]');
        url_field.val(link.url);

        var name_field = view_link_edit.find('input[name=name]');
        name_field.val(link.name);

        view_link_edit.show();
    }

    function on_button_link_remove(e)
    { 
        var uid = e.data.uid;
        var url = "/api/user/" + uid + '/' + e.data.link.id;
        var r = $.ajax( { url: url, type: 'DELETE' });
        r.done(function(user) { render(user); });
        r.fail(function() { console.log("can't delete link "); });
    }

    function on_mouseenter_link(e)
    { 
        if (view_link_edit.is(":visible"))
        {
            return;
        }

        e.data.edit_button.show();
        e.data.remove_button.show();
    }

    function on_mouseleave_link(e)
    { 
        e.data.edit_button.hide();
        e.data.remove_button.hide();
    }

    //
    // all the logic
    /////////////////////////////////
    function render(data)
    {
        var link_data = null;
        var new_element = null;
        var edit_button = null;
        var event_data = null;
        var remove_button = null;
        var links = data.profile.links;

        // dummy data for testing
        links = [{name: 'link1', url: 'http://www.url.1', id: 0},
                 {name: 'link2', url: 'http://www.url.2', id: 1},
                 {name: 'link3', url: 'http://www.url.3', id: 2}];

        view_nickname.html(data.nickname);
        view_bio.html(data.profile.bio);
        view_link_container.html(view_link);
        view_name.html(data.nickname);

        button_profile_edit.click(data, on_button_profile_edit);
        button_profile_edit_save.click(data, on_button_profile_edit_save);
        button_profile_edit_cancel.click(data, on_button_profile_edit_cancel);

        for (var i = 0; i < links.length; i++)
        {
            link_data = links[i];
            event_data = {link: link_data, uid: data.uid};

            view_link_name.html(link_data.name);
            view_link_url.html(link_data.url);

            button_link_edit.addClass("edit_hook");
            button_link_remove.addClass("remove_hook");

            new_element = view_link.clone(true);
            new_element.mouseenter(event_data, on_mouseenter_link);
            new_element.mouseleave(event_data, on_mouseleave_link);

            edit_button = new_element.find('.edit_hook');
            edit_button.click(event_data, on_button_link_edit);
            edit_button.hide();

            remove_button = new_element.find('.remove_hook');
            remove_button.click(event_data, on_button_link_remove);
            remove_button.hide();

            event_data.parent_element = new_element;
            event_data.edit_button = edit_button;
            event_data.remove_button = remove_button;

            view_link_container.append(new_element);

            button_link_edit.removeClass("edit_hook");
            button_link_remove.removeClass("remove_hook");

            new_element.show();
        }

        view_root.show();
    }

    function load_profile(profile_id)
    {
        var r = $.ajax( { url: "/api/user/" + profile_id });
        r.done(function(user) { render(user); });
        r.fail(function() { console.log("can't load profile "); });
        console.log("loading profile id " + profile_id);
    }

    //
    // all the initalizing
    /////////////////////////////////
    button_link_add.click(on_button_link_add);
    view_profile_edit.hide();
    view_root.hide();
    view_link.hide();
    view_link_edit.hide();

    console.log("resumator initalized");

    if (profile_id)
    {
        load_profile(profile_id);
    }
});

