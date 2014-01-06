<?php
/**
 * Based on notes community module
 */

/**
 * 
 * The {{Moduleplural}} module maintenance class
 * 
 */
class GO_{{Moduleplural}}_{{Moduleplural}}Module extends GO_Base_Module {
	
	public function autoInstall() {
		return true;
	}
	
	public function author() {
		return '{{username}}';
	}
	
	public function authorEmail() {
		return '{{useremail}}';
	}
	
	/**
	 * 
	 * When a user is created, updated or logs in this function will be called.
	 * The function can check if the default calendar, addressbook, notebook etc.
	 * is created for this user.
	 * 
	 */
	public static function firstRun(){
		parent::firstRun();
		$category = self::getDefault{{Modulename}}Category(GO::user()->id);
		
		return array('exportVariables'=>array(
				'GO'=>array(
						"{{moduleplural}}"=>array(
								"defaultCategory"=>array(
									'id'=>$category->id,
									'name'=>$category->name
									)
						)
				)
		));
	}

	
	public static function getDefault{{Modulename}}Category($userId){
		$user = GO_Base_Model_User::model()->findByPk($userId);
		if(!$user)
			return false;
		$category = GO_{{Moduleplural}}_Model_Category::model()->getDefault($user);
		
		return $category;
	}
	
	public function install() {
		parent::install();
		
		$category = new GO_{{Moduleplural}}_Model_Category();
		$category->name=GO::t('general','{{moduleplural}}');
		$category->save();
		$category->acl->addGroup(GO::config()->group_everyone, GO_Base_Model_Acl::READ_PERMISSION);
	}
}
