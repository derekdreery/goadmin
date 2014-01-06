/**
 * Based on notes community module
 */
 

GO.{{moduleplural}}.ManageCategoriesGrid = Ext.extend(GO.grid.GridPanel,{
	changed : false,
	
	initComponent : function(){
		
		Ext.apply(this,{
			standardTbar:true,
			standardTbarDisabled:!GO.settings.modules.{{moduleplural}}.write_permission,
			store: GO.{{moduleplural}}.writableAdminCategoriesStore,
			border: false,
			paging:true,
			view:new Ext.grid.GridView({
				autoFill: true,
				forceFit: true,
				emptyText: GO.lang['strNoItems']		
			}),
			cm:new Ext.grid.ColumnModel({
				defaults:{
					sortable:true
				},
				columns:[
				{
					header: GO.lang.strName, 
					dataIndex: 'name'
				},{
					header: GO.lang.strOwner, 
					dataIndex: 'user_name',
					sortable: false
				}		
				]
			})
		});
		
		GO.{{moduleplural}}.ManageCategoriesGrid.superclass.initComponent.call(this);
		
		GO.{{moduleplural}}.writableAdminCategoriesStore.load();	
	},
	
	dblClick : function(grid, record, rowIndex){
		this.showCategoryDialog(record.id);
	},
	
	btnAdd : function(){				
		this.showCategoryDialog();	  	
	},
	showCategoryDialog : function(id){
		if(!this.categoryDialog){
			this.categoryDialog = new GO.{{moduleplural}}.CategoryDialog();

			this.categoryDialog.on('save', function(){   
				this.store.load();
				this.changed=true;	    			    			
			}, this);	
		}
		this.categoryDialog.show(id);	  
	},
	deleteSelected : function(){
		GO.{{moduleplural}}.ManageCategoriesGrid.superclass.deleteSelected.call(this);
		this.changed=true;
	}
});
