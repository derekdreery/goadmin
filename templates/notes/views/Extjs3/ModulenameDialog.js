/**
 * Based on notes community module
 */
 
GO.{{moduleplural}}.{{Modulename}}Dialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	
	customFieldType : "GO_{{Moduleplural}}_Model_{{Modulename}}",
//	_passwordChangePermission : true,
	_userInputPassword : false,
	
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
		this._userPermissionPassword = false; //
//		this._passwordChangePermission = true; // before loading is initiated, e.g., with a new {{modulename}}, the user can change the encryption password
		delete this.formPanel.form.baseParams['currentPassword'];
	},
	
	afterLoad : function(remoteModelId,config,action) {
		var responseData = Ext.decode(action.response.responseText);
		
//		this._passwordChangePermission = responseData.data.passwordChangePermission;
		
		delete this.formPanel.form.baseParams['currentPassword'];
		
		this.contentField.setDisabled(responseData.data.encrypted);
		this._toggleNewPasswordFields(false);
		this.buttonOk.setDisabled(responseData.data.encrypted);
		this.buttonApply.setDisabled(responseData.data.encrypted);
		if (responseData.data.encrypted) {
			if (GO.util.empty(this.unlockDialog)) {
				this.unlockDialog = new GO.Window({
					modal:true,					
					title: GO.lang.decryptContent,
					width: 320,
					height: 120,
					layout: 'fit',
					keys:[{
							key: Ext.EventObject.ENTER,
							fn : this._loadWithPassword,
							scope : this
					}],
					items: [new Ext.form.FormPanel({
						cls:'go-form-panel',
						layout: 'form',
						items: [this.unlockPasswordField = new Ext.form.TextField({
							name: 'userInputPassword',
							fieldLabel: GO.lang['password'],
							inputType: 'password'
						})],
						buttons: [{
							text: GO.lang['cmdOk'],
							handler: this._loadWithPassword,
							scope: this
						},
						{
							text: GO.lang['cmdCancel'],
							handler: function()
							{
								this.hide();
								this.unlockDialog.hide();
							},
							scope: this
						}]
					})]
				});
//				this.unlockDialog.on('hide',function(){
//					this._passwordChangePermission = undefined;
//				},this);
				this.unlockDialog.on('show',function(){
					this.unlockPasswordField.setValue('');
					this.unlockPasswordField.focus(false,100);
				},this);
			}
			this.unlockDialog.show();
		}
	},
	
	beforeSubmit : function(params) {
		if (!GO.util.empty(this._userInputPassword))
			this.formPanel.form.baseParams['currentPassword'] = this._userInputPassword;
		else
			delete this.formPanel.form.baseParams['currentPassword'];
	},
	
	afterSubmit : function(action) {
		var responseData = Ext.decode(action.response.responseText);		
		if (responseData.encrypted) {
			this.contentField.setValue(GO.lang['contentEncrypted']);
			this._toggleNewPasswordFields(false); // if the {{modulename}} is encrypted after succesful form submission, there is no need for the password fields
			this.buttonOk.setDisabled(true); // editing is prohibited unless the user entered the password using this.unlockDialog and this._loadWithPassword()
			this.buttonApply.setDisabled(true);
		}
		this.contentField.setDisabled(responseData.encrypted); // disable the content field to underline the fact that editing an encrypted field is prohibited
		
		delete this.formPanel.form.baseParams['currentPassword'];
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
			this.encryptCheckbox = new Ext.form.Checkbox({
				boxLabel: GO.lang.encryptContent,
				labelSeparator: '',
				name: 'encrypted',
				allowBlank: true,
				hideLabel:true,
				checked: false,
				disabled:false
			}),
			this.uiPassword1Field = new Ext.form.TextField({
				fieldLabel : GO.lang.password,
				inputType: 'password',
				name: 'userInputPassword1',
				value: '',
				allowBlank: false,
				disabled: true,
				hidden: true
			}),this.uiPassword2Field = new Ext.form.TextField({
				fieldLabel : GO.lang.passwordConfirm,
				xtype: 'textfield',
				inputType: 'password',
				name: 'userInputPassword2',
				value: '',
				allowBlank: false,
				disabled: true,
				hidden: true
			}),
			this.contentField = new Ext.form.TextArea({
				name: 'content',
				anchor: '100%',
				height: 280,
				hideLabel:true
			})]				
		});

		this.encryptCheckbox.on('check', function(cb,checked){
//			if (this._encrypted) {
				this._toggleNewPasswordFields(checked);
//			} else {
//				this.encryptCheckbox.setValue(true);
//				this._toggleNewPasswordFields(false);
//			}
		},this);

		this.addPanel(this.propertiesPanel);
	},
	
	_loadWithPassword : function() {
		this.formPanel.form.load({
			url: GO.url('{{moduleplural}}/{{modulename}}/load'),
			params: {
				'userInputPassword' : this.unlockPasswordField.getValue()
			},
			success: function(form, action) {
//				this._passwordChangePermission = true;// password entered correctly: allow changing it
				this._toggleNewPasswordFields(true);
				this.encryptCheckbox.setValue(true);
				this._userInputPassword = this.unlockPasswordField.getValue(); // this is the only place this should be set, it is remembered so that users are able to edit the {{modulename}} without re-entering the password
				this.uiPassword1Field.allowBlank = true; this.uiPassword1Field.validate(); // hack to toggle allowBlank dynamically
				this.uiPassword2Field.allowBlank = true; this.uiPassword2Field.validate();
				this.contentField.setDisabled(false); // password entered correctly: allow editing
				this.buttonOk.setDisabled(false);
				this.buttonApply.setDisabled(false);
				this.unlockDialog.hide();
			},
			failure: function(form, action) {
				this._userInputPassword = false;
				this.encryptCheckbox.setValue(true);
				this._toggleNewPasswordFields(false); // user mustn't be able to change the password if he entered it incorrectly
				if (action.failureType == 'client') {					
					Ext.MessageBox.alert(GO.lang['strError'], GO.lang['strErrorsInForm']);			
				} else {
					Ext.MessageBox.alert(GO.lang['strError'], action.result.feedback);
				}
			},
			scope: this
		})
	},
	
	_toggleNewPasswordFields : function(on) {
		this.uiPassword1Field.setDisabled(!on);
		this.uiPassword1Field.setVisible(on);
		this.uiPassword2Field.setDisabled(!on);
		this.uiPassword2Field.setVisible(on);
		
		this.uiPassword1Field.allowBlank = false; this.uiPassword1Field.validate();
		this.uiPassword2Field.allowBlank = false; this.uiPassword2Field.validate();
		
		if (on) {
			this.uiPassword1Field.setValue('');
			this.uiPassword2Field.setValue('');
		}
	}
	
});
