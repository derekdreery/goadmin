<?php

/**
 * Based on notes community module
 */

/**
 * The {{Modulename}} model
 * 
 * @property int $id
 * @property int $category_id
 * @property int $files_folder_id
 * @property string $content
 * @property string $name
 * @property int $mtime
 * @property int $muser_id
 * @property int $ctime
 * @property int $user_id
 * 
 * @property boolean $encrypted
 * @property string $password
 */
class GO_{{Moduleplural}}_Model_{{Modulename}} extends GO_Base_Db_ActiveRecord {
	
	private $_decrypted=false;
	
	/**
	 * Returns a static model of itself
	 * 
	 * @param String $className
	 * @return GO_{{Moduleplural}}_Model_{{Modulename}} 
	 */
	public static function model($className=__CLASS__)
	{	
		return parent::model($className);
	}
	
	protected function init() {
		
		$this->columns['name']['required']=true;
		$this->columns['category_id']['required']=true;
		
		return parent::init();
	}
	
	public function getLocalizedName(){
		return GO::t('{{modulename}}','{{moduleplural}}');
	}
	
	public function aclField(){
		return 'category.acl_id';	
	}
	
	public function tableName(){
		return '{{moduleplural}}_{{moduleplural}}';
	}
	
	public function hasFiles(){
		return true;
	}
	public function hasLinks() {
		return true;
	}
	public function customfieldsModel(){
		return "GO_{{Moduleplural}}_Customfields_Model_{{Modulename}}";
	}

	public function relations(){
		return array(	
				'category' => array('type'=>self::BELONGS_TO, 'model'=>'GO_{{moduleplural}}_Model_Category', 'field'=>'category_id'),		);
	}


	protected function getCacheAttributes() {
		return array(
				'name' => $this->name,
				'description'=>''
		);
	}
	
	/**
	 * The files module will use this function.
	 */
	public function buildFilesPath() {

		return '{{moduleplural}}/' . GO_Base_Fs_Base::stripInvalidChars($this->category->name) . '/' . date('Y', $this->ctime) . '/' . GO_Base_Fs_Base::stripInvalidChars($this->name).' ('.$this->id.')';
	}
	
	public function defaultAttributes() {
		$attr = parent::defaultAttributes();
		
		$category = GO_{{Moduleplural}}_{{Moduleplural}}Module::getDefault{{Modulename}}Category(GO::user()->id);
		$attr['category_id']=$category->id;
		
		return $attr;
	}
	
	
	
	
	
	protected function getEncrypted(){
		return !$this->_decrypted && !empty($this->password);
	}

	
	public function decrypt($password) {
		
		if($this->password!=crypt($password,$this->password)){
			return false;		
		}else{
			$this->_decrypted=true;
			$this->content = GO_Base_Util_Crypt::decrypt($this->content, $password);
			return true;
		}
	}
	
	public function encrypt($password){
		$this->content = GO_Base_Util_Crypt::encrypt($this->content, $password);
		$this->password = $password;
	}
		
}
