/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.{{Modulename}}Panel = Ext.extend(GO.DisplayPanel,{
	model_name : "GO_{{Moduleplural}}_Model_{{Modulename}}",
	
	stateId : '{{moduleplural}}-{{modulename}}-panel',

	//deprecated. tabbedformdialog refreshes active displaypanel automatically.
	editGoDialogId : '{{modulename}}',
	
	editHandler : function(){
		GO.{{moduleplural}}.show{{Modulename}}Dialog(this.model_id);		
	},	
		
	initComponent : function(){	
		
		this.template = "";
		
		this.loadUrl=('{{moduleplural}}/{{modulename}}/display');
		
		if(GO.customfields)
		{
			this.template +=GO.customfields.displayPanelTemplate;
		}

		if(GO.tasks)
			this.template +=GO.tasks.TaskTemplate;

		if(GO.calendar)
			this.template += GO.calendar.EventTemplate;
		
		if(GO.workflow)
			this.template +=GO.workflow.WorkflowTemplate;

		this.template += GO.linksTemplate;
				
		if(GO.files)
		{
			Ext.apply(this.templateConfig, GO.files.filesTemplateConfig);
			this.template += GO.files.filesTemplate;
		}
		Ext.apply(this.templateConfig, GO.linksTemplateConfig);
		
		if(GO.comments)
		{
			this.template += GO.comments.displayPanelTemplate;
		}		
		
		if(GO.lists)
			this.template += GO.lists.ListTemplate;

		this.template += GO.createModifyTemplate;

		GO.{{moduleplural}}.{{Modulename}}Panel.superclass.initComponent.call(this);
	},
	
	afterLoad : function(result) {

	},

});			
