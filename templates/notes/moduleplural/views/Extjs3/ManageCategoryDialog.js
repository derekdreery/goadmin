/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.ManageCategoriesDialog = function(config){
	
	
	if(!config)
	{
		config={};
	}
		
	this.categoriesGrid = new GO.{{moduleplural}}.ManageCategoriesGrid();

	config.maximizable=true;
	config.layout='fit';
	config.modal=false;
	config.resizable=true;
	config.width=600;
	config.height=400;
	config.closeAction='hide';
	config.title= GO.{{moduleplural}}.lang.manageCategories;					
	config.items= this.categoriesGrid;
	config.buttons=[{
			text: GO.lang['cmdClose'],
			handler: function(){				
				this.hide();				
			},
			scope:this
		}					
	];
	
	GO.{{moduleplural}}.ManageCategoriesDialog.superclass.constructor.call(this, config);

	this.on('hide', function(){
		if(this.categoriesGrid.changed)
		{
			this.fireEvent('change');
			this.categoriesGrid.changed=false;
		}
	}, this);
	
	this.addEvents({'change':true});
}

Ext.extend(GO.{{moduleplural}}.ManageCategoriesDialog, GO.Window,{

});
