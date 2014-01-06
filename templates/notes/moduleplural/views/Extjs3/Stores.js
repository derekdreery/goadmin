GO.{{moduleplural}}.writableCategoriesStore = new GO.data.JsonStore({
	url: GO.url('{{moduleplural}}/category/store'),
	baseParams: {
		permissionLevel:GO.permissionLevels.write
	},	
	fields: ['id', 'name', 'user_name']	
});

GO.{{moduleplural}}.writableAdminCategoriesStore = new GO.data.JsonStore({
	url: GO.url('{{moduleplural}}/category/store'),
	baseParams: {
		permissionLevel:GO.permissionLevels.write
	},	
	fields: ['id', 'name', 'user_name']
});


GO.{{moduleplural}}.readableCategoriesStore = new GO.data.JsonStore({
	url: GO.url('{{moduleplural}}/category/store'),
	baseParams: {
		limit:GO.settings.config.nav_page_size
	},
	fields: ['id','user_name','acl_id','name','checked']
});
