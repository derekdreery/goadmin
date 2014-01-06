/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.{{Moduleplural}}Grid = function(config){
	
	if(!config)
	{
		config = {};
	}



	
	config.title = GO.{{moduleplural}}.lang.{{moduleplural}};
	config.layout='fit';
	config.autoScroll=true;
	config.split=true;
	config.store = new GO.data.JsonStore({
		url: GO.url('{{moduleplural}}/{{modulename}}/store'),		
		root: 'results',
		id: 'id',
		totalProperty:'total',
		fields: ['id','category_id','user_name','ctime','mtime','name'],
		remoteSort: true,
		model:"GO_{{Moduleplural}}_Model_{{Nodulename}}"
	});

	config.store.on('load', function()
	{
		if(config.store.reader.jsonData.feedback)
		{
			alert(config.store.reader.jsonData.feedback);
		}
	},this)

	config.paging=true;

	
	config.columns=[
		{
			header: GO.lang.strName,
			dataIndex: 'name',
			sortable: true
		},
		{
			header: GO.lang.strOwner,
			dataIndex: 'user_name',
			sortable: false,
			hidden:true
		},		{
			header: GO.lang.strCtime,
			dataIndex: 'ctime',
			hidden:true,
			sortable: true,
			width:110
		},		{
			header: GO.lang.strMtime,
			dataIndex: 'mtime',
			sortable: true,
			width:110
		}
		];
	
	config.view=new Ext.grid.GridView({
		autoFill: true,
		forceFit: true,
		emptyText: GO.lang['strNoItems']		
	});
	
	config.sm=new Ext.grid.RowSelectionModel();
	config.loadMask=true;
	
	this.searchField = new GO.form.SearchField({
		store: config.store,
		width:320
	});
		    	
	config.tbar = [GO.lang['strSearch'] + ':', this.searchField];
	
	GO.{{moduleplural}}.{{Moduleplural}}Grid.superclass.constructor.call(this, config);
};


Ext.extend(GO.{{moduleplural}}.{{Moduleplural}}Grid, GO.grid.GridPanel,{
	
});
