<?php

/**
 * Based on notes community module
 */

/**
 * 
 * The Category model
 * 
 * @property String $name The name of the category
 * @property int $files_folder_id
 * @property int $acl_id
 * @property int $user_id
 */
class GO_{{Moduleplural}}_Model_Category extends GO_Base_Model_AbstractUserDefaultModel {

	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return GO_Notes_Model_Category 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
	public function aclField() {
		return 'acl_id';
	}

	public function tableName() {
		return '{{moduleplural}}_categories';
	}
	
	public function hasFiles(){
		return true;
	}

	public function relations() {
		return array(
				'{{moduleplural}}' => array('type' => self::HAS_MANY, 'model' => 'GO_{{Moduleplural}}_Model_{{Modulename}}', 'field' => 'category_id', 'delete' => true)		);
	}
	
	protected function init() {
		$this->columns['name']['unique']=true;
		return parent::init();
	}
}
