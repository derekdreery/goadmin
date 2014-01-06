<?php

/**
 * Based on notes community module
 */

/**
 * 
 * The {{modulename}} model custom fields model.
 * 
 */
class GO_{{Moduleplural}}_Customfields_Model_{{Modulename}} extends GO_Customfields_Model_AbstractCustomFieldsRecord{
	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return GO_Notes_Model_CustomFieldsRecord 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}

	public function extendsModel(){
		return "GO_{{Moduleplural}}_Model_{{Modulename}}";
	}
}
