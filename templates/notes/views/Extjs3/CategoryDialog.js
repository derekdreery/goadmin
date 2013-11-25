/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.CategoryDialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'name',
			title:GO.{{moduleplural}}.lang.category,
			formControllerUrl: '{{moduleplural}}/category',
			height:600
		});
		
		GO.{{moduleplural}}.CategoryDialog.superclass.initComponent.call(this);	
	},
	buildForm : function () {

		this.propertiesPanel = new Ext.Panel({
			url: GO.settings.modules.{{moduleplural}}.url+'action.php',
			border: false,
			baseParams: {task: 'category'},			
			title:GO.lang['strProperties'],			
			cls:'go-form-panel',waitMsgTarget:true,			
			layout:'form',
			autoScroll:true,
			items:[{
				xtype: 'textfield',
			  name: 'name',
				anchor: '100%',
			  allowBlank:false,
			  fieldLabel: GO.lang.strName
			},this.selectUser = new GO.form.SelectUser({
				fieldLabel: GO.lang['strUser'],
				disabled : !GO.settings.has_admin_permission,
				value: GO.settings.user_id,
				anchor: '100%'
			})]
				
		});

		this.addPanel(this.propertiesPanel);	
 
    this.addPermissionsPanel(new GO.grid.PermissionsPanel());    
	}
});
