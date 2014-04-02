{{license}}
 
GO.{{moduleplural}}.MainPanel = Ext.extend(Ext.Panel, {

	constructor : function(config) {

		config = Ext.applyIf({
			centerPanel: new Ext.Panel({
				region: 'center',
				id: '{{moduleplural}}-center-panel',
				border: true
			}),
			westPanel: new Ext.Panel({
				region: 'west',
				id: '{{moduleplural}}-west-panel',
				title: 'TODO',
				width: 230,
				split: true,
				collapsible: true,
				collapseMode: 'mini',
			}),
			eastPanel: new Ext.Panel({
				region: 'east',
				id: '{{moduleplural}}-east-panel',
				width: 440,
				collapsible: true,
				collapseMode: 'mini',
				border: true
			}),
			tbar: new Ext.Toolbar({
				cls:'go-head-tb',
				items: [{
	      	xtype:'htmlcomponent',
					html:GO.{{moduleplural}}.lang.name,
					cls:'go-module-title-tbar'
				}]
			}),
			layout: 'border'
		}, config);

		Ext.apply(config, {
			items: [
				config.westPanel,
				config.centerPanel,
				config.eastPanel
			]
		});

		GO.{{moduleplural}}.MainPanel.superclass.constructor.call(this, config);

	},

	afterRender : function() {
		// TODO load stores/setup listeners as necessary
		GO.{{moduleplural}}.MainPanel.superclass.afterRender.call(this);
	}
});

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


/* {LINKHANDLERS} */

/* {NEWMENUITEMS} */


