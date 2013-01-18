<script type="text/template" id="user_list_template">
	<h4>Users</h4>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Nickname</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<% _.each(users, function(user){ %>
			<tr>
			  <td><%= user.get('id') %></td>
			  <td><%= user.get('name') %></td>
			  <td><%= user.get('nickname') %></td>
			  <td>
			    <a href="<%= user.get('nickname') %>">View User</a>
			  </td>
			</tr>	
			<% }); %>
	</table>
</script>
