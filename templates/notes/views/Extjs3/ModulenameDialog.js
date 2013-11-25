/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.{{Modulename}}Dialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	
	customFieldType : "GO_{{Moduleplural}}_Model_{{Modulename}}",
	
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'name',
			goDialogId:'{{modulename}}',
			title:GO.{{moduleplural}}.lang.{{modulename}},
			height: 560,
			formControllerUrl: '{{moduleplural}}/{{modulename}}'
		});
		
		GO.{{moduleplural}}.{{Modulename}}Dialog.superclass.initComponent.call(this);	
	},
	
	beforeLoad : function(remoteModelId,config) {
	
	},
	
	afterLoad : function(remoteModelId,config,action) {

	},
	
	beforeSubmit : function(params) {

	},
	
	afterSubmit : function(action) {

	},
	
	buildForm : function () {
		
		this.selectLinkField = new GO.form.SelectLink({
			anchor:'100%'
		});

		this.propertiesPanel = new Ext.Panel({
			title:GO.lang['strProperties'],
			cls:'go-form-panel',
			layout:'form',
			labelWidth:160,
			items:[{
				xtype: 'textfield',
				name: 'name',
				width:300,
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.lang.strName
			},this.selectCategory = new GO.form.ComboBox({
				fieldLabel: GO.{{moduleplural}}.lang.category_id,
				hiddenName:'category_id',
				anchor:'100%',
				emptyText:GO.lang.strPleaseSelect,
				store: GO.{{moduleplural}}.writableCategoriesStore,
				pageSize: parseInt(GO.settings.max_rows_list),
				valueField:'id',
				displayField:'name',
				mode: 'remote',
				triggerAction: 'all',
				editable: true,
				selectOnFocus:true,
				forceSelection: true,
				allowBlank: false
			}),
			this.selectLinkField,
			]				
		});

		this.addPanel(this.propertiesPanel);
	},
	
});
