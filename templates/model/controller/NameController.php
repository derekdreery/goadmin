<?php

{{ license }}

/**
 * The {{name|capitalize}} controller
 *
 * @author {{username}}
 */
class GO_{{modulename|capitalize}}_Controller_{{name|capitalize}} extends GO_Base_Controller_AbstractModelController {
	
	/**
	 * The name of the model this controller works with
	 */
	protected $model = "GO_{{module|capitalize}}_Model_{{name|capitalize}}";

	/**
	 * @return array The names of actions guests are allowed to access
	 */
	protected function allowGuests() {
		$guestActions = array(); // Add actions for guest access here
		
		return array_merge(parent::allowGuests(), $guestActions);
	}

	/**
	 * Set column formatting for actionStore
	 * 
	 * @return GO_Base_Data_ColumnModel The column model with the column formatting
	 * rules applied
	 */
	protected function formatColumns(GO_Base_Data_ColumnModel $columnModel) {
		// format your columns with e.g. $columnModel->formatColumn('name', '$model->othermodel->name', array(), $othermodel_name_id);
		// see GO_Base_Data_ColumnModel
		return parent::formatColumns($columnModel);
	}

	/**
	 * This function returns a list of fields in the db, and names to go with them.
	 * With this list, the combo field doesn't need to load it's store to populate
	 * the currently selected combo choice. If this isn't set, the combo box will
	 * show the value of the box (usually a foreign key id)
	 * 
	 * @return array An array of $key => $value where $key is the db field name
	 * and $value is what should be displayed in the combobox before the store is
	 * loaded
	 */
	protected function remoteComboFields() {
		$fields = array(); // Put remote combo fields here e.g. 'contact_id' => '$model->contact->name'
		
		return array_merge(parent::remoteComboFields(), $fields);
	}

	// actions
	// =======

	//TODO put any custom actions here

	// public functions
	// ================

	//TODO put any extra public functions of the model data here

	// private utility functions
	// =========================

	//TODO put any private functions used elsewhere in the model here

}

