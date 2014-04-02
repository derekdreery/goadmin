<?php
{{license}}

/**
 * 
 * The {{Moduleplural}} module maintenance class
 * 
 */
class GO_{{Moduleplural}}_{{Moduleplural}}Module extends GO_Base_Module {
	
	public function autoInstall() {
		return false;
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
		// TODO create any fixtures etc here on per-user basis
	}

	/**
	 * Called when the module is installed
	 */
	public function install() {
		parent::install();
		// TODO create module-wide fixtures etc. here
	}
}
