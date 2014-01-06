/**
 * Based on notes community module
 */

 
GO.{{moduleplural}}.MainPanel = function(config){
	
	if(!config)
	{
		config = {};
	}

	this.centerPanel = new GO.{{moduleplural}}.{{Moduleplural}}Grid({
		region:'center',
		id:'{{moduleplural}}-center-panel',
		border:true
	});
	
	this.westPanel= new GO.grid.MultiSelectGrid({
		region:'west',
		id:'{{moduleplural}}-multiselect',
		title:GO.{{moduleplural}}.lang.categories,
		loadMask:true,
		store: GO.{{moduleplural}}.readableCategoriesStore,
		width: 230,
		split:true,
		allowNoSelection:true,
		collapsible:true,
		collapseMode:'mini',
		bbar: new GO.SmallPagingToolbar({
			items:[this.searchField = new GO.form.SearchField({
				store: GO.{{moduleplural}}.readableCategoriesStore,
				width:120,
				emptyText: GO.lang.strSearch
			})],
			store:GO.{{moduleplural}}.readableCategoriesStore,
			pageSize:GO.settings.config.nav_page_size
		}),
		relatedStore: this.centerPanel.store
	});

//	this.westPanel.on('change', function(grid, categories, records)
//	{
//		if(records.length){
//			this.centerPanel.store.baseParams.{{moduleplural}}_categories_filter = Ext.encode(categories);
//			this.centerPanel.store.reload();
//			//delete this.centerPanel.store.baseParams.{{moduleplural}}_categories_filter;
//		}
//	}, this);
//	
//	this.westPanel.store.on('load', function()
//	{
//		this.centerPanel.store.baseParams.{{moduleplural}}_categories_filter = Ext.encode(this.westPanel.getSelected());
//		this.centerPanel.store.load();		
//	}, this);

	
	
	this.centerPanel.on("delayedrowselect",function(grid, rowIndex, r){
		this.eastPanel.load(r.data.id);		
	}, this);

	this.centerPanel.on('rowdblclick', function(grid, rowIndex){
		this.eastPanel.editHandler();
	}, this);
	
	this.eastPanel = new GO.{{moduleplural}}.{{Modulename}}Panel({
		region:'east',
		id:'{{moduleplural}}-east-panel',
		width:440,
		collapsible:true,
		collapseMode:'mini',
		border:true
	});
	
	config.tbar=new Ext.Toolbar({
		cls:'go-head-tb',
		items: [{
	      	 	xtype:'htmlcomponent',
			html:GO.{{moduleplural}}.lang.name,
			cls:'go-module-title-tbar'
		},{
			grid: this.centerPanel,
			xtype:'addbutton',
			handler: function(b){
				this.eastPanel.reset();

				GO.{{moduleplural}}.show{{Modulename}}Dialog(0, {
						loadParams:{
							category_id: b.buttonParams.id						
						}
				});
			},
			scope: this
		},{
			xtype:'deletebutton',
			grid:this.centerPanel,
			handler: function(){
				this.centerPanel.deleteSelected({
					callback : this.eastPanel.gridDeleteCallback,
					scope: this.eastPanel
				});
			},
			scope: this
		},{
			iconCls: '{{moduleplural}}-btn-categories',
			text: GO.{{moduleplural}}.lang.manageCategories,
			cls: 'x-btn-text-icon',
			handler: function(){
				if(!this.categoriesDialog)
				{
					this.categoriesDialog = new GO.{{moduleplural}}.ManageCategoriesDialog();
					this.categoriesDialog.on('change', function(){
						this.westPanel.store.reload();
						GO.{{moduleplural}}.writableCategoriesStore.reload();
					}, this);
				}
				this.categoriesDialog.show();
			},
			scope: this
				
		}
//		,{
//				iconCls: 'btn-export',
//				text: GO.lang.cmdExport,
//				cls: 'x-btn-text-icon',
//				handler:function(){				
//					if(!this.exportDialog)
//					{
//						this.exportDialog = new GO.ExportGridDialog({
//							url: '{{moduleplural}}/{{modulename}}/export',
//							name: '{{moduleplural}}',
//							documentTitle:'Export{{Modulename}}',
//							colModel: this.centerPanel.getColumnModel()
//						});
//					}		
//					this.exportDialog.show();
//				},
//				scope: this
//			}
		]
		});

	config.items=[
	this.westPanel,
	this.centerPanel,
	this.eastPanel
	];	
	
	config.layout='border';
	GO.{{moduleplural}}.MainPanel.superclass.constructor.call(this, config);	
};


Ext.extend(GO.{{moduleplural}}.MainPanel, Ext.Panel, {
	afterRender : function()
	{
		GO.dialogListeners.add('{{modulename}}',{
			scope:this,
			save:function(){
				this.centerPanel.store.reload();
			}
		});

		GO.{{moduleplural}}.readableCategoriesStore.load();
		
		GO.{{moduleplural}}.MainPanel.superclass.afterRender.call(this);
	}
});

GO.{{moduleplural}}.show{{Modulename}}Dialog = function({{modulename}}_id, config){

	if(!GO.{{moduleplural}}.{{modulename}}Dialog)
		GO.{{moduleplural}}.{{modulename}}Dialog = new GO.{{moduleplural}}.{{Modulename}}Dialog();
	
	GO.{{moduleplural}}.{{modulename}}Dialog.show({{modulename}}_id, config);
}


/*
 * This will add the module to the main tabpanel filled with all the modules
 */
 
GO.moduleManager.addModule('{{moduleplural}}', GO.{{moduleplural}}.MainPanel, {
	title : GO.{{moduleplural}}.lang.{{moduleplural}},
	iconCls : 'go-tab-icon-{{moduleplural}}'
});
/*
 * If your module has a linkable item, you should add a link handler like this. 
 * The index (no. 1 in this case) should be a unique identifier of your item.
 * See classes/base/links.class.inc for an overview.
 * 
 * Basically this function opens a project window when a user clicks on it from a 
 * panel with links. 
 */

GO.linkHandlers["GO_{{Moduleplural}}_Model_{{Modulename}}"]=function(id){
	if(!GO.{{moduleplural}}.linkWindow){
		var {{modulename}}Panel = new GO.{{moduleplural}}.{{Modulename}}Panel();
		GO.{{moduleplural}}.linkWindow= new GO.LinkViewWindow({
			title: GO.{{moduleplural}}.lang.{{modulename}},
			items: {{modulename}}Panel,
			{{modulename}}Panel: {{modulename}}Panel,
			closeAction:"hide"
		});
	}
	GO.{{moduleplural}}.linkWindow.{{modulename}}Panel.load(id);
	GO.{{moduleplural}}.linkWindow.show();
	return GO.{{moduleplural}}.linkWindow;
}

GO.linkPreviewPanels["GO_{{Moduleplural}}_Model_{{Modulename}}"]=function(config){
	config = config || {};
	return new GO.{{moduleplural}}.{{Modulename}}Panel(config);
}


/* {LINKHANDLERS} */


GO.newMenuItems.push({
	text: GO.{{moduleplural}}.lang.{{modulename}},
	iconCls: 'go-model-icon-GO_{{Moduleplural}}_Model_{{Modulename}}',
	handler:function(item, e){		
		GO.{{moduleplural}}.show{{Modulename}}Dialog(0, {
			link_config: item.parentMenu.link_config			
		});
	}
});
/* {NEWMENUITEMS} */


